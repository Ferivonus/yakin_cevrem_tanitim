<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ text: string; mark: string; tag?: 'h1' | 'h2' }>(), { tag: 'h2' })

const parts = computed(() => {
  const index = props.text.lastIndexOf(props.mark)
  if (index < 0) return { before: props.text, mark: '' }
  return { before: props.text.slice(0, index), mark: props.mark }
})
</script>

<template>
  <component :is="tag">
    {{ parts.before }}<span v-if="parts.mark" class="serif-mark relative inline-block pr-[0.08em] text-brand-ink sm:whitespace-nowrap">
      {{ parts.mark }}
      <svg
        class="squiggle absolute -bottom-[0.18em] left-0 h-[0.32em] w-full text-accent"
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M3 9.5C28 3 52 12 78 7s50-4 74 0 32 3 45-2"
          fill="none"
          stroke="currentColor"
          stroke-width="5"
          stroke-linecap="round"
          pathLength="1"
        />
      </svg>
    </span>
  </component>
</template>

<style scoped>
.squiggle path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw 1.6s var(--ease-soft) 0.7s forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
