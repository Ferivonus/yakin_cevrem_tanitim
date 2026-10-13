<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import AppBadge from '@/components/common/AppBadge.vue'
import PhoneFrame from '@/components/common/PhoneFrame.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import type { IconName } from '@/components/common/icons'
import type { ShotId } from '@/config/shots'
import { useT } from '@/i18n/useT'
import { pathFor } from '@/router/pages'

type FreshId = 'tools' | 'export' | 'live' | 'agenda' | 'search'

const t = useT()
const items: { id: FreshId; icon: IconName; shot: ShotId; page: 'plans' | 'projects' | 'features'; wide?: boolean }[] = [
  { id: 'tools', icon: 'layers', shot: '30', page: 'projects', wide: true },
  { id: 'export', icon: 'sparkle', shot: '31', page: 'projects', wide: true },
  { id: 'live', icon: 'clock', shot: '32', page: 'plans' },
  { id: 'agenda', icon: 'checklist', shot: '06', page: 'plans' },
  { id: 'search', icon: 'globe', shot: '33', page: 'features' },
]
</script>

<template>
  <section :id="t('home.ids.fresh')" class="section-y">
    <div class="wrap">
      <SectionHeading v-reveal :eyebrow="t('home.fresh.eyebrow')" :title="t('home.fresh.title')" :text="t('home.fresh.text')" />

      <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <li
          v-for="(item, index) in items"
          :key="item.id"
          v-reveal="(index % 3) * 80"
          class="fresh-card group relative flex flex-col overflow-hidden rounded-card border border-line/70 transition duration-700 ease-[var(--ease-soft)] hover:-translate-y-1.5 hover:shadow-soft"
          :class="item.wide ? 'lg:col-span-3' : 'lg:col-span-2'"
        >
          <div class="p-6 sm:p-7">
            <div class="flex items-center gap-3">
              <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-ink">
                <AppIcon :name="item.icon" class="size-5" />
              </span>
              <AppBadge status="new" />
            </div>
            <h3 class="mt-4 text-xl font-extrabold tracking-tight">
              <RouterLink :to="pathFor(item.page, t.lang.value)" class="after:absolute after:inset-0 after:rounded-card">
                {{ t(`home.fresh.items.${item.id}.label`) }}
              </RouterLink>
            </h3>
            <p class="mt-1.5 text-muted">{{ t(`home.fresh.items.${item.id}.text`) }}</p>
            <p class="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand-ink" aria-hidden="true">
              {{ t('home.fresh.more', { page: t(`nav.${item.page}`) }) }}
              <AppIcon name="arrowRight" class="size-4 transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1" />
            </p>
          </div>
          <div class="shot relative mt-auto h-60 overflow-hidden sm:h-64" aria-hidden="true">
            <PhoneFrame
              :shot="item.shot"
              decorative
              sizes="230px"
              class="absolute top-0 left-1/2 w-[13.5rem] -translate-x-1/2 transition-transform duration-700 ease-[var(--ease-soft)] group-hover:-translate-y-2"
            />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.fresh-card {
  background: linear-gradient(170deg, color-mix(in oklab, var(--sky-2) 40%, var(--surface)), var(--surface) 55%);
}

.shot {
  mask-image: linear-gradient(to bottom, #000 70%, transparent);
}
</style>
