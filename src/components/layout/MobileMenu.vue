<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import ThemeToggle from './ThemeToggle.vue'
import { useT } from '@/i18n/useT'
import { useNav } from '@/composables/useNav'
import { pathFor } from '@/router/pages'

const t = useT()
const { otherLang, otherLangPath, topicLinks } = useNav()
</script>

<template>
  <div class="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-bg lg:hidden">
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
      <div class="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center text-sm font-semibold">
        <RouterLink :to="pathFor('features', t.lang.value)" class="rounded-xl px-2 py-3 text-ink active:bg-surface-2">
          {{ t('nav.features') }}
        </RouterLink>
        <RouterLink :to="pathFor('faq', t.lang.value)" class="rounded-xl px-2 py-3 text-ink active:bg-surface-2">
          {{ t('nav.faq') }}
        </RouterLink>
        <RouterLink :to="pathFor('roadmap', t.lang.value)" class="rounded-xl px-2 py-3 text-ink active:bg-surface-2">
          {{ t('nav.roadmap') }}
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
