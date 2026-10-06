<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import TopicMini from './TopicMini.vue'
import { useT } from '@/i18n/useT'
import { topics, type TopicKey } from '@/config/topics'
import { pathFor } from '@/router/pages'

const t = useT()

const layout: Record<TopicKey, string> = {
  schedule: 'lg:col-span-4',
  plans: 'lg:col-span-2',
  projects: 'lg:col-span-2',
  chat: 'lg:col-span-2',
  couples: 'lg:col-span-2',
  trust: 'sm:col-span-2 lg:col-span-6 lg:grid lg:grid-cols-[1fr_18rem] lg:items-center lg:gap-10',
}
</script>

<template>
  <section :id="t('home.ids.inside')" class="section-y">
    <div class="wrap">
      <SectionHeading
        v-reveal
        :eyebrow="t('home.topics.eyebrow')"
        :title="t('home.topics.title')"
        :text="t('home.topics.text')"
      />

      <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <li
          v-for="(topic, index) in topics"
          :key="topic.key"
          v-reveal="(index % 3) * 80"
          class="topic-card group relative flex flex-col gap-8 rounded-card border p-6 transition duration-700 ease-[var(--ease-soft)] hover:-translate-y-1.5 hover:shadow-soft sm:p-7"
          :class="[layout[topic.key], topic.love ? 'border-love-petal bg-love-blush' : 'card-sky border-line/70']"
        >
          <div>
            <span
              class="grid size-11 place-items-center rounded-xl"
              :class="topic.love ? 'bg-love-petal text-love' : 'bg-brand-soft text-brand-ink'"
            >
              <AppIcon :name="topic.icon" class="size-5.5" />
            </span>
            <h3 class="mt-5 text-xl font-extrabold tracking-tight" :class="topic.love ? 'text-love-deep' : ''">
              <RouterLink :to="pathFor(topic.key, t.lang.value)" class="after:absolute after:inset-0 after:rounded-card">
                {{ t(`nav.${topic.key}`) }}
              </RouterLink>
            </h3>
            <p class="mt-1.5" :class="topic.love ? 'text-love-muted' : 'text-muted'">
              {{ t(`home.topics.cards.${topic.key}`) }}
            </p>
          </div>
          <div class="mt-auto flex items-end justify-between gap-6">
            <TopicMini :topic="topic.key" class="w-full max-w-[17rem]" :class="topic.key === 'schedule' ? 'lg:max-w-[22rem]' : ''" />
            <span
              class="grid size-10 shrink-0 place-items-center rounded-full border transition duration-500 ease-[var(--ease-soft)] group-hover:translate-x-0.5"
              :class="
                topic.love
                  ? 'border-love-petal text-love group-hover:bg-love group-hover:text-white'
                  : 'border-line text-ink group-hover:border-brand group-hover:bg-brand group-hover:text-white'
              "
              aria-hidden="true"
            >
              <AppIcon name="arrowRight" class="size-4.5" />
            </span>
          </div>
        </li>
      </ul>

      <RouterLink
        :to="pathFor('features', t.lang.value)"
        class="mt-8 inline-flex items-center gap-2 font-bold text-brand-ink hover:underline hover:underline-offset-4"
      >
        {{ t('common.allFeatures') }}
        <AppIcon name="arrowRight" class="size-4.5" />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.card-sky {
  background: linear-gradient(165deg, color-mix(in oklab, var(--sky-2) 45%, var(--surface)) 0%, var(--surface) 45%);
}
</style>
