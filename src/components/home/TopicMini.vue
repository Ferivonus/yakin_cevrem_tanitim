<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import type { TopicKey } from '@/config/topics'

defineProps<{ topic: TopicKey }>()

const week = [
  [1, 0, 1, 1, 0, 1, 0],
  [1, 1, 0, 1, 1, 0, 0],
  [0, 1, 2, 0, 1, 2, 2],
]
const columns = [[1, 0.6], [0.8], [1, 0.7, 0.5]]
const toggles = [true, true, false]
</script>

<template>
  <div aria-hidden="true" class="pointer-events-none select-none">
    <div v-if="topic === 'schedule'" class="grid grid-cols-7 gap-1.5">
      <template v-for="(row, r) in week" :key="r">
        <span
          v-for="(cell, c) in row"
          :key="`${r}-${c}`"
          class="h-7 rounded-lg sm:h-8"
          :class="cell === 2 ? 'grid place-items-center bg-brand text-white' : cell ? 'bg-brand-soft' : 'bg-surface-2'"
        >
          <AppIcon v-if="cell === 2" name="check" class="size-3.5" />
        </span>
      </template>
    </div>

    <div v-else-if="topic === 'plans'" class="grid gap-2">
      <div v-for="(width, i) in [42, 86, 24]" :key="i" class="flex items-center gap-2">
        <span class="h-6 flex-1 overflow-hidden rounded-lg bg-surface-2">
          <span class="block h-full rounded-lg" :class="i === 1 ? 'bg-brand' : 'bg-brand-soft'" :style="{ width: `${width}%` }" />
        </span>
        <AppIcon name="check" class="size-4" :class="i === 1 ? 'text-brand' : 'opacity-0'" />
      </div>
    </div>

    <div v-else-if="topic === 'projects'" class="grid grid-cols-3 gap-2">
      <div v-for="(column, i) in columns" :key="i" class="grid content-start gap-1.5 rounded-xl bg-surface-2 p-1.5">
        <span
          v-for="(fill, j) in column"
          :key="j"
          class="h-5 rounded-md"
          :class="i === 2 && j === 0 ? 'bg-success/80' : 'bg-surface'"
          :style="{ width: `${fill * 100}%` }"
        />
      </div>
    </div>

    <div v-else-if="topic === 'chat'" class="grid gap-1.5">
      <span class="h-6 w-3/5 rounded-2xl rounded-bl-md bg-surface-2" />
      <span class="flex h-9 w-4/5 items-center gap-2 justify-self-end rounded-2xl rounded-br-md bg-brand px-2.5">
        <span class="size-4 rounded-md bg-white/35" />
        <span class="h-2 flex-1 rounded-full bg-white/40" />
      </span>
      <span class="h-6 w-2/5 rounded-2xl rounded-bl-md bg-surface-2" />
    </div>

    <div v-else-if="topic === 'couples'" class="flex items-center gap-2">
      <span class="size-12 rounded-full bg-love-petal" />
      <AppIcon name="heart" class="heart size-6 fill-current text-love" />
      <span class="size-12 rounded-full bg-love-petal" />
    </div>

    <div v-else-if="topic === 'trust'" class="grid gap-2">
      <div v-for="(on, i) in toggles" :key="i" class="flex items-center gap-3">
        <span class="h-2.5 flex-1 rounded-full bg-surface-2" />
        <span class="flex h-6 w-10 items-center rounded-full p-0.5" :class="on ? 'justify-end bg-brand' : 'bg-line'">
          <span class="size-5 rounded-full bg-white shadow-sm" />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.heart {
  transition: transform 0.3s ease;
}

.topic-card:hover .heart {
  animation: beat 0.9s ease-in-out;
}

@keyframes beat {
  25% {
    transform: scale(1.18);
  }
  50% {
    transform: scale(0.96);
  }
  75% {
    transform: scale(1.1);
  }
}
</style>
