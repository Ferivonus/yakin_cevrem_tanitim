<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import AppBadge from '@/components/common/AppBadge.vue'
import { useT } from '@/i18n/useT'
import type { Feature } from '@/config/features'

const props = defineProps<{ items: Feature[] }>()
const t = useT()

const order = { live: 0, soon: 1, pro: 2 }
const sorted = computed(() => [...props.items].sort((a, b) => order[a.status] - order[b.status]))
</script>

<template>
  <ul class="grid gap-x-10 sm:grid-cols-2">
    <li v-for="item in sorted" :key="item.id" class="flex items-start gap-3 border-b border-line py-3.5">
      <AppIcon
        :name="item.status === 'live' ? 'check' : item.status === 'pro' ? 'video' : 'clock'"
        class="mt-0.5 size-5 shrink-0"
        :class="item.status === 'live' ? 'text-success' : 'text-muted'"
      />
      <span class="flex flex-1 flex-wrap items-center gap-x-2 gap-y-1" :class="item.status === 'live' ? '' : 'text-muted'">
        {{ t(`features.items.${item.id}`) }}
        <AppBadge v-if="item.status !== 'live'" :status="item.status" />
      </span>
    </li>
  </ul>
</template>
