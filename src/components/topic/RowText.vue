<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { useT, type TextKey } from '@/i18n/useT'
import type { TopicKey, TopicRow } from '@/config/topics'

const props = defineProps<{ topic: TopicKey; row: TopicRow }>()
const t = useT()
const base = computed(() => `topics.${props.topic}.rows.${props.row.id}`)
const bullets = computed(() => t.list(`${base.value}.bullets` as Parameters<typeof t.list>[0]))
</script>

<template>
  <div>
    <slot />
    <h2 class="h-section">{{ t(`${base}.title` as TextKey) }}</h2>
    <p class="lead mt-4">{{ t(`${base}.text` as TextKey) }}</p>
    <ul v-if="bullets.length" class="mt-6 grid gap-2.5">
      <li v-for="bullet in bullets" :key="bullet" class="flex items-start gap-3 font-semibold">
        <span class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-ink">
          <AppIcon name="check" class="size-3.5" />
        </span>
        {{ bullet }}
      </li>
    </ul>
  </div>
</template>
