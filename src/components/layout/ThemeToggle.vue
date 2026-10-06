<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { useT } from '@/i18n/useT'

type Theme = 'light' | 'dark'

const storageKey = 'yc-theme'
const t = useT()
const theme = ref<Theme>('light')

onMounted(() => {
  const set = document.documentElement.dataset.theme
  theme.value = set === 'dark' || set === 'light' ? set : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
})

function toggle() {
  const root = document.documentElement
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  root.classList.add('theme-switching')
  root.dataset.theme = theme.value
  setTimeout(() => root.classList.remove('theme-switching'), 700)
  try {
    localStorage.setItem(storageKey, theme.value)
  } catch {
    return
  }
}
</script>

<template>
  <button
    type="button"
    class="grid size-10 place-items-center rounded-full text-muted transition-colors duration-500 hover:bg-surface-2 hover:text-ink"
    :aria-label="theme === 'dark' ? t('nav.themeLight') : t('nav.themeDark')"
    @click="toggle"
  >
    <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" class="icon size-5" />
  </button>
</template>

<style scoped>
.icon {
  transition: transform 0.6s var(--ease-soft);
}

button:hover .icon {
  transform: rotate(-18deg);
}
</style>
