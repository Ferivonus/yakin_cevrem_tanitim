<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import StoreButton from './StoreButton.vue'
import CloudShape from '@/components/sky/CloudShape.vue'
import { useT } from '@/i18n/useT'
import { pathFor } from '@/router/pages'

defineProps<{ anchor?: boolean }>()
const t = useT()
</script>

<template>
  <section :id="anchor ? t('home.ids.download') : undefined" class="wrap pb-[clamp(4rem,9vw,7.5rem)]">
    <div v-reveal class="cta relative isolate overflow-hidden rounded-[2.25rem] px-6 py-16 text-center text-white sm:px-12 sm:py-24">
      <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <CloudShape class="cta-cloud drift absolute top-[8%] -left-8 w-[clamp(8rem,18vw,14rem)] opacity-35" />
        <CloudShape class="cta-cloud drift-slow absolute top-[14%] right-[4%] w-[clamp(5rem,10vw,8rem)] opacity-30" />
        <CloudShape class="cta-cloud drift absolute -right-10 -bottom-8 w-[clamp(10rem,24vw,18rem)] opacity-40" />
        <CloudShape class="cta-cloud drift-slow absolute -bottom-10 left-[12%] hidden w-[clamp(8rem,16vw,12rem)] opacity-30 sm:block" />
        <svg class="plane absolute size-8 text-white" viewBox="0 0 24 24">
          <path d="M3 11.5L21 4l-6.5 16-3.2-6.3L3 11.5z" fill="rgb(255 255 255 / 0.25)" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
          <path d="M11.3 13.7L21 4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
        </svg>
      </div>
      <h2 class="mx-auto max-w-3xl text-[clamp(1.875rem,4.5vw,3.25rem)] leading-[1.1] font-bold tracking-tight text-balance">
        {{ t('home.finalCta.title') }}
      </h2>
      <p class="mx-auto mt-4 max-w-xl text-lg text-white/85">{{ t('home.finalCta.text') }}</p>
      <div class="mt-9 flex flex-col items-center gap-5">
        <StoreButton tone="light" />
        <RouterLink
          :to="pathFor('features', t.lang.value)"
          class="group inline-flex items-center gap-2 font-bold text-white/90 transition-colors duration-500 hover:text-white"
        >
          {{ t('common.allFeatures') }}
          <AppIcon name="arrowRight" class="size-4.5 transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  background:
    radial-gradient(34rem 22rem at 100% 0%, rgb(255 220 140 / 0.38), transparent 70%),
    radial-gradient(30rem 22rem at 0% 100%, rgb(8 40 90 / 0.4), transparent 70%),
    linear-gradient(165deg, #1a78d4 0%, #1467bb 48%, #117a80 100%);
}

.cta-cloud {
  --cloud: #ffffff;
  --cloud-shade: #cfe7f5;
}

.drift {
  animation: drift 30s var(--ease-breeze) infinite alternate;
}

.drift-slow {
  animation: drift 40s var(--ease-breeze) -10s infinite alternate-reverse;
}

.plane {
  top: 0;
  left: 0;
  offset-path: path('M -40 260 C 120 160 260 300 460 180 S 820 60 1200 120');
  offset-rotate: auto 8deg;
  animation: glide 18s var(--ease-breeze) 1s infinite;
}

@keyframes drift {
  from {
    transform: translate3d(-2rem, 0, 0);
  }
  to {
    transform: translate3d(2.5rem, 6px, 0);
  }
}

@keyframes glide {
  0% {
    offset-distance: 0%;
    opacity: 0;
  }
  10%,
  85% {
    opacity: 0.9;
  }
  100% {
    offset-distance: 100%;
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .plane {
    display: none;
  }
}
</style>
