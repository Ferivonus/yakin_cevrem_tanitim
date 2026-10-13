<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import { app } from '@/config/app'
import { useT } from '@/i18n/useT'
import { useNav } from '@/composables/useNav'

withDefaults(defineProps<{ tone?: 'dark' | 'light' }>(), { tone: 'dark' })
const t = useT()
const { waitlistFor } = useNav()
</script>

<template>
  <component
    :is="app.playStoreUrl ? 'a' : 'RouterLink'"
    :href="app.playStoreUrl || undefined"
    :to="app.playStoreUrl ? undefined : waitlistFor('app', 'store')"
    class="inline-flex items-center gap-3 rounded-2xl py-2.5 pr-5 pl-3.5 transition duration-500 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:shadow-lg"
    :class="tone === 'dark' ? 'bg-ink text-bg' : 'bg-white text-[#0e2433]'"
  >
    <AppIcon name="android" class="size-7 shrink-0" />
    <span class="flex flex-col text-left leading-tight">
      <span class="text-[0.6875rem] font-semibold opacity-70">
        {{ app.playStoreUrl ? t('store.platform') : t('store.notify') }}
      </span>
      <span class="text-[0.9375rem] font-bold">{{ app.playStoreUrl ? t('store.get') : t('store.soon') }}</span>
    </span>
  </component>
</template>
