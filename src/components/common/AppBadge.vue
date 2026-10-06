<script setup lang="ts">
import { useT } from '@/i18n/useT'
import type { FeatureStatus } from '@/config/features'

defineProps<{ status: Exclude<FeatureStatus, 'live'> }>()
const t = useT()
</script>

<template>
  <span
    class="inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[0.6875rem] leading-4 font-bold tracking-wide whitespace-nowrap"
    :class="status === 'pro' ? 'bg-brand text-white' : 'bg-sun-soft text-sun-ink'"
  >
    {{ status === 'pro' ? t('badge.pro') : t('badge.soon') }}
  </span>
</template>
