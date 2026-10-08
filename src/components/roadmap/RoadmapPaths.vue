<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { useT } from '@/i18n/useT'
import { paths } from '@/config/roadmap'

const t = useT()
</script>

<template>
  <section>
    <SectionHeading v-reveal :title="t('roadmap.paths.title')" :text="t('roadmap.paths.text')" />
    <ul class="mt-10 grid gap-4 sm:grid-cols-2">
      <li
        v-for="(path, index) in paths"
        :key="path.id"
        v-reveal="(index % 2) * 80"
        class="path-card flex gap-5 rounded-card border border-line/70 p-6 sm:p-7"
      >
        <span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand-ink">
          <AppIcon :name="path.icon" class="size-6" />
        </span>
        <div class="flex flex-col items-start">
          <h3 class="text-lg font-extrabold tracking-tight">{{ t(`roadmap.paths.items.${path.id}.title`) }}</h3>
          <p class="mt-1.5 text-muted">{{ t(`roadmap.paths.items.${path.id}.text`) }}</p>
          <span class="mt-4 rounded-full bg-sun-soft px-2.5 py-0.5 text-xs font-bold text-sun-ink">
            {{ t(`roadmap.stages.steps.${path.stage}.label`) }} · {{ t(`roadmap.stages.steps.${path.stage}.title`) }}
          </span>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.path-card {
  background: linear-gradient(170deg, color-mix(in oklab, var(--sky-2) 35%, var(--surface)), var(--surface) 60%);
}
</style>
