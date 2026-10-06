<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    text?: string
    center?: boolean
    tag?: 'h1' | 'h2'
  }>(),
  { tag: 'h2' },
)
</script>

<template>
  <div :class="center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'">
    <p v-if="eyebrow" class="eyebrow mb-3">{{ eyebrow }}</p>
    <component :is="tag" :class="tag === 'h1' ? 'h-display' : 'h-section'">{{ title }}</component>
    <p v-if="text" class="lead mt-4">{{ text }}</p>
    <slot />
  </div>
</template>
