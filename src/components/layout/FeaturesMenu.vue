<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from '@/components/common/AppIcon.vue'
import { useT } from '@/i18n/useT'
import { useNav } from '@/composables/useNav'
import { pathFor } from '@/router/pages'

const t = useT()
const route = useRoute()
const { topicLinks } = useNav()
const open = ref(false)
const root = ref<HTMLElement>()
const active = computed(() => topicLinks.value.some((link) => link.active) || route.meta.key === 'features')
let timer: ReturnType<typeof setTimeout> | undefined

// Fareyle üzerine gelince kısa bir gecikmeyle açılır; dokunmatikte ve klavyede tıklamayla.
function hover(value: boolean, event: PointerEvent) {
  if (event.pointerType !== 'mouse') return
  clearTimeout(timer)
  timer = setTimeout(() => (open.value = value), value ? 90 : 220)
}

function outside(event: Event) {
  if (open.value && !root.value?.contains(event.target as Node)) open.value = false
}

function onKey(event: KeyboardEvent) {
  if (event.key !== 'Escape' || !open.value) return
  open.value = false
  root.value?.querySelector('button')?.focus()
}

watch(() => route.fullPath, () => (open.value = false))
onMounted(() => document.addEventListener('pointerdown', outside))
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', outside)
  clearTimeout(timer)
})
</script>

<template>
  <div ref="root" class="relative" @pointerenter="hover(true, $event)" @pointerleave="hover(false, $event)" @keydown="onKey">
    <button
      type="button"
      class="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors duration-300"
      :class="active ? 'bg-brand-soft text-brand-ink' : open ? 'text-ink' : 'text-muted hover:text-ink'"
      :aria-expanded="open"
      aria-controls="features-menu"
      @click="open = !open"
    >
      {{ t('nav.explore') }}
      <AppIcon name="chevronDown" class="size-4 transition-transform duration-300" :class="open ? 'rotate-180' : ''" />
    </button>

    <Transition name="menu">
      <div v-show="open" id="features-menu" class="absolute top-full left-1/2 z-50 w-[40rem] -translate-x-1/2 pt-3">
        <div class="overflow-hidden rounded-[1.4rem] border border-line/80 bg-surface shadow-[0_30px_60px_-30px_var(--shadow-b),0_8px_20px_-12px_var(--shadow-a)]">
          <ul class="grid grid-cols-2 gap-1 p-2.5">
            <li v-for="link in topicLinks" :key="link.key">
              <RouterLink
                :to="link.to"
                class="group flex items-start gap-3.5 rounded-2xl p-3 transition-colors duration-300"
                :class="link.active ? (link.love ? 'bg-love-blush' : 'bg-brand-soft/70') : 'hover:bg-surface-2'"
                :aria-current="link.active ? 'page' : undefined"
              >
                <span
                  class="grid size-10 shrink-0 place-items-center rounded-xl transition-transform duration-500 ease-[var(--ease-soft)] group-hover:scale-110"
                  :class="link.love ? 'bg-love-petal text-love' : 'bg-brand-soft text-brand-ink'"
                >
                  <AppIcon :name="link.icon" class="size-5" />
                </span>
                <span class="flex flex-col leading-snug">
                  <span class="font-bold text-ink">{{ link.label }}</span>
                  <span class="text-sm text-muted">{{ link.hint }}</span>
                </span>
              </RouterLink>
            </li>
          </ul>
          <RouterLink
            :to="pathFor('features', t.lang.value)"
            class="group flex items-center justify-between gap-4 border-t border-line/80 bg-surface-2/50 px-5 py-3.5 transition-colors hover:bg-surface-2"
          >
            <span class="flex flex-col leading-snug">
              <span class="text-sm font-bold text-ink">{{ t('nav.features') }}</span>
              <span class="text-sm text-muted">{{ t('nav.hint.features') }}</span>
            </span>
            <AppIcon name="arrowRight" class="size-5 shrink-0 text-brand-ink transition-transform duration-500 group-hover:translate-x-1" />
          </RouterLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.25s var(--ease-soft),
    transform 0.35s var(--ease-soft);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
