<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from '@/components/common/AppIcon.vue'
import { useT } from '@/i18n/useT'
import { app } from '@/config/app'
import { pathFor } from '@/router/pages'
import {
  joinWaitlist,
  looksLikeEmail,
  parseInterest,
  waitlistEnabled,
  waitlistInterests,
  type WaitlistInterest,
} from '@/composables/useWaitlist'

const t = useT()
const route = useRoute()

const email = ref('')
const interests = ref<WaitlistInterest[]>(['app'])
const consent = ref(false)
const trap = ref('')
const state = ref<'idle' | 'sending' | 'done'>('idle')
const error = ref<'email' | 'consent' | 'network' | null>(null)
const sentTo = ref('')
const enabled = ref(true)
const card = ref<HTMLElement>()

const mailHref = computed(() => `mailto:${app.supportEmail}?subject=${encodeURIComponent(t('waitlist.mailSubject'))}`)

onMounted(() => {
  enabled.value = waitlistEnabled()
  const wanted = parseInterest(route.query.interest)
  if (wanted && !interests.value.includes(wanted)) interests.value = [...interests.value, wanted]
})

function toggle(interest: WaitlistInterest) {
  interests.value = interests.value.includes(interest)
    ? interests.value.filter((item) => item !== interest)
    : [...interests.value, interest]
}

async function submit() {
  error.value = null
  if (!looksLikeEmail(email.value)) return (error.value = 'email')
  if (!consent.value) return (error.value = 'consent')
  // Botların doldurduğu gizli alan: sessizce başarı gösterilir, istek gitmez.
  if (trap.value) return finish()
  state.value = 'sending'
  const source = typeof route.query.from === 'string' ? route.query.from : 'waitlist'
  const result = await joinWaitlist(email.value, interests.value, t.lang.value, source)
  if (result === 'ok') return finish()
  state.value = 'idle'
  error.value = result === 'invalid_email' ? 'email' : 'network'
}

