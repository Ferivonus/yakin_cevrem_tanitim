<script setup lang="ts">
import PhoneFrame from '@/components/common/PhoneFrame.vue'
import RowText from './RowText.vue'
import type { TopicKey, TopicRow } from '@/config/topics'

defineProps<{ topic: TopicKey; row: TopicRow; flip: boolean }>()
</script>

<template>
  <article class="grid items-center gap-10 md:grid-cols-2 md:gap-16">
    <RowText v-reveal :topic="topic" :row="row" :class="flip ? 'md:order-2' : ''" />
    <div v-reveal="100" class="flex justify-center gap-4 sm:gap-6" :class="flip ? 'md:order-1' : ''">
      <PhoneFrame
        v-for="shot in row.shots"
        :key="shot"
        :shot="shot"
        caption
        :sizes="row.shots.length > 1 ? '(min-width: 768px) 210px, 42vw' : '(min-width: 768px) 280px, 64vw'"
        :class="row.shots.length > 1 ? 'w-1/2 max-w-[13.5rem]' : shot === '11' ? 'w-[72%] max-w-[20rem]' : 'w-[64%] max-w-[17rem]'"
      />
    </div>
  </article>
</template>
