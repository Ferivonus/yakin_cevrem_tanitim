<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { useT } from '@/i18n/useT'
import { useNav } from '@/composables/useNav'

const storageKey = 'yc-lang-hint-dismissed'
const t = useT()
const { otherLang, otherLangPath } = useNav()
const visible = ref(false)

onMounted(() => {
  try {
    if (localStorage.getItem(storageKey)) return
  } catch {
    return
  }
  const prefersTurkish = navigator.languages.some((lang) => lang.toLowerCase().startsWith('tr'))
  visible.value = t.lang.value === 'tr' ? !prefersTurkish : prefersTurkish
})

function dismiss() {
  visible.value = false
  try {
    localStorage.setItem(storageKey, '1')
  } catch {
    return
  }
}
</script>

<template>
  <div v-if="visible" :lang="otherLang" class="bg-night text-sm text-white">
    <div class="wrap flex items-center gap-3 py-2">
      <AppIcon name="globe" class="size-4 shrink-0 opacity-70" />
      <p class="mr-auto">{{ t('langHint.text') }}</p>
      <RouterLink :to="otherLangPath" class="font-bold underline underline-offset-2" @click="dismiss">
        {{ t('langHint.action') }}
      </RouterLink>
      <button type="button" class="-mr-2 grid size-9 place-items-center rounded-full" :aria-label="t('langHint.dismiss')" @click="dismiss">
        <AppIcon name="close" class="size-4" />
      </button>
    </div>
  </div>
</template>
