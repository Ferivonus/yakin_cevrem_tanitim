<script setup lang="ts">
import { computed } from 'vue'
import SiteLogo from './SiteLogo.vue'
import StoreButton from '@/components/common/StoreButton.vue'
import { useT } from '@/i18n/useT'
import { useNav } from '@/composables/useNav'
import { pathFor } from '@/router/pages'
import { app } from '@/config/app'

const t = useT()
const { otherLang, otherLangPath, topicLinks, homePath } = useNav()

const appLinks = computed(() => [
  ...topicLinks.value.filter((link) => link.key !== 'trust').map(({ to, label }) => ({ to, label })),
  { to: pathFor('features', t.lang.value), label: t('nav.features') },
  { to: pathFor('roadmap', t.lang.value), label: t('nav.roadmap') },
])

const trustLinks = computed(() => [
  { to: pathFor('trust', t.lang.value), label: t('footer.trustPage') },
  { to: pathFor('privacy', t.lang.value), label: t('footer.privacy') },
  { to: pathFor('terms', t.lang.value), label: t('footer.terms') },
  { to: pathFor('deleteAccount', t.lang.value), label: t('footer.deleteAccount') },
])
</script>

<template>
  <footer class="relative mt-10 bg-surface">
    <svg
      class="pointer-events-none absolute inset-x-0 bottom-full h-[clamp(2.5rem,6vw,5rem)] w-full"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path class="hill-far" d="M0 60C200 20 420 10 640 40s420 50 600 20 160-30 200-24v64H0z" />
      <path class="hill-near" d="M0 76c220-30 460-40 720-14s500 26 720-8v46H0z" />
    </svg>
    <div class="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <div class="flex flex-col items-start gap-4">
        <RouterLink :to="homePath" :aria-label="t('nav.home')"><SiteLogo /></RouterLink>
        <p class="max-w-64 text-sm text-muted">{{ t('footer.tagline') }}</p>
        <StoreButton />
        <p class="text-xs font-medium text-muted">{{ t('store.note') }}</p>
      </div>

      <nav :aria-label="t('footer.app')">
        <h2 class="mb-3 text-sm font-bold text-ink">{{ t('footer.app') }}</h2>
        <ul class="grid gap-2 text-sm">
          <li v-for="link in appLinks" :key="link.to">
            <RouterLink :to="link.to" class="text-muted transition-colors hover:text-ink">{{ link.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <nav :aria-label="t('footer.trust')">
        <h2 class="mb-3 text-sm font-bold text-ink">{{ t('footer.trust') }}</h2>
        <ul class="grid gap-2 text-sm">
          <li v-for="link in trustLinks" :key="link.to">
            <RouterLink :to="link.to" class="text-muted transition-colors hover:text-ink">{{ link.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <div>
        <h2 class="mb-3 text-sm font-bold text-ink">{{ t('footer.help') }}</h2>
        <ul class="grid gap-2 text-sm">
          <li>
            <RouterLink :to="pathFor('faq', t.lang.value)" class="text-muted transition-colors hover:text-ink">
              {{ t('nav.faq') }}
            </RouterLink>
          </li>
          <li>
            <a :href="`mailto:${app.supportEmail}`" class="text-muted transition-colors hover:text-ink">
              {{ t('footer.contact') }}
            </a>
          </li>
          <li>
            <RouterLink :to="otherLangPath" :hreflang="otherLang" :lang="otherLang" class="text-muted transition-colors hover:text-ink">
              {{ t('nav.language') }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="wrap flex flex-col gap-1 border-t border-line py-6 text-xs text-muted sm:flex-row sm:justify-between">
      <p>{{ t('footer.copyright') }} · {{ t('footer.madeIn') }}</p>
      <p>{{ app.supportEmail }}</p>
    </div>
  </footer>
</template>

<style scoped>
.hill-far {
  fill: var(--grass-2);
  opacity: 0.6;
}

.hill-near {
  fill: var(--surface);
}
</style>