async function finish() {
  sentTo.value = email.value.trim()
  state.value = 'done'
  await nextTick()
  // Kart kısalınca başarı mesajı ekranın üstünde kalmasın (geçiş bittikten sonra ölçülür).
  setTimeout(() => {
    const top = card.value?.getBoundingClientRect().top ?? 0
    if (top < 80) card.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, 420)
}

function again() {
  email.value = ''
  consent.value = false
  state.value = 'idle'
}
</script>

<template>
  <div ref="card" class="form-card relative overflow-hidden rounded-[1.75rem] border border-line/70 bg-surface p-6 shadow-phone sm:p-8">
    <Transition name="swap" mode="out-in">
      <div v-if="state === 'done'" key="done" class="py-6 text-center" role="status">
        <span class="plane mx-auto grid size-16 place-items-center rounded-full bg-accent-soft text-accent-ink">
          <AppIcon name="plane" class="size-8" />
        </span>
        <h2 class="mt-6 text-2xl font-extrabold tracking-tight">{{ t('waitlist.success.title') }}</h2>
        <p class="mx-auto mt-3 max-w-sm text-muted">{{ t('waitlist.success.text', { email: sentTo }) }}</p>
        <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <RouterLink
            :to="pathFor('features', t.lang.value)"
            class="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-bold text-white transition hover:-translate-y-0.5"
          >
            {{ t('waitlist.success.explore') }}
            <AppIcon name="arrowRight" class="size-4.5" />
          </RouterLink>
          <button type="button" class="rounded-full px-5 py-3 font-bold text-brand-ink hover:bg-brand-soft" @click="again">
            {{ t('waitlist.success.again') }}
          </button>
        </div>
      </div>

      <div v-else-if="!enabled" key="fallback" class="py-4">
        <h2 class="text-xl font-extrabold tracking-tight">{{ t('waitlist.form.title') }}</h2>
        <p class="mt-3 text-muted">{{ t('waitlist.fallback') }}</p>
        <a :href="mailHref" class="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-bold text-white">
          <AppIcon name="mail" class="size-4.5" />
          {{ app.supportEmail }}
        </a>
      </div>

      <form v-else key="form" novalidate @submit.prevent="submit">
        <h2 class="text-xl font-extrabold tracking-tight">{{ t('waitlist.form.title') }}</h2>

        <label for="waitlist-email" class="mt-6 block text-sm font-bold">{{ t('waitlist.form.email') }}</label>
        <input
          id="waitlist-email"
          v-model="email"
          type="email"
          inputmode="email"
          autocomplete="email"
          required
          :placeholder="t('waitlist.form.placeholder')"
          :aria-invalid="error === 'email'"
          :aria-describedby="error === 'email' ? 'waitlist-error' : undefined"
          class="mt-2 h-13 w-full rounded-2xl border bg-bg px-4 text-[1.0625rem] outline-none transition-colors placeholder:text-muted/70 focus:border-brand focus:ring-4 focus:ring-brand/15"
          :class="error === 'email' ? 'border-love' : 'border-line'"
        />

        <fieldset class="mt-6">
          <legend class="text-sm font-bold">{{ t('waitlist.form.interests') }}</legend>
          <div class="mt-3 flex flex-wrap gap-2">
            <label
              v-for="interest in waitlistInterests"
              :key="interest"
              class="chip inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors"
              :class="interests.includes(interest) ? 'border-brand bg-brand-soft text-brand-ink' : 'border-line bg-surface text-ink/80 hover:border-brand/50'"
            >
              <input type="checkbox" class="sr-only" :checked="interests.includes(interest)" @change="toggle(interest)" />
              <AppIcon :name="interests.includes(interest) ? 'check' : 'plus'" class="size-4" />
              {{ t(`waitlist.form.options.${interest}`) }}
            </label>
          </div>
        </fieldset>

        <label class="mt-6 flex cursor-pointer items-start gap-3 text-sm text-ink/85">
          <input
            v-model="consent"
            type="checkbox"
            class="mt-0.5 size-5 shrink-0 accent-[var(--brand)]"
            :aria-invalid="error === 'consent'"
          />
          <span>
            {{ t('waitlist.form.consent') }}
            <RouterLink :to="pathFor('privacy', t.lang.value, 'site')" class="font-bold text-brand-ink hover:underline">
              {{ t('waitlist.form.privacy') }}
            </RouterLink>
          </span>
        </label>

        <div class="trap" aria-hidden="true">
          <label>Website <input v-model="trap" type="text" tabindex="-1" autocomplete="off" /></label>
        </div>

        <p v-if="error" id="waitlist-error" class="mt-4 rounded-xl bg-love/10 px-4 py-3 text-sm font-semibold text-love-deep" role="alert">
          {{ t(`waitlist.errors.${error}`) }}
          <a v-if="error === 'network'" :href="mailHref" class="underline">{{ app.supportEmail }}</a>
        </p>

        <button
          type="submit"
          :disabled="state === 'sending'"
          class="mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-brand font-bold text-white shadow-[0_14px_28px_-14px_var(--brand)] transition duration-500 ease-[var(--ease-soft)] hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
        >
          <AppIcon name="plane" class="size-5" :class="state === 'sending' ? 'sending' : ''" />
          {{ state === 'sending' ? t('waitlist.form.sending') : t('waitlist.form.submit') }}
        </button>
        <p class="mt-3 text-center text-xs text-muted">{{ t('waitlist.form.note') }}</p>
      </form>
    </Transition>
  </div>
</template>

<style scoped>
.form-card::before {
  content: '';
  position: absolute;
  inset: -40% -30% auto auto;
  width: 22rem;
  height: 22rem;
  border-radius: 999px;
  background: radial-gradient(circle, color-mix(in oklab, var(--sky-2) 60%, transparent), transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.form-card > * {
  position: relative;
}

.chip:has(input:focus-visible) {
  outline: 2px solid var(--brand);
  outline-offset: 2px;
}

.trap {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

@keyframes drift {
  50% {
    transform: translate(3px, -3px);
  }
}

.sending {
  animation: drift 0.9s var(--ease-breeze) infinite;
}

.plane {
  animation: lift 1.4s var(--ease-soft) both;
}

@keyframes lift {
  from {
    transform: translate(-30px, 24px) rotate(-12deg);
    opacity: 0;
  }
}

.swap-enter-active,
.swap-leave-active {
  transition:
    opacity 0.35s var(--ease-soft),
    transform 0.45s var(--ease-soft);
}

.swap-enter-from,
.swap-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (prefers-reduced-motion: reduce) {
  .plane,
  .sending {
    animation: none;
  }
}
</style>
