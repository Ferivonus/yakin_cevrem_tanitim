<script setup lang="ts">
import PageSky from '@/components/sky/PageSky.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { useT } from '@/i18n/useT'
import { usePageHead } from '@/composables/usePageHead'
import { pathFor } from '@/router/pages'

const t = useT()
usePageHead('notFound')
</script>

<template>
  <div class="relative isolate">
    <PageSky />
    <section class="wrap grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p class="text-[clamp(5rem,18vw,9rem)] leading-none font-extrabold tracking-tighter text-brand/20">{{ t('notFound.code') }}</p>
        <h1 class="h-section mt-2">{{ t('notFound.title') }}</h1>
        <p class="lead mt-3">{{ t('notFound.text') }}</p>
        <RouterLink
          :to="pathFor('home', t.lang.value)"
          class="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:brightness-110"
        >
          {{ t('common.backHome') }}
          <AppIcon name="arrowRight" class="size-4.5" />
        </RouterLink>
      </div>
    </section>
  </div>
</template>
