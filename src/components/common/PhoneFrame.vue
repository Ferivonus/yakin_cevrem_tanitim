<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import { shotRatio, shotSources, type ShotId } from '@/config/shots'
import { openShot } from '@/composables/useShotViewer'
import { useT } from '@/i18n/useT'

const props = withDefaults(
  defineProps<{
    shot: ShotId
    eager?: boolean
    caption?: boolean
    sizes?: string
    decorative?: boolean
  }>(),
  { sizes: '(min-width: 960px) 320px, 70vw' },
)

const t = useT()
const source = computed(() => shotSources(props.shot, t.lang.value))
const ratio = computed(() => shotRatio[props.shot] ?? '1080 / 2340')
const alt = computed(() => t(`shots.${props.shot}.alt`))
</script>

<template>
  <figure class="m-0">
    <component
      :is="decorative ? 'div' : 'button'"
      :type="decorative ? undefined : 'button'"
      :data-shot="decorative ? undefined : shot"
      :aria-label="decorative ? undefined : t('viewer.open', { alt })"
      class="frame relative block w-full rounded-[2.3rem] bg-[#0d1a24] p-[0.4rem] text-left shadow-phone ring-1 ring-white/10"
      :class="decorative ? '' : 'cursor-zoom-in'"
      @click="decorative ? undefined : openShot($event.currentTarget as HTMLElement)"
    >
      <img
        :src="source.src"
        :srcset="source.srcset"
        :sizes="sizes"
        :alt="decorative ? '' : alt"
        width="1080"
        :height="shot === '11' ? 1500 : 2340"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : 'auto'"
        decoding="async"
        draggable="false"
        class="block h-auto w-full rounded-[1.95rem] bg-surface-2"
        :style="{ aspectRatio: ratio }"
      />
      <span
        v-if="!decorative"
        class="zoom pointer-events-none absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-[#0d1a24]/75 text-white shadow-lg ring-1 ring-white/15 backdrop-blur-md"
        aria-hidden="true"
      >
        <AppIcon name="expand" class="size-4.5" />
      </span>
    </component>
    <figcaption v-if="caption" class="mt-4 text-center text-sm font-medium text-muted">
      {{ t(`shots.${shot}.caption`) }}
    </figcaption>
  </figure>
</template>

<style scoped>
.zoom {
  opacity: 0;
  transform: scale(0.8);
  transition:
    opacity 0.35s var(--ease-soft),
    transform 0.45s var(--ease-soft);
}

.frame:hover .zoom,
.frame:focus-visible .zoom {
  opacity: 1;
  transform: none;
}

/* Dokunmatik ekranda üzerine gelme yok; büyütme işareti hep görünür. */
@media (hover: none) {
  .zoom {
    opacity: 0.9;
    transform: none;
  }
}

.frame:focus-visible {
  border-radius: 2.3rem;
}
</style>
