<script setup lang="ts">
import { computed } from 'vue'
import { shotRatio, shotSources, type ShotId } from '@/config/shots'
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
</script>

<template>
  <figure class="m-0">
    <div class="rounded-[2.3rem] bg-[#0d1a24] p-[0.4rem] shadow-phone ring-1 ring-white/10">
      <img
        :src="source.src"
        :srcset="source.srcset"
        :sizes="sizes"
        :alt="decorative ? '' : t(`shots.${shot}.alt`)"
        width="1080"
        :height="shot === '11' ? 1500 : 2340"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : 'auto'"
        decoding="async"
        class="block h-auto w-full rounded-[1.95rem] bg-surface-2"
        :style="{ aspectRatio: ratio }"
      />
    </div>
    <figcaption v-if="caption" class="mt-4 text-center text-sm font-medium text-muted">
      {{ t(`shots.${shot}.caption`) }}
    </figcaption>
  </figure>
</template>
