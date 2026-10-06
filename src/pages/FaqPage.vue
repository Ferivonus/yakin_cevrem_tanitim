<script setup lang="ts">
import PageSky from '@/components/sky/PageSky.vue'
import { onMounted } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import FaqItem from '@/components/faq/FaqItem.vue'
import { useT } from '@/i18n/useT'
import { usePageHead } from '@/composables/usePageHead'
import { useFaqStructuredData } from '@/composables/useStructuredData'
import { faqGroups } from '@/config/faq'
import { app } from '@/config/app'

const t = useT()
usePageHead()
useFaqStructuredData()

onMounted(() => {
  const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))
  if (target instanceof HTMLDetailsElement) target.open = true
})
</script>

<template>
  <div class="relative isolate">
    <PageSky />
    <div class="wrap grid gap-12 pt-12 pb-[clamp(4rem,9vw,7.5rem)] sm:pt-16 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
      <div class="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading tag="h1" :eyebrow="t('faq.page.eyebrow')" :title="t('faq.page.title')" :text="t('faq.page.text')" />
        <a
          :href="`mailto:${app.supportEmail}`"
          class="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 font-bold transition-colors hover:border-brand hover:text-brand-ink"
        >
          <AppIcon name="mail" class="size-5" />
          {{ t('faq.page.contact') }}
        </a>
      </div>
      <div class="grid gap-12">
        <section v-for="group in faqGroups" :key="group.id">
          <h2 class="mb-1 text-sm font-bold text-muted">{{ t(`faq.groups.${group.id}`) }}</h2>
          <div class="border-t border-line">
            <FaqItem v-for="id in group.items" :id="id" :key="id" anchor />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
