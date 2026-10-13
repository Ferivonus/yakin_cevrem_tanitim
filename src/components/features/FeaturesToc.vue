<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useT } from '@/i18n/useT'
import { featureAreas } from '@/config/features'

const t = useT()
const active = ref<string>(featureAreas[0]?.id ?? '')
let observer: IntersectionObserver | undefined

onMounted(() => {
  // Ekranın üst üçte birindeki alan, yan menüde seçili görünür.
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (entry.isIntersecting) active.value = entry.target.id
    },
    { rootMargin: '-25% 0px -65% 0px' },
  )
  for (const area of featureAreas) {
    const el = document.getElementById(area.id)
    if (el) observer.observe(el)
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <nav :aria-label="t('features.page.toc')" class="sticky top-24 self-start">
    <ul class="grid gap-0.5 border-l border-line">
      <li v-for="area in featureAreas" :key="area.id">
        <a
          :href="`#${area.id}`"
          class="-ml-px block border-l-2 py-2 pr-2 pl-4 text-[0.9375rem] font-semibold transition-colors duration-300"
          :class="active === area.id ? 'border-brand text-brand-ink' : 'border-transparent text-muted hover:text-ink'"
          :aria-current="active === area.id ? 'location' : undefined"
        >
          {{ t(`features.areas.${area.id}.title`) }}
        </a>
      </li>
    </ul>
  </nav>
</template>
