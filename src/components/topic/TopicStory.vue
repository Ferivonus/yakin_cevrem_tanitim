<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import PhoneFrame from '@/components/common/PhoneFrame.vue'
import RowText from './RowText.vue'
import { useT, type TextKey } from '@/i18n/useT'
import type { TopicKey, TopicRow } from '@/config/topics'

const props = defineProps<{ topic: TopicKey; rows: TopicRow[] }>()
const t = useT()

const active = ref(0)
const articles = ref<HTMLElement[]>([])
let observer: IntersectionObserver | undefined

onMounted(() => {
  // Ekranın ortasındaki metin, yapışkan telefonda hangi görselin görüneceğini seçer.
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (entry.isIntersecting) active.value = Number((entry.target as HTMLElement).dataset.index)
    },
    { rootMargin: '-45% 0px -45% 0px' },
  )
  articles.value.forEach((article) => observer?.observe(article))
})

onBeforeUnmount(() => observer?.disconnect())

function go(index: number) {
  articles.value[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const title = (row: TopicRow) => t(`topics.${props.topic}.rows.${row.id}.title` as TextKey)
</script>

<template>
  <div class="grid grid-cols-[minmax(0,1fr)_minmax(0,25rem)] gap-16 xl:gap-24">
    <div>
      <article
        v-for="(row, index) in rows"
        :key="row.id"
        ref="articles"
        :data-index="index"
        class="flex min-h-[72vh] flex-col justify-center py-10 transition-opacity duration-700 ease-[var(--ease-soft)]"
        :class="active === index ? 'opacity-100' : 'opacity-35'"
      >
        <RowText :topic="topic" :row="row">
          <p class="eyebrow mb-3">{{ String(index + 1).padStart(2, '0') }} / {{ String(rows.length).padStart(2, '0') }}</p>
        </RowText>
      </article>
    </div>

    <div class="relative">
      <div class="sticky top-[12vh] flex h-[76vh] items-center justify-center">
        <div class="stage relative grid h-full w-full place-items-center">
          <div
            v-for="(row, index) in rows"
            :key="row.id"
            class="layer absolute inset-0 flex items-center justify-center gap-5"
            :class="active === index ? 'is-active' : ''"
            :aria-hidden="active !== index"
          >
            <PhoneFrame
              v-for="shot in row.shots"
              :key="shot"
              :shot="shot"
              caption
              :decorative="active !== index"
              :sizes="row.shots.length > 1 ? '210px' : '300px'"
              :class="row.shots.length > 1 ? 'w-[min(12.5rem,27vh)]' : shot === '11' ? 'w-[min(22rem,48vh)]' : 'w-[min(18.5rem,33vh)]'"
            />
          </div>
        </div>

        <nav class="absolute top-1/2 right-0 grid -translate-y-1/2 gap-3 xl:-right-6" :aria-label="t('common.inThisPage')">
          <button
            v-for="(row, index) in rows"
            :key="row.id"
            type="button"
            class="dot size-2.5 rounded-full transition-all duration-500"
            :class="active === index ? 'h-7 bg-brand' : 'bg-line hover:bg-brand/50'"
            :aria-label="title(row)"
            :aria-current="active === index ? 'step' : undefined"
            @click="go(index)"
          />
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layer {
  opacity: 0;
  transform: translateY(18px) scale(0.97);
  pointer-events: none;
  transition:
    opacity 0.6s var(--ease-soft),
    transform 0.8s var(--ease-soft);
}

.layer.is-active {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}

.stage::before {
  content: '';
  position: absolute;
  inset: 12% 4%;
  border-radius: 999px;
  background: radial-gradient(circle, color-mix(in oklab, var(--sky-2) 70%, transparent), transparent 68%);
  filter: blur(8px);
}

@media (prefers-reduced-motion: reduce) {
  .layer {
    transition: none;
  }
}
</style>
