<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import { useT } from '@/i18n/useT'
import { app } from '@/config/app'

const t = useT()
const mailHref = () => `mailto:${app.supportEmail}?subject=${encodeURIComponent(t('roadmap.pilot.subject'))}`
</script>

<template>
  <div class="pilot flex flex-col rounded-card border border-brand/25 p-6 sm:p-8">
    <span class="grid size-11 place-items-center rounded-xl bg-brand text-white">
      <AppIcon name="sparkle" class="size-5.5" />
    </span>
    <h2 class="mt-5 text-2xl font-extrabold tracking-tight">{{ t('roadmap.pilot.title') }}</h2>
    <p class="mt-2 text-muted">{{ t('roadmap.pilot.text') }}</p>
    <div class="mt-auto pt-6">
      <a
        :href="mailHref()"
        class="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-bold text-bg transition duration-500 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:shadow-soft"
      >
        <AppIcon name="mail" class="size-4.5" />
        {{ t('roadmap.pilot.action') }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.pilot {
  background: linear-gradient(160deg, color-mix(in oklab, var(--sky-2) 55%, var(--surface)), var(--surface) 70%);
}
</style>
