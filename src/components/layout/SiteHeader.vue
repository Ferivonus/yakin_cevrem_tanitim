<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from '@/components/common/AppIcon.vue'
import SiteLogo from './SiteLogo.vue'
import MobileMenu from './MobileMenu.vue'
import ThemeToggle from './ThemeToggle.vue'
import FeaturesMenu from './FeaturesMenu.vue'
import { useT } from '@/i18n/useT'
import { useNav } from '@/composables/useNav'
import { pathFor, type PageKey } from '@/router/pages'
import { app } from '@/config/app'

const t = useT()
const route = useRoute()
const { otherLang, otherLangPath, homePath, downloadPath } = useNav()
const open = ref(false)
const scrolled = ref(false)
const header = ref<HTMLElement>()
const menuTop = ref(64)

const links = computed(() =>
  (['pricing', 'roadmap', 'faq'] as const satisfies readonly PageKey[]).map((key) => ({
    key,
    to: pathFor(key, t.lang.value),
    active: route.meta.key === key,
  })),
)

const onScroll = () => (scrolled.value = window.scrollY > 8)

watch(() => route.fullPath, () => (open.value = false))
watch(open, (value) => {
  // Dil uyarısı açıkken başlık aşağıda durur; menü başlığın hemen altından başlar.
  if (value) menuTop.value = header.value?.getBoundingClientRect().bottom ?? 64
  document.documentElement.classList.toggle('overflow-hidden', value)
})
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    ref="header"
    class="sticky top-0 z-40 border-b backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-500"
    :class="scrolled || open ? 'border-line/70 bg-bg/85 shadow-[0_10px_30px_-24px_var(--shadow-b)]' : 'border-transparent bg-bg/60'"
  >
    <div class="wrap flex h-16 items-center gap-3 sm:gap-4">
      <RouterLink :to="homePath" class="mr-auto shrink-0 rounded-xl lg:mr-0" :aria-label="t('nav.home')">
        <SiteLogo />
      </RouterLink>

      <nav :aria-label="t('nav.main')" class="mx-auto hidden lg:block">
        <ul class="flex items-center gap-1">
          <li><FeaturesMenu /></li>
          <li v-for="link in links" :key="link.key">
            <RouterLink
              :to="link.to"
              class="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors duration-300"
              :class="
                link.active
                  ? link.key === 'roadmap'
                    ? 'bg-sun-soft text-sun-ink'
                    : 'bg-brand-soft text-brand-ink'
                  : 'text-muted hover:text-ink'
              "
              :aria-current="link.active ? 'page' : undefined"
            >
              <AppIcon v-if="link.key === 'roadmap'" name="flag" class="size-4 text-sun-ink" />
              {{ t(`nav.${link.key}`) }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-1 sm:gap-1.5">
        <span class="hidden sm:block"><ThemeToggle /></span>
        <RouterLink
          :to="otherLangPath"
          :hreflang="otherLang"
          :lang="otherLang"
          class="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold text-muted transition-colors hover:bg-surface-2 hover:text-ink sm:inline-flex"
          :aria-label="t('nav.languageLabel')"
        >
          <AppIcon name="globe" class="size-4.5" />
          {{ t('nav.languageShort') }}
        </RouterLink>
        <component
          :is="app.playStoreUrl ? 'a' : 'RouterLink'"
          :href="app.playStoreUrl || undefined"
          :to="app.playStoreUrl ? undefined : downloadPath"
          class="btn group ml-1 inline-flex items-center gap-1.5 rounded-full bg-brand py-2.5 pr-3.5 pl-4 text-sm leading-none font-bold whitespace-nowrap text-white shadow-[0_8px_20px_-10px_var(--brand)] transition duration-500 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:shadow-[0_14px_26px_-12px_var(--brand)]"
          :aria-current="route.meta.key === 'waitlist' ? 'page' : undefined"
        >
          {{ app.playStoreUrl ? t('nav.download') : t('nav.waitlist') }}
          <AppIcon
            :name="app.playStoreUrl ? 'download' : 'arrowRight'"
            class="size-4 transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-0.5"
          />
        </component>
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
  <MobileMenu v-show="open" id="mobile-menu" :style="{ top: `${menuTop}px` }" />
</template>
