<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import AppIcon from './AppIcon.vue'
import { shotRatio, shotSources } from '@/config/shots'
import { useShotViewer } from '@/composables/useShotViewer'
import { useT } from '@/i18n/useT'

const t = useT()
const { shots, index, close, step } = useShotViewer()
const dialog = ref<HTMLDialogElement>()
const shot = computed(() => shots.value[index.value])
const source = computed(() => (shot.value ? shotSources(shot.value, t.lang.value) : null))
const many = computed(() => shots.value.length > 1)
let startX = 0
let startY = 0

watch(index, async (value, previous) => {
  await nextTick()
  const el = dialog.value
  if (!el) return
  if (value >= 0 && !el.open) el.showModal()
  if (value < 0 && el.open) el.close()
  if ((value < 0) !== (previous < 0)) document.documentElement.classList.toggle('overflow-hidden', value >= 0)
})

function onKey(event: KeyboardEvent) {
  if (event.key === 'ArrowRight') step(1)
  if (event.key === 'ArrowLeft') step(-1)
}

function onPointerDown(event: PointerEvent) {
  startX = event.clientX
  startY = event.clientY
}

// Yana kaydırma sonraki/önceki görsele geçer; boşluğa dokunmak kapatır.
function onPointerUp(event: PointerEvent) {
  const dx = event.clientX - startX
  const dy = event.clientY - startY
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) return step(dx < 0 ? 1 : -1)
  if (Math.abs(dx) < 8 && Math.abs(dy) < 8 && 'backdrop' in (event.target as HTMLElement).dataset) close()
}
</script>

<template>
  <dialog
    ref="dialog"
    class="viewer m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white"
    :aria-label="t('viewer.label')"
    @close="close"
    @keydown="onKey"
  >
    <div
      v-if="shot && source"
      class="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] gap-3 px-4 pt-3 pb-5 sm:px-6"
      data-backdrop
      @pointerdown="onPointerDown"
      @pointerup="onPointerUp"
    >
      <div class="flex items-center justify-between gap-3">
        <p class="text-sm font-semibold text-white/70 tabular-nums" aria-live="polite">
          <template v-if="many">{{ t('viewer.count', { current: index + 1, total: shots.length }) }}</template>
        </p>
        <button
          type="button"
          class="grid size-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          :aria-label="t('viewer.close')"
          @click="close"
        >
          <AppIcon name="close" class="size-5.5" />
        </button>
      </div>

      <div class="relative grid min-h-0 place-items-center" data-backdrop>
        <Transition name="shot" mode="out-in">
          <img
            :key="shot"
            :src="source.src"
            :srcset="source.srcset"
            sizes="34rem"
            :alt="t(`shots.${shot}.alt`)"
            class="pointer-events-none absolute inset-0 m-auto block h-auto max-h-full w-auto max-w-full rounded-[1.6rem] bg-[#0d1a24] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.8)] ring-[0.35rem] ring-[#0d1a24]"
            :style="{ aspectRatio: shotRatio[shot] ?? '1080 / 2340' }"
          />
        </Transition>
        <template v-if="many">
          <button
            type="button"
            class="absolute left-0 hidden size-12 place-items-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white/20 sm:grid lg:left-[8%]"
            :aria-label="t('viewer.prev')"
            @click="step(-1)"
          >
            <AppIcon name="chevronLeft" class="size-6" />
          </button>
          <button
            type="button"
            class="absolute right-0 hidden size-12 place-items-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white/20 sm:grid lg:right-[8%]"
            :aria-label="t('viewer.next')"
            @click="step(1)"
          >
            <AppIcon name="chevronRight" class="size-6" />
          </button>
        </template>
      </div>

      <div class="mx-auto flex w-full max-w-md items-center justify-center gap-3">
        <button
          v-if="many"
          type="button"
          class="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 sm:hidden"
          :aria-label="t('viewer.prev')"
          @click="step(-1)"
        >
          <AppIcon name="chevronLeft" class="size-5.5" />
        </button>
        <p class="flex-1 text-center text-[0.9375rem] font-medium text-balance text-white/85">{{ t(`shots.${shot}.caption`) }}</p>
        <button
          v-if="many"
          type="button"
          class="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 sm:hidden"
          :aria-label="t('viewer.next')"
          @click="step(1)"
        >
          <AppIcon name="chevronRight" class="size-5.5" />
        </button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.viewer::backdrop {
  background: rgb(4 12 20 / 0.86);
  backdrop-filter: blur(10px);
}

.viewer[open] {
  animation: viewer-in 0.35s var(--ease-soft);
}

.viewer[open]::backdrop {
  animation: fade 0.35s var(--ease-soft);
}

.viewer :focus-visible {
  outline-color: #fff;
}

.shot-enter-active,
.shot-leave-active {
  transition:
    opacity 0.22s var(--ease-soft),
    transform 0.3s var(--ease-soft);
}

.shot-enter-from {
  opacity: 0;
  transform: scale(0.97);
}

.shot-leave-to {
  opacity: 0;
}

@keyframes viewer-in {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
}
</style>
