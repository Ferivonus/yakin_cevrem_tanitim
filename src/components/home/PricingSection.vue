<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import CloudShape from '@/components/sky/CloudShape.vue'
import { useT } from '@/i18n/useT'
import { app } from '@/config/app'

type PlanId = 'free' | 'pro' | 'couple' | 'team'

const t = useT()

const plans: { id: PlanId; seats: number | null }[] = [
  { id: 'free', seats: null },
  { id: 'pro', seats: 1 },
  { id: 'couple', seats: 2 },
  { id: 'team', seats: 5 },
]

const stars = [
  [8, 14, 0],
  [22, 30, 1.2],
  [37, 9, 2.4],
  [55, 22, 0.6],
  [68, 8, 1.8],
  [81, 26, 3],
  [93, 12, 0.9],
  [46, 38, 2.1],
] as const

const notifyHref = () => `mailto:${app.supportEmail}?subject=${encodeURIComponent(t('home.pricing.notifySubject'))}`
</script>

<template>
  <section :id="t('home.ids.pricing')" class="pricing section-y relative isolate overflow-hidden text-white">
    <div class="glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <span
        v-for="([x, y, delay], index) in stars"
        :key="index"
        class="star absolute size-1 rounded-full bg-white"
        :style="{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s` }"
      />
      <CloudShape class="dusk-cloud absolute -bottom-6 -left-10 w-[clamp(12rem,26vw,22rem)] opacity-25" />
      <CloudShape class="dusk-cloud absolute right-[-4rem] bottom-[-1rem] w-[clamp(10rem,20vw,18rem)] opacity-20" />
    </div>
    <div class="wrap relative">
      <div v-reveal class="max-w-2xl">
        <p class="eyebrow mb-3 !text-[#9fe3ff]">{{ t('home.pricing.eyebrow') }}</p>
        <h2 class="h-section">{{ t('home.pricing.title') }}</h2>
        <p class="lead mt-4 !text-white/70">{{ t('home.pricing.text') }}</p>
      </div>

      <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="(plan, index) in plans"
          :key="plan.id"
          v-reveal="index * 80"
          class="flex flex-col rounded-card p-6 transition duration-700 ease-[var(--ease-soft)] hover:-translate-y-1.5"
          :class="plan.id === 'free' ? 'bg-white text-[#0e2433] shadow-[0_24px_50px_-28px_rgb(0_0_0/0.5)]' : 'border border-white/15 bg-white/[0.07] backdrop-blur-md'"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="text-2xl font-extrabold tracking-tight">{{ t(`home.pricing.plans.${plan.id}.name`) }}</h3>
              <p class="mt-0.5 text-sm" :class="plan.id === 'free' ? 'text-[#4b6577]' : 'text-white/60'">
                {{ t(`home.pricing.plans.${plan.id}.tagline`) }}
              </p>
            </div>
            <span
              class="rounded-full px-2.5 py-1 text-[0.6875rem] font-bold whitespace-nowrap"
              :class="plan.id === 'free' ? 'bg-[#e3f5ec] text-[#13784a]' : 'bg-white/10 text-white/80'"
            >
              {{ plan.id === 'free' ? t('home.pricing.now') : t('badge.soon') }}
            </span>
          </div>

          <div class="mt-6 flex items-center gap-3">
            <span v-if="plan.seats" class="flex -space-x-2" aria-hidden="true">
              <span
                v-for="seat in plan.seats"
                :key="seat"
                class="grid size-8 place-items-center rounded-full border-2 border-white/20"
                :class="plan.id === 'couple' ? 'bg-love text-white' : 'bg-brand text-white'"
              >
                <AppIcon :name="plan.id === 'couple' && seat === 2 ? 'heart' : 'users'" class="size-3.5" />
              </span>
            </span>
            <span v-else class="grid size-8 place-items-center rounded-full bg-brand-soft text-brand" aria-hidden="true">
              <AppIcon name="users" class="size-4" />
            </span>
            <span class="text-sm font-semibold" :class="plan.id === 'free' ? 'text-[#4b6577]' : 'text-white/70'">
              {{ t(`home.pricing.plans.${plan.id}.seats`) }}
            </span>
          </div>

          <p class="mt-6 text-[1.75rem] leading-none font-extrabold tracking-tight">
            {{ plan.id === 'free' ? t('home.pricing.free') : t('home.pricing.priceSoon') }}
          </p>

          <ul class="mt-6 grid gap-2.5 text-[0.9375rem]">
            <li v-for="feature in t.list(`home.pricing.plans.${plan.id}.features`)" :key="feature" class="flex gap-2.5">
              <AppIcon
                name="check"
                class="mt-1 size-4 shrink-0"
                :class="plan.id === 'free' ? 'text-success' : plan.id === 'couple' ? 'text-love' : 'text-[#8fd8ff]'"
              />
              <span :class="plan.id === 'free' ? '' : 'text-white/85'">{{ feature }}</span>
            </li>
          </ul>
        </li>
      </ul>

      <div v-reveal class="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p class="max-w-xl text-sm text-white/60">{{ t('home.pricing.note') }}</p>
        <a
          :href="notifyHref()"
          class="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/25 bg-white/5 px-5 py-3 font-bold backdrop-blur-md transition-colors duration-500 hover:bg-white hover:text-[#0e2433] sm:self-auto"
        >
          <AppIcon name="bell" class="size-4.5" />
          {{ t('home.pricing.notify') }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing {
  background: linear-gradient(180deg, var(--dusk-1) 0%, var(--dusk-2) 62%, var(--dusk-3) 100%);
}

.glow {
  background:
    radial-gradient(36rem 24rem at 85% 0%, rgb(70 175 255 / 0.32), transparent 70%),
    radial-gradient(40rem 18rem at 50% 110%, rgb(255 214 120 / 0.22), transparent 70%);
}

.star {
  opacity: 0.25;
  box-shadow: 0 0 8px 1px rgb(255 255 255 / 0.5);
  animation: twinkle 5s var(--ease-breeze) infinite alternate;
}

.dusk-cloud {
  --cloud: #ffffff;
  --cloud-shade: #bfe3f2;
  animation: float 12s var(--ease-breeze) infinite alternate;
}

@keyframes twinkle {
  to {
    opacity: 0.9;
  }
}
</style>
