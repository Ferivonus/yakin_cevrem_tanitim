<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import { useT } from '@/i18n/useT'
import type { FaqId } from '@/config/faq'

defineProps<{ id: FaqId; anchor?: boolean }>()
const t = useT()
</script>

<template>
  <details :id="anchor ? t(`faq.items.${id}.slug`) : undefined" class="faq-item group border-b border-line">
    <summary class="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-bold">
      {{ t(`faq.items.${id}.q`) }}
      <span
        class="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 text-ink transition-transform duration-300 group-open:rotate-45"
        aria-hidden="true"
      >
        <AppIcon name="plus" class="size-4" />
      </span>
    </summary>
    <p class="-mt-1 max-w-2xl pr-12 pb-6 text-muted">{{ t(`faq.items.${id}.a`) }}</p>
  </details>
</template>

<style scoped>
summary::-webkit-details-marker {
  display: none;
}
</style>
