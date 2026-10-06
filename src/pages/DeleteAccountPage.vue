<script setup lang="ts">
import PageSky from '@/components/sky/PageSky.vue'
import { computed } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { useT } from '@/i18n/useT'
import { usePageHead } from '@/composables/usePageHead'
import { useLegalVersion } from '@/composables/useLegalDate'
import { legalDoc } from '@/content/legal'
import { pathFor } from '@/router/pages'
import { app } from '@/config/app'

const t = useT()
const version = useLegalVersion()
const steps = computed(() => t.list('legal.deleteAccount.steps').map((step) => step.replace('{email}', app.supportEmail)))
const retention = computed(() => legalDoc(t.lang.value, 'privacy')[5])
const mailHref = computed(() => `mailto:${app.supportEmail}?subject=${encodeURIComponent(t('legal.deleteAccount.mailSubject'))}`)

usePageHead()
</script>

<template>
  <div class="relative isolate">
    <PageSky />
    <article class="wrap max-w-[46rem] pt-12 pb-[clamp(4rem,9vw,7.5rem)] sm:pt-16">
      <SectionHeading
        tag="h1"
        :eyebrow="t('legal.deleteAccount.eyebrow')"
        :title="t('legal.deleteAccount.title')"
        :text="t('legal.deleteAccount.text')"
      />

      <ol class="mt-10 grid gap-4">
        <li v-for="(step, index) in steps" :key="step" class="flex gap-4 rounded-card border border-line bg-surface p-5">
          <span class="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white font-extrabold">{{ index + 1 }}</span>
          <p class="pt-1 text-[1.0625rem]">{{ step }}</p>
        </li>
      </ol>

      <div class="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p class="flex gap-2.5 text-muted">
          <AppIcon name="download" class="mt-0.5 size-5 shrink-0 text-brand-ink" />
          {{ t('legal.deleteAccount.tip') }}
        </p>
        <a :href="mailHref" class="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-line bg-surface px-5 py-3 font-bold hover:border-brand hover:text-brand-ink">
          <AppIcon name="mail" class="size-5" />
          {{ app.supportEmail }}
        </a>
      </div>

      <section v-if="retention" class="mt-14 border-t border-line pt-10">
        <h2 class="text-xl font-extrabold tracking-tight">{{ t('legal.deleteAccount.retentionTitle') }}</h2>
        <ul class="mt-4 grid gap-3">
          <li v-for="paragraph in retention.paragraphs" :key="paragraph" class="flex gap-3 text-ink/85">
            <span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
            {{ paragraph }}
          </li>
        </ul>
        <p class="mt-5 text-sm text-muted">
          {{ t('legal.deleteAccount.retentionSource') }}
          <RouterLink :to="pathFor('privacy', t.lang.value)" class="font-bold text-brand-ink hover:underline">{{ t('footer.privacy') }}</RouterLink>
          · {{ version }}
        </p>
      </section>
    </article>
  </div>
</template>
