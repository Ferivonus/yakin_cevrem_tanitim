<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import { useT } from '@/i18n/useT'

const t = useT()
</script>

<template>
  <section class="marquee relative border-y border-line/60 bg-surface/60 py-4 backdrop-blur" :aria-label="t('home.marquee.label')">
    <div class="track flex w-max">
      <ul v-for="copy in 2" :key="copy" class="flex shrink-0 items-center" :aria-hidden="copy === 2 ? 'true' : undefined">
        <li
          v-for="item in t.list('home.marquee.items')"
          :key="item"
          class="flex items-center gap-2 px-5 text-[0.9375rem] font-semibold whitespace-nowrap text-ink/80"
        >
          <span class="grid size-5 place-items-center rounded-full bg-accent-soft text-accent-ink">
            <AppIcon name="check" class="size-3" />
          </span>
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
}

.track {
  animation: slide 60s linear infinite;
}

.marquee:hover .track {
  animation-play-state: paused;
}

@keyframes slide {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee {
    overflow-x: auto;
  }

  .track {
    animation: none !important;
  }
}
</style>
