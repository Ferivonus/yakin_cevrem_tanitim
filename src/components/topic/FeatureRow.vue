<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import PhoneFrame from '@/components/common/PhoneFrame.vue'
import { useT, type TextKey } from '@/i18n/useT'
import type { TopicKey, TopicRow } from '@/config/topics'

const props = defineProps<{ topic: TopicKey; row: TopicRow; flip: boolean }>()
const t = useT()
const base = `topics.${props.topic}.rows.${props.row.id}`
const bullets = t.list(`${base}.bullets` as Parameters<typeof t.list>[0])
</script>

<template>
  <article class="grid items-center gap-10 md:grid-cols-2 md:gap-16">
    <div v-reveal :class="flip ? 'md:order-2' : ''">
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
