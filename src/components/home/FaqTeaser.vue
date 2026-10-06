<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import FaqItem from '@/components/faq/FaqItem.vue'
import { useT } from '@/i18n/useT'
import { homeFaq } from '@/config/faq'
import { pathFor } from '@/router/pages'

const t = useT()
</script>

<template>
  <section :id="t('home.ids.faq')" class="section-y">
    <div class="wrap grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
      <div v-reveal>
        <h2 class="h-section">{{ t('home.faqTeaser.title') }}</h2>
        <RouterLink
          :to="pathFor('faq', t.lang.value)"
          class="mt-5 inline-flex items-center gap-2 font-bold text-brand-ink hover:underline hover:underline-offset-4"
        >
          {{ t('common.allQuestions') }}
          <AppIcon name="arrowRight" class="size-4.5" />
        </RouterLink>
      </div>
      <div v-reveal class="border-t border-line">
        <FaqItem v-for="id in homeFaq" :key="id" :id="id" />
      </div>
    </div>
  </section>
</template>
