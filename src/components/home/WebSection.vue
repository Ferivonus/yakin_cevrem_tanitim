<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import MarkedTitle from '@/components/common/MarkedTitle.vue'
import CloudShape from '@/components/sky/CloudShape.vue'
import type { IconName } from '@/components/common/icons'
import { useT } from '@/i18n/useT'
import { app } from '@/config/app'

const t = useT()

const points: { id: 'account' | 'wide' | 'desk'; icon: IconName }[] = [
  { id: 'account', icon: 'users' },
  { id: 'wide', icon: 'calendar' },
  { id: 'desk', icon: 'checklist' },
]

const week = [
  [1, 0, 1, 1, 0, 1, 0],
  [1, 1, 0, 1, 1, 0, 0],
  [0, 1, 2, 0, 1, 2, 2],
  [1, 0, 0, 1, 0, 1, 1],
]
const people = ['brand', 'accent', 'success'] as const

const notifyHref = () => `mailto:${app.supportEmail}?subject=${encodeURIComponent(t('home.web.notifySubject'))}`
</script>

<template>
  <section :id="t('home.ids.web')" class="section-y">
    <div class="wrap grid grid-cols-1 items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
      <div v-reveal>
        <p class="eyebrow mb-3 inline-flex items-center gap-2">
          <AppIcon name="monitor" class="size-4" />
          {{ t('home.web.eyebrow') }}
        </p>
        <MarkedTitle class="h-section" :text="t('home.web.title')" :mark="t('home.web.titleMark')" />
        <p class="lead mt-4">{{ t('home.web.text') }}</p>

        <ul class="mt-8 grid gap-5">
          <li v-for="point in points" :key="point.id" class="flex gap-4">
            <span class="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand-ink">
              <AppIcon :name="point.icon" class="size-5" />
            </span>
            <span>
              <span class="block font-bold">{{ t(`home.web.points.${point.id}.title`) }}</span>
              <span class="block text-muted">{{ t(`home.web.points.${point.id}.text`) }}</span>
            </span>
          </li>
        </ul>

        <div class="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            :href="notifyHref()"
            class="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-ink px-5 py-3 font-bold text-bg transition duration-500 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:shadow-soft sm:self-auto"
          >
            <AppIcon name="bell" class="size-4.5" />
            {{ t('home.web.notify') }}
          </a>
          <p class="text-sm text-muted">{{ t('home.web.note') }}</p>
        </div>
      </div>

      <div v-reveal="120" class="relative isolate mx-2 sm:mx-8 lg:mx-0" aria-hidden="true">
        <div class="web-sky absolute -inset-5 -z-10 rounded-[2.5rem] sm:-inset-9" />
        <CloudShape class="float-slower absolute -top-9 -left-4 -z-10 w-32 sm:-left-12 sm:w-48" />
        <CloudShape class="float-slow absolute -right-3 -bottom-10 -z-10 w-28 sm:-right-10 sm:w-44" />

        <div class="float-slow overflow-hidden rounded-[1.4rem] border border-line/70 bg-surface shadow-phone">
          <div class="flex items-center gap-3 border-b border-line/70 bg-surface-2/60 px-4 py-3">
            <span class="flex gap-1.5">
              <span class="size-2.5 rounded-full bg-[#ff8a80]" />
              <span class="size-2.5 rounded-full bg-sun" />
              <span class="size-2.5 rounded-full bg-success/70" />
            </span>
            <span class="mx-auto flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
              <AppIcon name="lock" class="size-3" />
              {{ t('home.web.mock.url') }}
            </span>
            <span class="w-10" />
          </div>

          <div class="grid grid-cols-[3.25rem_1fr] sm:grid-cols-[9rem_1fr]">
            <div class="grid content-start gap-2 border-r border-line/70 p-3">
              <span v-for="tone in people" :key="tone" class="flex items-center gap-2">
                <span class="size-7 shrink-0 rounded-full" :class="`dot-${tone}`" />
                <span class="hidden h-2 flex-1 rounded-full bg-surface-2 sm:block" />
              </span>
              <span class="mt-3 hidden h-8 rounded-xl bg-brand-soft sm:block" />
              <span class="hidden h-8 rounded-xl bg-surface-2 sm:block" />
            </div>

            <div class="p-4 sm:p-5">
              <div class="flex items-center justify-between gap-3">
                <span class="font-bold">{{ t('home.web.mock.title') }}</span>
                <span class="rounded-full bg-sun-soft px-2.5 py-0.5 text-[0.6875rem] font-bold text-sun-ink">
                  {{ t('home.web.mock.soon') }}
                </span>
              </div>
              <div class="mt-4 grid grid-cols-7 gap-1.5">
                <template v-for="(row, r) in week" :key="r">
                  <span
                    v-for="(cell, c) in row"
                    :key="`${r}-${c}`"
                    class="h-7 rounded-lg sm:h-9"
                    :class="cell === 2 ? 'cell-free grid place-items-center text-white' : cell ? 'bg-brand-soft' : 'bg-surface-2'"
                    :style="{ '--d': `${c * 0.6}s` }"
                  >
                    <AppIcon v-if="cell === 2" name="check" class="size-3.5" />
                  </span>
                </template>
              </div>
              <p class="mt-4 flex items-center gap-2 text-sm font-semibold text-muted">
                <span class="size-2.5 rounded-full bg-brand" />
                {{ t('home.web.mock.free') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.web-sky {
  background: linear-gradient(160deg, var(--sky-1), var(--sky-2) 55%, var(--sky-3));
  opacity: 0.75;
}

.dot-brand {
  background: color-mix(in oklab, var(--brand) 55%, var(--surface));
}

.dot-accent {
  background: color-mix(in oklab, var(--accent) 60%, var(--surface));
}

.dot-success {
  background: color-mix(in oklab, var(--success) 50%, var(--surface));
}

.cell-free {
  background: var(--brand);
  animation: glow 4s var(--ease-breeze) var(--d) infinite alternate;
}

@keyframes glow {
  to {
    background: color-mix(in oklab, var(--brand) 72%, var(--sky-1));
  }
}
</style>
