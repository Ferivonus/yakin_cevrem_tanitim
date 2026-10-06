<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import { useT, type TextKey } from '@/i18n/useT'
import type { TopicCard, TopicKey } from '@/config/topics'

const props = defineProps<{ topic: TopicKey; cards: TopicCard[] }>()
const t = useT()
const text = (id: string, part: 'title' | 'text') => t(`topics.${props.topic}.cards.${id}.${part}` as TextKey)
</script>

<template>
  <ul class="grid gap-4 sm:grid-cols-2" :class="cards.length % 3 === 0 ? 'lg:grid-cols-3' : cards.length === 4 ? 'lg:grid-cols-4' : ''">
    <li
      v-for="(card, index) in cards"
      :key="card.id"
      v-reveal="index * 70"
      class="rounded-card border border-line bg-surface p-6"
    >
      <span class="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand-ink">
        <AppIcon :name="card.icon" class="size-5.5" />
      </span>
      <h3 class="mt-5 text-lg font-extrabold tracking-tight">{{ text(card.id, 'title') }}</h3>
      <p class="mt-1.5 text-muted">{{ text(card.id, 'text') }}</p>
    </li>
  </ul>
</template>
