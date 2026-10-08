<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import { useT } from '@/i18n/useT'
import { pathFor } from '@/router/pages'

const t = useT()
</script>

<template>
  <div class="flex flex-col rounded-card border border-line bg-surface p-6 sm:p-8">
    <span class="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent-ink">
      <AppIcon name="check" class="size-5.5" />
    </span>
    <h2 class="mt-5 text-2xl font-extrabold tracking-tight">{{ t('roadmap.foundation.title') }}</h2>
    <p class="mt-2 text-muted">{{ t('roadmap.foundation.text') }}</p>
    <RouterLink
      :to="pathFor('projects', t.lang.value)"
      class="mt-auto inline-flex items-center gap-2 pt-6 font-bold text-brand-ink hover:underline hover:underline-offset-4"
    >
      {{ t('roadmap.foundation.link') }}
      <AppIcon name="arrowRight" class="size-4.5" />
    </RouterLink>
  </div>
</template>
