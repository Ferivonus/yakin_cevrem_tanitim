<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import { useT } from '@/i18n/useT'
import { principles } from '@/config/roadmap'

const t = useT()
</script>

<template>
  <section>
    <h2 v-reveal class="h-section">{{ t('roadmap.principles.title') }}</h2>
    <ul class="mt-10 grid gap-4 md:grid-cols-3">
      <li
        v-for="(item, index) in principles"
        :key="item.id"
        v-reveal="index * 80"
        class="rounded-card border border-line bg-surface p-6 sm:p-7"
      >
        <span class="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand-ink">
          <AppIcon :name="item.icon" class="size-5.5" />
        </span>
        <h3 class="mt-5 text-lg font-extrabold tracking-tight">{{ t(`roadmap.principles.items.${item.id}.title`) }}</h3>
        <p class="mt-1.5 text-muted">{{ t(`roadmap.principles.items.${item.id}.text`) }}</p>
      </li>
    </ul>
  </section>
</template>
