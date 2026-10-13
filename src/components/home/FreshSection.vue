<script setup lang="ts">
import { computed, ref } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import AppBadge from '@/components/common/AppBadge.vue'
import PhoneFrame from '@/components/common/PhoneFrame.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import type { IconName } from '@/components/common/icons'
import type { ShotId } from '@/config/shots'
import { useT } from '@/i18n/useT'
import { pathFor, type PageKey } from '@/router/pages'

type FreshId = 'tools' | 'export' | 'live' | 'agenda' | 'search'

const t = useT()
const items: { id: FreshId; icon: IconName; shot: ShotId; page: PageKey }[] = [
  { id: 'tools', icon: 'layers', shot: '30', page: 'projects' },
  { id: 'export', icon: 'sparkle', shot: '31', page: 'projects' },
  { id: 'live', icon: 'clock', shot: '32', page: 'plans' },
  { id: 'agenda', icon: 'checklist', shot: '06', page: 'plans' },
  { id: 'search', icon: 'globe', shot: '33', page: 'features' },
]
const active = ref<FreshId>('tools')
const current = computed(() => items.find((item) => item.id === active.value) ?? items[0])

function onKey(event: KeyboardEvent, index: number) {
  const step = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 0
  if (!step) return
  event.preventDefault()
  const next = items[(index + step + items.length) % items.length]
  active.value = next.id
  document.getElementById(`fresh-tab-${next.id}`)?.focus()
}
</script>

<template>
  <section :id="t('home.ids.fresh')" class="section-y overflow-x-clip">
    <div class="wrap">
      <SectionHeading v-reveal :eyebrow="t('home.fresh.eyebrow')" :title="t('home.fresh.title')" :text="t('home.fresh.text')" />

      <div class="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-20">
        <div v-reveal class="min-w-0">
          <div role="tablist" :aria-label="t('home.fresh.title')" class="-mx-4 flex gap-2 no-scrollbar overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0">
            <button
              v-for="(item, index) in items"
              :id="`fresh-tab-${item.id}`"
              :key="item.id"
              type="button"
              role="tab"
              :aria-selected="active === item.id"
              :aria-controls="`fresh-panel`"
              :tabindex="active === item.id ? 0 : -1"
              class="tab group flex shrink-0 items-start gap-4 rounded-card border text-left transition duration-500 ease-[var(--ease-soft)] lg:p-5"
              :class="active === item.id ? 'is-active border-brand/40 bg-surface shadow-soft' : 'border-transparent hover:bg-surface/70'"
              @click="active = item.id"
              @keydown="onKey($event, index)"
            >
              <span
                class="grid size-11 shrink-0 place-items-center rounded-xl transition-colors"
                :class="active === item.id ? 'bg-brand text-white' : 'bg-brand-soft text-brand-ink'"
              >
                <AppIcon :name="item.icon" class="size-5" />
              </span>
              <span class="min-w-0 pr-2 lg:pr-0">
                <span class="flex items-center gap-2 font-bold whitespace-nowrap">
                  {{ t(`home.fresh.items.${item.id}.label`) }}
                  <AppBadge status="new" class="hidden lg:inline-flex" />
                </span>
                <span v-if="active === item.id" class="mt-1 hidden text-muted lg:block">{{ t(`home.fresh.items.${item.id}.text`) }}</span>
              </span>
            </button>
          </div>

          <div class="mt-6 lg:hidden">
            <h3 class="text-xl font-extrabold tracking-tight">{{ t(`home.fresh.items.${current.id}.title`) }}</h3>
            <p class="mt-2 text-muted">{{ t(`home.fresh.items.${current.id}.text`) }}</p>
          </div>
        </div>

        <div id="fresh-panel" role="tabpanel" :aria-labelledby="`fresh-tab-${current.id}`" class="relative mx-auto w-full max-w-[19rem]">
          <div class="glow pointer-events-none absolute inset-[-14%] -z-10 rounded-full" aria-hidden="true" />
          <Transition name="fresh" mode="out-in">
            <div :key="current.id">
              <PhoneFrame :shot="current.shot" sizes="(min-width: 960px) 300px, 70vw" />
              <div class="mt-5 flex items-center justify-between gap-3">
                <p class="hidden font-bold lg:block">{{ t(`home.fresh.items.${current.id}.title`) }}</p>
                <RouterLink
                  :to="pathFor(current.page, t.lang.value)"
                  class="ml-auto inline-flex shrink-0 items-center gap-1.5 font-bold text-brand-ink hover:underline"
                >
                  {{ t('home.fresh.more') }}
                  <AppIcon name="arrowRight" class="size-4" />
                </RouterLink>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tab {
  padding: 0.6rem 0.9rem;
}

@media (min-width: 64rem) {
  .tab {
    padding: 1.25rem;
  }
}

.tab:not(.is-active) {
  border-color: var(--line);
}

@media (min-width: 64rem) {
  .tab:not(.is-active) {
    border-color: transparent;
  }
}

.glow {
  background: radial-gradient(circle, color-mix(in oklab, var(--sky-2) 75%, transparent), transparent 66%);
}

.fresh-enter-active,
.fresh-leave-active {
  transition:
    opacity 0.35s var(--ease-soft),
    transform 0.5s var(--ease-soft);
}

.fresh-enter-from {
  opacity: 0;
  transform: translateY(14px) scale(0.98);
}

.fresh-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .fresh-enter-active,
  .fresh-leave-active {
    transition: none;
  }
}
</style>
