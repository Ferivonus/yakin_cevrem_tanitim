<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import FaqItem from '@/components/faq/FaqItem.vue'
import { useT } from '@/i18n/useT'
import { pathFor } from '@/router/pages'
import type { FaqId } from '@/config/faq'

defineProps<{ items: FaqId[] }>()
const t = useT()
</script>

<template>
  <section class="grid gap-6 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
    <div v-reveal>
      <h2 class="h-section">{{ t('common.related') }}</h2>
      <RouterLink
        :to="pathFor('faq', t.lang.value)"
        class="mt-4 inline-flex items-center gap-2 font-bold text-brand-ink hover:underline hover:underline-offset-4"
      >
        {{ t('common.allQuestions') }}
        <AppIcon name="arrowRight" class="size-4.5" />
      </RouterLink>
    </div>
    <div v-reveal class="border-t border-line">
      <FaqItem v-for="id in items" :key="id" :id="id" />
    </div>
  </section>
</template>
