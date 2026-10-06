<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from '@/components/common/AppIcon.vue'
import SiteLogo from './SiteLogo.vue'
import MobileMenu from './MobileMenu.vue'
import ThemeToggle from './ThemeToggle.vue'
import { useT } from '@/i18n/useT'
import { useNav } from '@/composables/useNav'

const t = useT()
const route = useRoute()
const { otherLang, otherLangPath, homePath, downloadPath, topicLinks } = useNav()
const open = ref(false)

watch(() => route.fullPath, () => (open.value = false))
watch(open, (value) => document.documentElement.classList.toggle('overflow-hidden', value))
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line/50 bg-bg/70 backdrop-blur-xl backdrop-saturate-150">
    <div class="wrap flex h-16 items-center gap-4">
      <RouterLink :to="homePath" class="mr-auto shrink-0 lg:mr-0" :aria-label="t('nav.home')">
        <SiteLogo />
      </RouterLink>

      <nav :aria-label="t('nav.main')" class="mx-auto hidden lg:block">
        <ul class="flex items-center gap-1">
          <li v-for="link in topicLinks" :key="link.key">
            <RouterLink
              :to="link.to"
              class="rounded-full px-3.5 py-2 text-[0.9375rem] font-semibold transition-colors duration-500"
              :class="
                link.active
                  ? link.love
                    ? 'bg-love-petal text-love-deep'
                    : 'bg-brand-soft text-brand-ink'
                  : 'text-muted hover:text-ink'
              "
              :aria-current="link.active ? 'page' : undefined"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2">
        <ThemeToggle />
        <RouterLink
          :to="otherLangPath"
          :hreflang="otherLang"
          :lang="otherLang"
          class="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold text-muted transition-colors hover:text-ink sm:inline-flex"
          :aria-label="t('nav.languageLabel')"
        >
          <AppIcon name="globe" class="size-4.5" />
          {{ t('nav.languageShort') }}
        </RouterLink>
        <RouterLink
          :to="downloadPath"
          class="rounded-full bg-brand px-4 py-2 text-sm font-bold text-white shadow-[0_8px_20px_-10px_var(--brand)] transition duration-500 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:shadow-[0_14px_26px_-12px_var(--brand)]"
        >
          {{ t('nav.download') }}
        </RouterLink>
        <button
          type="button"
          class="-mr-2 grid size-11 place-items-center rounded-full text-ink lg:hidden"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          :aria-label="open ? t('nav.close') : t('nav.menu')"
          @click="open = !open"
        >
          <AppIcon :name="open ? 'close' : 'menu'" class="size-6" />
        </button>
      </div>
    </div>
  </header>
  <MobileMenu v-show="open" id="mobile-menu" />
</template>
