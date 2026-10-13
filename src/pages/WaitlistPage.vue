<script setup lang="ts">
import { computed } from 'vue'
import SkyBackdrop from '@/components/sky/SkyBackdrop.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import MarkedTitle from '@/components/common/MarkedTitle.vue'
import WaitlistForm from '@/components/waitlist/WaitlistForm.vue'
import type { IconName } from '@/components/common/icons'
import { useT } from '@/i18n/useT'
import { usePageHead } from '@/composables/usePageHead'
import { app } from '@/config/app'

const t = useT()
const perks: { id: 'first' | 'pilot' | 'voice'; icon: IconName }[] = [
  { id: 'first', icon: 'bell' },
  { id: 'pilot', icon: 'sparkle' },
  { id: 'voice', icon: 'chat' },
]
const removeNote = computed(() => t('waitlist.remove', { email: app.supportEmail }))

usePageHead()
</script>

<template>
  <section class="relative isolate overflow-hidden">
    <SkyBackdrop />
    <div class="wrap grid items-start gap-12 pt-12 pb-[clamp(5rem,10vw,8rem)] sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-20">
      <div class="lg:pt-6">
        <p class="eyebrow inline-flex items-center gap-2 rounded-full bg-surface/70 px-3 py-1.5 backdrop-blur">
          <AppIcon name="plane" class="size-4" />
          {{ t('waitlist.eyebrow') }}
        </p>
        <MarkedTitle tag="h1" class="h-display mt-6" :text="t('waitlist.title')" :mark="t('waitlist.titleMark')" />
        <p class="lead mt-6 max-w-xl">{{ t('waitlist.text') }}</p>

        <h2 class="mt-12 text-sm font-extrabold tracking-wide text-muted uppercase">{{ t('waitlist.perks.title') }}</h2>
        <ul class="mt-4 grid gap-3">
          <li
            v-for="perk in perks"
            :key="perk.id"
            class="flex gap-4 rounded-card border border-line/60 bg-surface/80 p-4 backdrop-blur"
          >
            <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-ink">
              <AppIcon :name="perk.icon" class="size-5" />
            </span>
            <span>
              <span class="block font-bold">{{ t(`waitlist.perks.items.${perk.id}.title`) }}</span>
              <span class="mt-0.5 block text-sm text-muted">{{ t(`waitlist.perks.items.${perk.id}.text`) }}</span>
            </span>
          </li>
        </ul>
        <p class="mt-6 text-sm text-muted">{{ removeNote }}</p>
      </div>

      <WaitlistForm class="lg:sticky lg:top-24" />
    </div>
  </section>
</template>
