<script setup lang="ts">
import PhoneFrame from '@/components/common/PhoneFrame.vue'
import StoreButton from '@/components/common/StoreButton.vue'
import SkyBackdrop from '@/components/sky/SkyBackdrop.vue'
import { useT, type TextKey } from '@/i18n/useT'
import type { Topic } from '@/config/topics'

const props = defineProps<{ topic: Topic }>()
const t = useT()
const text = (part: string) => t(`topics.${props.topic.key}.${part}` as TextKey)
</script>

<template>
  <section class="relative isolate overflow-hidden">
    <SkyBackdrop hills />
    <div class="wrap grid items-center gap-12 pt-10 pb-24 sm:pt-14 md:grid-cols-[1.2fr_0.8fr] lg:pb-32">
      <div class="topic-copy">
        <p class="eyebrow mb-4">{{ text('eyebrow') }}</p>
        <h1 class="h-display">{{ text('title') }}</h1>
        <p class="lead mt-6 max-w-xl">{{ text('text') }}</p>
        <div class="mt-8"><StoreButton /></div>
      </div>
      <PhoneFrame :shot="topic.heroShot" eager caption sizes="(min-width: 768px) 300px, 70vw" class="topic-art mx-auto w-[68%] max-w-[18.5rem] md:w-full" />
    </div>
  </section>
</template>

<style scoped>
.topic-copy > * {
  animation: rise 1.1s var(--ease-soft) both;
}

.topic-copy > :nth-child(2) {
  animation-delay: 0.08s;
}

.topic-copy > :nth-child(3) {
  animation-delay: 0.16s;
}

.topic-copy > :nth-child(4) {
  animation-delay: 0.24s;
}

.topic-art {
  animation: rise 1.4s var(--ease-soft) 0.2s both;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
}
</style>
