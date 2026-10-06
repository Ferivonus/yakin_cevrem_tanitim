<script setup lang="ts">
import PhoneFrame from '@/components/common/PhoneFrame.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { useT } from '@/i18n/useT'
import type { ShotId } from '@/config/shots'

const t = useT()

const steps: { id: 'add' | 'find' | 'plan'; shot: ShotId }[] = [
  { id: 'add', shot: '02' },
  { id: 'find', shot: '03' },
  { id: 'plan', shot: '05' },
]
</script>

<template>
  <section :id="t('home.ids.how')" class="section-y">
    <div class="wrap">
      <SectionHeading v-reveal center :eyebrow="t('home.how.eyebrow')" :title="t('home.how.title')" />

      <ol
        class="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-10"
      >
        <li
          v-for="(step, index) in steps"
          :key="step.id"
          v-reveal="index * 120"
          class="step relative w-[78%] shrink-0 snap-center sm:w-auto"
        >
          <div class="flex items-center gap-3">
            <span class="step-dot grid size-11 shrink-0 place-items-center rounded-full text-lg font-extrabold text-white">
              {{ index + 1 }}
            </span>
            <svg
              v-if="index < steps.length - 1"
              class="connector hidden h-6 flex-1 sm:block"
              viewBox="0 0 200 24"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M2 14C40 2 70 22 110 12s62-8 86-2" pathLength="1" />
            </svg>
          </div>
          <h3 class="mt-5 text-xl font-extrabold tracking-tight">{{ t(`home.how.steps.${step.id}.title`) }}</h3>
          <p class="mt-1.5 text-muted">{{ t(`home.how.steps.${step.id}.text`) }}</p>
          <PhoneFrame
            :shot="step.shot"
            sizes="(min-width: 640px) 220px, 60vw"
            class="mt-7 w-full max-w-[15rem] transition-transform duration-700 ease-[var(--ease-soft)] hover:-translate-y-2"
          />
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.step-dot {
  background: linear-gradient(160deg, color-mix(in oklab, var(--brand) 70%, var(--sky-1)), var(--brand));
  box-shadow: 0 10px 22px -10px var(--brand);
}

.connector {
  margin-right: -1.5rem;
  overflow: visible;
}

.connector path {
  fill: none;
  stroke: var(--brand);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 0.02 0.03;
  opacity: 0.45;
  vector-effect: non-scaling-stroke;
  animation: breeze 6s linear infinite;
}

@keyframes breeze {
  to {
    stroke-dashoffset: -0.5;
  }
}

@media (width >= 64rem) {
  .connector {
    margin-right: -2.5rem;
  }
}
</style>
