<script setup lang="ts">
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import LanguageHint from '@/components/layout/LanguageHint.vue'
import { useT } from '@/i18n/useT'

const t = useT()
</script>

<template>
  <a
    href="#main"
    class="sr-only z-50 rounded-full bg-brand px-4 py-2 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
  >
    {{ t('nav.skip') }}
  </a>
  <LanguageHint />
  <SiteHeader />
  <main id="main">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <div :key="route.path">
          <component :is="Component" />
        </div>
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
</template>
