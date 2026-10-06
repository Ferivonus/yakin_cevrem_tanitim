<script setup lang="ts">
import PageSky from '@/components/sky/PageSky.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useT } from '@/i18n/useT'
import { usePageHead } from '@/composables/usePageHead'
import { useLegalVersion } from '@/composables/useLegalDate'
import { legalDoc } from '@/content/legal'
import { app } from '@/config/app'

const t = useT()
const route = useRoute()
const doc = computed(() => (route.meta.key === 'terms' ? 'terms' : 'privacy'))
const sections = computed(() => legalDoc(t.lang.value, doc.value))
const version = useLegalVersion()

usePageHead()
</script>

<template>
  <div class="relative isolate">
    <PageSky />
    <article class="wrap max-w-[46rem] pt-12 pb-[clamp(4rem,9vw,7.5rem)] sm:pt-16">
      <header class="border-b border-line pb-8">
        <h1 class="h-section">{{ t(doc === 'terms' ? 'footer.terms' : 'footer.privacy') }}</h1>
        <p class="mt-3 text-sm font-semibold text-muted">{{ version }}</p>
      </header>

      <nav :aria-label="t('legal.toc')" class="border-b border-line py-8">
        <h2 class="mb-3 text-sm font-bold text-muted">{{ t('legal.toc') }}</h2>
        <ol class="grid gap-1.5 text-[0.9375rem] sm:grid-cols-2 sm:gap-x-8">
          <li v-for="(section, index) in sections" :key="section.title" class="flex gap-2">
            <span class="w-5 shrink-0 text-muted tabular-nums">{{ index + 1 }}.</span>
            <a :href="`#s${index + 1}`" class="font-semibold hover:text-brand-ink hover:underline">{{ section.title }}</a>
          </li>
          <li v-if="doc === 'privacy'" class="flex gap-2">
            <span class="w-5 shrink-0 text-muted tabular-nums">{{ sections.length + 1 }}.</span>
            <a href="#site" class="font-semibold hover:text-brand-ink hover:underline">{{ t('legal.website.title') }}</a>
          </li>
        </ol>
      </nav>

      <section v-for="(section, index) in sections" :id="`s${index + 1}`" :key="section.title" class="scroll-mt-24 pt-10">
        <h2 class="text-xl font-extrabold tracking-tight">{{ index + 1 }}. {{ section.title }}</h2>
        <p v-for="paragraph in section.paragraphs" :key="paragraph" class="mt-3 text-[1.0625rem] leading-relaxed text-ink/85">
          {{ paragraph }}
        </p>
      </section>

      <section v-if="doc === 'privacy'" id="site" class="scroll-mt-24 pt-10">
        <h2 class="text-xl font-extrabold tracking-tight">{{ sections.length + 1 }}. {{ t('legal.website.title') }}</h2>
        <p v-for="paragraph in t.list('legal.website.paragraphs')" :key="paragraph" class="mt-3 text-[1.0625rem] leading-relaxed text-ink/85">
          {{ paragraph }}
        </p>
      </section>

      <footer class="mt-12 rounded-card bg-surface-2 p-5 text-sm text-muted">
        <p>{{ t('legal.inApp') }}</p>
        <p class="mt-1">
          {{ t('legal.contact') }} <a :href="`mailto:${app.supportEmail}`" class="font-bold text-brand-ink">{{ app.supportEmail }}</a>
        </p>
      </footer>
    </article>
  </div>
</template>
