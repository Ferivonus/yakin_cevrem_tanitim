<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import MarkedTitle from '@/components/common/MarkedTitle.vue'
import SkyBackdrop from '@/components/sky/SkyBackdrop.vue'
import RoadmapMock from './RoadmapMock.vue'
import { useT } from '@/i18n/useT'

const t = useT()
</script>

<template>
  <section class="relative isolate overflow-hidden">
    <SkyBackdrop hills />
    <div class="wrap grid items-center gap-14 pt-10 pb-24 sm:pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:pb-32">
      <div class="hero-copy">
        <p class="eyebrow mb-4 inline-flex items-center gap-2">
          <AppIcon name="flag" class="size-4" />
          {{ t('roadmap.hero.eyebrow') }}
        </p>
        <MarkedTitle tag="h1" class="h-display" :text="t('roadmap.hero.title')" :mark="t('roadmap.hero.titleMark')" />
        <p class="lead mt-6 max-w-xl">{{ t('roadmap.hero.text') }}</p>
        <p class="mt-5 inline-flex items-center gap-2 rounded-full bg-sun-soft px-3.5 py-1.5 text-sm font-semibold text-sun-ink">
          <AppIcon name="clock" class="size-4" />
          {{ t('roadmap.hero.note') }}
        </p>
      </div>
      <RoadmapMock class="hero-art mx-auto w-full max-w-sm" />
    </div>
  </section>
</template>

<style scoped>
.hero-copy > * {
  animation: rise 1.1s var(--ease-soft) both;
}

.hero-copy > :nth-child(2) {
  animation-delay: 0.08s;
}

.hero-copy > :nth-child(3) {
  animation-delay: 0.16s;
}

.hero-copy > :nth-child(4) {
  animation-delay: 0.24s;
}

.hero-art {
  animation: rise 1.4s var(--ease-soft) 0.2s both;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
}
</style>
