<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import { useT } from '@/i18n/useT'
import { pathFor } from '@/router/pages'

const t = useT()
const links = [
  { key: 'privacy', label: 'footer.privacy' },
  { key: 'terms', label: 'footer.terms' },
  { key: 'deleteAccount', label: 'footer.deleteAccount' },
] as const
</script>

<template>
  <nav v-reveal :aria-label="t('topics.trust.documents')" class="flex flex-wrap items-center gap-3">
    <span class="mr-1 text-sm font-bold text-muted">{{ t('topics.trust.documents') }}</span>
    <RouterLink
      v-for="link in links"
      :key="link.key"
      :to="pathFor(link.key, t.lang.value)"
      class="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-sm font-bold transition-colors hover:border-brand hover:text-brand-ink"
    >
      {{ t(link.label) }}
      <AppIcon name="arrowRight" class="size-4" />
    </RouterLink>
  </nav>
</template>
