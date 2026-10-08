<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import RoadmapBanner from '@/components/roadmap/RoadmapBanner.vue'
import { useT } from '@/i18n/useT'

const t = useT()
</script>

<template>
  <section class="section-y pb-0">
    <div class="wrap">
      <div v-reveal class="max-w-2xl">
        <h2 class="h-section">{{ t('home.soon.title') }}</h2>
        <p class="lead mt-3">{{ t('home.soon.text') }}</p>
        <p class="mt-2 text-sm font-medium text-muted">{{ t('common.soonHint') }}</p>
      </div>
      <ul class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <li
          v-for="(item, index) in t.list('home.soon.items')"
          :key="item"
          v-reveal="index * 90"
          class="soon-card group flex gap-3 rounded-card border border-line/70 p-5 transition duration-700 ease-[var(--ease-soft)] hover:-translate-y-1.5 hover:shadow-soft lg:flex-col"
        >
          <span class="grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft text-accent transition-transform duration-700 ease-[var(--ease-soft)] group-hover:rotate-12">
            <AppIcon name="sparkle" class="size-4.5" />
          </span>
          <span class="font-semibold">{{ item }}</span>
        </li>
      </ul>
      <RoadmapBanner class="mt-6" />
    </div>
  </section>
</template>

<style scoped>
.soon-card {
  background: linear-gradient(170deg, color-mix(in oklab, var(--sky-2) 40%, var(--surface)), var(--surface) 60%);
}
</style>
