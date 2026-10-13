<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import ThemeToggle from './ThemeToggle.vue'
import { useT } from '@/i18n/useT'
import { useNav } from '@/composables/useNav'
import { useRoute } from 'vue-router'
import { pathFor } from '@/router/pages'

const t = useT()
const route = useRoute()
const { otherLang, otherLangPath, roadmapPath, topicLinks } = useNav()

const icons = { features: 'layers', pricing: 'sparkle', faq: 'chat', waitlist: 'bell' } as const
const moreLinks = computed(() =>
  (['features', 'pricing', 'faq', 'waitlist'] as const).map((key) => ({ key, icon: icons[key], to: pathFor(key, t.lang.value) })),
)
</script>

<template>
  <div class="fixed inset-x-0 bottom-0 z-40 overflow-y-auto border-t border-line bg-bg lg:hidden">
    <nav :aria-label="t('nav.main')" class="wrap flex min-h-full flex-col py-4">
      <ul class="grid gap-1">
        <li v-for="link in topicLinks" :key="link.key">
          <RouterLink
            :to="link.to"
            class="flex items-center gap-4 rounded-2xl p-3 transition-colors"
            :class="link.active ? (link.love ? 'bg-love-blush' : 'bg-brand-soft') : 'active:bg-surface-2'"
            :aria-current="link.active ? 'page' : undefined"
          >
            <span
              class="grid size-11 shrink-0 place-items-center rounded-xl"
              :class="link.love ? 'bg-love-petal text-love' : 'bg-brand-soft text-brand-ink'"
            >
              <AppIcon :name="link.icon" class="size-5.5" />
            </span>
            <span class="flex flex-col leading-snug">
              <span class="font-bold text-ink">{{ link.label }}</span>
              <span class="text-sm text-muted">{{ link.hint }}</span>
            </span>
          </RouterLink>
        </li>
      </ul>
      <RouterLink
        :to="roadmapPath"
        class="roadmap mt-3 flex items-center gap-4 rounded-2xl border border-sun/50 p-3"
        :aria-current="route.meta.key === 'roadmap' ? 'page' : undefined"
      >
        <span class="grid size-11 shrink-0 place-items-center rounded-xl bg-sun-soft text-sun-ink">
          <AppIcon name="flag" class="size-5.5" />
        </span>
        <span class="flex flex-1 flex-col leading-snug">
          <span class="font-bold text-ink">{{ t('nav.roadmap') }}</span>
          <span class="text-sm text-muted">{{ t('nav.hint.roadmap') }}</span>
        </span>
        <AppIcon name="arrowRight" class="size-5 shrink-0 text-sun-ink" />
      </RouterLink>
      <div class="mt-4 grid grid-cols-2 gap-2 border-t border-line pt-4 text-sm font-semibold">
        <RouterLink
          v-for="link in moreLinks"
          :key="link.key"
          :to="link.to"
          class="flex items-center gap-2.5 rounded-xl border border-line/70 px-3.5 py-3 text-ink active:bg-surface-2"
          :aria-current="route.meta.key === link.key ? 'page' : undefined"
        >
          <AppIcon :name="link.icon" class="size-4.5 shrink-0 text-brand-ink" />
          {{ t(`nav.${link.key}`) }}
        </RouterLink>
      </div>
      <div class="mt-auto flex items-center gap-2">
        <RouterLink
          :to="otherLangPath"
          :hreflang="otherLang"
          :lang="otherLang"
          class="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-line p-3.5 font-bold text-ink"
        >
          <AppIcon name="globe" class="size-5" />
          {{ t('nav.language') }}
        </RouterLink>
        <span class="grid size-13 shrink-0 place-items-center rounded-2xl border border-line"><ThemeToggle /></span>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.roadmap {
  background: linear-gradient(160deg, var(--sun-soft), var(--surface) 70%);
}
</style>
