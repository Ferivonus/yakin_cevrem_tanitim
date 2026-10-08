<script setup lang="ts">
import PageSky from '@/components/sky/PageSky.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import AppBadge from '@/components/common/AppBadge.vue'
import PhoneFrame from '@/components/common/PhoneFrame.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import FeatureList from '@/components/features/FeatureList.vue'
import FinalCta from '@/components/common/FinalCta.vue'
import { useT } from '@/i18n/useT'
import { usePageHead } from '@/composables/usePageHead'
import { featureAreas } from '@/config/features'
import { pathFor } from '@/router/pages'

const t = useT()
usePageHead()
</script>

<template>
  <div class="relative isolate">
    <PageSky />
    <div class="wrap pt-12 pb-[clamp(4rem,9vw,7.5rem)] sm:pt-16">
      <SectionHeading tag="h1" :eyebrow="t('features.page.eyebrow')" :title="t('features.page.title')" :text="t('features.page.text')" />

      <nav :aria-label="t('features.page.toc')" class="mt-8 flex flex-wrap gap-2">
        <a
          v-for="area in featureAreas"
          :key="area.id"
          :href="`#${area.id}`"
          class="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-semibold transition-colors hover:border-brand hover:text-brand-ink"
        >
          {{ t(`features.areas.${area.id}.title`) }}
        </a>
      </nav>

      <div class="mt-6 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:gap-6">
        <p class="flex items-center gap-2"><AppBadge status="soon" /> {{ t('features.page.legendSoon') }}</p>
        <p class="flex items-center gap-2"><AppBadge status="pro" /> {{ t('features.page.legendPro') }}</p>
        <RouterLink
          :to="pathFor('roadmap', t.lang.value)"
          class="inline-flex items-center gap-1.5 font-bold text-brand-ink hover:underline hover:underline-offset-4"
        >
          {{ t('roadmap.banner.link') }}
          <AppIcon name="arrowRight" class="size-4" />
        </RouterLink>
      </div>

      <div class="mt-14 grid gap-6">
        <section
          v-for="area in featureAreas"
          :id="area.id"
          :key="area.id"
          v-reveal
          class="scroll-mt-24 rounded-[1.75rem] border p-6 sm:p-9"
          :class="area.id === 'couple' ? 'theme-love border-love-petal bg-bg' : 'border-line bg-surface'"
        >
          <header class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 class="text-2xl font-extrabold tracking-tight sm:text-[1.75rem]">{{ t(`features.areas.${area.id}.title`) }}</h2>
              <p class="mt-1 text-muted">{{ t(`features.areas.${area.id}.text`) }}</p>
            </div>
            <div class="flex shrink-0 flex-wrap items-center gap-2">
              <span class="text-xs font-bold text-muted">{{ t('common.forWhom') }}:</span>
              <span
                v-for="audience in area.audiences"
                :key="audience"
                class="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand-ink"
              >
                {{ t(`audience.${audience}`) }}
              </span>
            </div>
          </header>

          <div class="mt-4" :class="area.id === 'personal' ? 'grid items-start gap-8 md:grid-cols-[1fr_12rem]' : ''">
            <FeatureList :items="area.items" />
            <PhoneFrame v-if="area.id === 'personal'" shot="27" caption sizes="200px" class="mx-auto w-44 md:w-full" />
          </div>

          <RouterLink
            v-if="area.page"
            :to="pathFor(area.page, t.lang.value)"
            class="mt-6 inline-flex items-center gap-2 font-bold text-brand-ink hover:underline hover:underline-offset-4"
          >
            {{ t('common.details') }}
            <AppIcon name="arrowRight" class="size-4.5" />
          </RouterLink>
        </section>
      </div>
    </div>
  </div>
  <FinalCta />
</template>
