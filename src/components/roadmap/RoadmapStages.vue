<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { useT } from '@/i18n/useT'
import { stages } from '@/config/roadmap'

const t = useT()
</script>

<template>
  <section>
    <SectionHeading v-reveal :title="t('roadmap.stages.title')" :text="t('roadmap.stages.text')" />

    <ol class="mt-12 grid gap-6">
      <li v-for="(stage, index) in stages" :key="stage.id" v-reveal class="stage relative grid gap-4 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
        <div class="relative hidden sm:block" aria-hidden="true">
          <span
            class="relative z-10 grid size-14 place-items-center rounded-2xl"
            :class="index === 0 ? 'bg-brand text-white shadow-[0_12px_26px_-14px_var(--brand)]' : 'border border-line bg-surface text-brand-ink'"
          >
            <AppIcon :name="stage.icon" class="size-6" />
          </span>
          <span v-if="index < stages.length - 1" class="rail absolute top-14 -bottom-6 left-1/2 w-0.5 -translate-x-1/2" />
        </div>

        <div class="rounded-card border p-6 sm:p-8" :class="index === 0 ? 'first-stage border-brand/30' : 'border-line bg-surface'">
          <span
            class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
            :class="index === 0 ? 'bg-brand text-white' : 'bg-surface-2 text-muted'"
          >
            <AppIcon :name="stage.icon" class="size-3.5 sm:hidden" />
            {{ index + 1 }} · {{ t(`roadmap.stages.steps.${stage.id}.label`) }}
          </span>
          <h3 class="mt-3 text-2xl font-extrabold tracking-tight">{{ t(`roadmap.stages.steps.${stage.id}.title`) }}</h3>
          <p class="mt-1 text-muted">{{ t(`roadmap.stages.steps.${stage.id}.text`) }}</p>
          <ul class="mt-5 grid gap-x-8 md:grid-cols-2">
            <li
              v-for="item in t.list(`roadmap.stages.steps.${stage.id}.items`)"
              :key="item"
              class="flex items-start gap-3 border-t border-line/70 py-3"
            >
              <AppIcon name="clock" class="mt-0.5 size-4.5 shrink-0 text-muted" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </li>
    </ol>
    <p class="mt-6 text-sm text-muted">{{ t('common.soonHint') }}</p>
  </section>
</template>

<style scoped>
.rail {
  background: linear-gradient(var(--brand), var(--line));
  opacity: 0.5;
}

.first-stage {
  background: linear-gradient(165deg, color-mix(in oklab, var(--sky-2) 45%, var(--surface)) 0%, var(--surface) 55%);
}
</style>
