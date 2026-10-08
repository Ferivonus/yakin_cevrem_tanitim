<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import { useT } from '@/i18n/useT'
import { stages } from '@/config/roadmap'
import { pathFor } from '@/router/pages'

const t = useT()
</script>

<template>
  <RouterLink
    v-reveal
    :to="pathFor('roadmap', t.lang.value)"
    class="banner group grid gap-6 rounded-card border border-line/70 p-6 transition duration-700 ease-[var(--ease-soft)] hover:-translate-y-1 hover:shadow-soft sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center"
  >
    <span class="block">
      <span class="eyebrow inline-flex items-center gap-2">
        <AppIcon name="flag" class="size-4" />
        {{ t('roadmap.banner.eyebrow') }}
      </span>
      <span class="mt-2 block text-2xl font-extrabold tracking-tight">{{ t('roadmap.banner.title') }}</span>
      <span class="mt-1.5 block max-w-2xl text-muted">{{ t('roadmap.banner.text') }}</span>
      <span class="mt-5 flex flex-wrap gap-2">
        <span
          v-for="stage in stages"
          :key="stage.id"
          class="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-sm font-semibold"
        >
          <AppIcon :name="stage.icon" class="size-4 text-brand-ink" />
          {{ t(`roadmap.stages.steps.${stage.id}.title`) }}
        </span>
      </span>
    </span>
    <span class="inline-flex items-center gap-2 font-bold text-brand-ink">
      {{ t('roadmap.banner.link') }}
      <AppIcon name="arrowRight" class="size-4.5 transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1" />
    </span>
  </RouterLink>
</template>

<style scoped>
.banner {
  background: linear-gradient(160deg, color-mix(in oklab, var(--sky-2) 50%, var(--surface)), var(--surface) 65%);
}
</style>
