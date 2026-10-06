<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import PhoneFrame from '@/components/common/PhoneFrame.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { useT } from '@/i18n/useT'
import { pathFor } from '@/router/pages'
import type { ShotId } from '@/config/shots'

type TabId = 'friends' | 'team' | 'family' | 'couple'

const t = useT()

const tabs: { id: TabId; shot: ShotId; page: 'plans' | 'projects' | 'couples' }[] = [
  { id: 'friends', shot: '04', page: 'plans' },
  { id: 'team', shot: '10', page: 'projects' },
  { id: 'family', shot: '06', page: 'plans' },
  { id: 'couple', shot: '01', page: 'couples' },
]

const selected = ref<TabId>('friends')

onMounted(() => {
  const hash = decodeURIComponent(location.hash.slice(1))
  const match = tabs.find((tab) => t(`home.who.tabs.${tab.id}.hash`) === hash)
  if (match) selected.value = match.id
})

watch(selected, (id) => {
  history.replaceState(history.state, '', `#${t(`home.who.tabs.${id}.hash`)}`)
})
</script>

<template>
  <section :id="t('home.ids.who')" class="who section-y">
    <div class="wrap">
      <SectionHeading v-reveal center :eyebrow="t('home.who.eyebrow')" :title="t('home.who.title')" />

      <fieldset class="mt-10">
        <legend class="sr-only">{{ t('home.who.legend') }}</legend>
        <div class="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          <div class="mx-auto flex w-max gap-1 rounded-full border border-line/70 bg-surface/80 p-1.5 shadow-soft backdrop-blur-md">
            <span v-for="tab in tabs" :key="tab.id" class="flex">
              <input
                :id="t(`home.who.tabs.${tab.id}.hash`)"
                v-model="selected"
                type="radio"
                name="who"
                :value="tab.id"
                class="peer sr-only"
              />
              <label
                :for="t(`home.who.tabs.${tab.id}.hash`)"
                class="cursor-pointer rounded-full px-4 py-2.5 text-[0.9375rem] font-bold whitespace-nowrap text-muted transition-colors duration-500 select-none peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand hover:text-ink sm:px-5"
                :class="tab.id === 'couple' ? 'peer-checked:bg-love peer-checked:text-white' : 'peer-checked:bg-brand peer-checked:text-white'"
              >
                {{ t(`home.who.tabs.${tab.id}.label`) }}
              </label>
            </span>
          </div>
        </div>
      </fieldset>

      <div class="stage relative isolate mt-6 grid overflow-hidden rounded-[2rem] border border-line/70 shadow-soft">
        <article
          v-for="tab in tabs"
          :key="tab.id"
          class="panel grid items-center gap-8 p-6 [grid-area:1/1] sm:p-10 md:grid-cols-[1fr_auto] md:gap-12 lg:px-16"
          :data-tab="tab.id"
        >
          <div class="max-w-lg">
            <h3 class="panel-title text-[clamp(1.5rem,3vw,2.125rem)] leading-tight font-extrabold tracking-tight">
              {{ t(`home.who.tabs.${tab.id}.title`) }}
            </h3>
            <p class="panel-text mt-3 text-lg text-muted">{{ t(`home.who.tabs.${tab.id}.text`) }}</p>
            <ul class="mt-6 flex flex-wrap gap-2">
              <li
                v-for="chip in t.list(`home.who.tabs.${tab.id}.chips`)"
                :key="chip"
                class="chip rounded-full px-3.5 py-1.5 text-sm font-semibold"
              >
                {{ chip }}
              </li>
            </ul>
            <RouterLink
              :to="pathFor(tab.page, t.lang.value)"
              class="panel-link mt-8 inline-flex items-center gap-2 font-bold"
            >
              {{ t('home.who.go', { page: t(`nav.${tab.page}`) }) }}
              <AppIcon name="arrowRight" class="size-4.5" />
            </RouterLink>
          </div>
          <PhoneFrame
            :shot="tab.shot"
            sizes="(min-width: 768px) 260px, 60vw"
            class="mx-auto w-[64%] max-w-[16.5rem] md:w-[16.5rem]"
          />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stage {
  background: linear-gradient(170deg, color-mix(in oklab, var(--sky-2) 70%, var(--surface)) 0%, var(--surface) 55%);
}

.stage::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(170deg, var(--love-petal) 0%, var(--love-blush) 60%);
  opacity: 0;
  transition: opacity 0.8s var(--ease-soft);
}

.panel {
  opacity: 0;
  visibility: hidden;
  transform: translateY(14px);
  filter: blur(4px);
  transition:
    opacity 0.45s var(--ease-soft),
    transform 0.6s var(--ease-soft),
    filter 0.45s var(--ease-soft),
    visibility 0s linear 0.45s;
}

.chip {
  background: var(--brand-soft);
  color: var(--brand-ink);
}

.panel-link {
  color: var(--brand-ink);
}

.who:has(input[value='friends']:checked) .panel[data-tab='friends'],
.who:has(input[value='team']:checked) .panel[data-tab='team'],
.who:has(input[value='family']:checked) .panel[data-tab='family'],
.who:has(input[value='couple']:checked) .panel[data-tab='couple'] {
  opacity: 1;
  visibility: visible;
  transform: none;
  filter: none;
  transition:
    opacity 0.7s var(--ease-soft) 0.15s,
    transform 0.9s var(--ease-soft) 0.15s,
    filter 0.7s var(--ease-soft) 0.15s,
    visibility 0s;
}

.who:has(input[value='couple']:checked) .stage {
  border-color: var(--love-petal);
}

.who:has(input[value='couple']:checked) .stage::before {
  opacity: 1;
}

.panel[data-tab='couple'] .panel-title {
  color: var(--love-deep);
}

.panel[data-tab='couple'] .panel-text {
  color: var(--love-muted);
}

.panel[data-tab='couple'] .chip {
  background: var(--love-petal);
  color: var(--love-deep);
}

.panel[data-tab='couple'] .panel-link {
  color: var(--love-deep);
}
</style>
