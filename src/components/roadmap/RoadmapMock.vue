<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import CloudShape from '@/components/sky/CloudShape.vue'
import { useT } from '@/i18n/useT'
import { dateLocale } from '@/i18n/locales'

const t = useT()
const done = 2
const share = 0.6
const percent = computed(() => new Intl.NumberFormat(dateLocale[t.lang.value], { style: 'percent' }).format(share))
</script>

<template>
  <div class="relative isolate mx-2 sm:mx-8 lg:mx-0" aria-hidden="true">
    <CloudShape class="float-slower absolute -top-8 -right-4 -z-10 w-28 sm:-right-10 sm:w-40" />
    <CloudShape class="float-slow absolute -bottom-9 -left-3 -z-10 w-32 sm:-left-12 sm:w-44" />

    <div class="float-slow rounded-[1.6rem] border border-line/70 bg-surface p-5 shadow-phone sm:p-6">
      <div class="flex items-center justify-between gap-3">
        <span class="flex items-center gap-2.5 font-bold">
          <span class="grid size-8 place-items-center rounded-xl bg-brand-soft text-brand-ink">
            <AppIcon name="layers" class="size-4.5" />
          </span>
          {{ t('roadmap.mock.project') }}
        </span>
        <span class="rounded-full bg-sun-soft px-2.5 py-0.5 text-[0.6875rem] font-bold text-sun-ink">{{ t('roadmap.mock.soon') }}</span>
      </div>

      <div class="mt-5">
        <div class="flex items-baseline justify-between text-sm">
          <span class="font-semibold text-muted">{{ t('roadmap.mock.progress') }}</span>
          <span class="font-extrabold text-brand-ink">{{ percent }}</span>
        </div>
        <div class="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-2">
          <div class="bar h-full rounded-full" :style="{ width: `${share * 100}%` }" />
        </div>
      </div>

      <ol class="mt-5 grid gap-2">
        <li
          v-for="(step, index) in t.list('roadmap.mock.steps')"
          :key="step"
          class="flex items-center gap-3 rounded-xl px-3 py-2.5"
          :class="index === done ? 'bg-brand-soft' : 'bg-surface-2/60'"
        >
          <span
            class="grid size-6 shrink-0 place-items-center rounded-full"
            :class="index < done ? 'bg-success text-white' : index === done ? 'bg-brand text-white' : 'border border-line text-muted'"
          >
            <AppIcon :name="index < done ? 'check' : index === done ? 'sparkle' : 'clock'" class="size-3.5" />
          </span>
          <span class="flex-1 text-sm font-semibold" :class="index > done ? 'text-muted' : ''">{{ step }}</span>
          <span v-if="index === done" class="text-xs font-bold text-brand-ink">{{ t('roadmap.mock.now') }}</span>
        </li>
      </ol>

      <p class="mt-4 flex items-center gap-2 text-sm font-semibold text-sun-ink">
        <span class="size-2.5 rounded-full bg-sun" />
        {{ t('roadmap.mock.unknown') }}
      </p>

      <div class="mt-5 flex items-center gap-3 rounded-2xl border border-dashed border-line p-3">
        <span class="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink">
          <AppIcon name="download" class="size-4.5" />
        </span>
        <span class="min-w-0 flex-1">
          <span class="block truncate font-mono text-sm font-semibold">{{ t('roadmap.mock.file') }}</span>
          <span class="block text-xs text-muted">{{ t('roadmap.mock.fileHint') }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bar {
  background: linear-gradient(90deg, var(--brand), var(--accent));
  transform-origin: left;
  animation: fill 1.6s var(--ease-soft) 0.5s both;
}

@keyframes fill {
  from {
    transform: scaleX(0);
  }
}
</style>
