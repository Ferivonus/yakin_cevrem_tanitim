import type { RouteRecordRaw } from 'vue-router'
import { langs, type Lang } from '@/i18n/locales'
import { pagePaths, type PageKey } from './pages'

declare module 'vue-router' {
  interface RouteMeta {
    lang: Lang
    key: PageKey
  }
}

const components = {
  home: () => import('@/pages/HomePage.vue'),
  schedule: () => import('@/pages/TopicPage.vue'),
  plans: () => import('@/pages/TopicPage.vue'),
  projects: () => import('@/pages/TopicPage.vue'),
  chat: () => import('@/pages/TopicPage.vue'),
  couples: () => import('@/pages/TopicPage.vue'),
  trust: () => import('@/pages/TopicPage.vue'),
  features: () => import('@/pages/FeaturesPage.vue'),
  faq: () => import('@/pages/FaqPage.vue'),
  privacy: () => import('@/pages/LegalPage.vue'),
  terms: () => import('@/pages/LegalPage.vue'),
  deleteAccount: () => import('@/pages/DeleteAccountPage.vue'),
  notFound: () => import('@/pages/NotFoundPage.vue'),
} satisfies Record<PageKey, () => Promise<unknown>>

const keys = Object.keys(pagePaths) as PageKey[]

export const routes: RouteRecordRaw[] = [
  ...langs.flatMap((lang) =>
    keys.map((key) => ({
      path: pagePaths[key][lang],
      name: `${lang}-${key}`,
      component: components[key],
      meta: { lang, key },
    })),
  ),
  {
    path: '/en/:pathMatch(.*)*',
    component: components.notFound,
    meta: { lang: 'en', key: 'notFound' },
  },
  {
    path: '/:pathMatch(.*)*',
    component: components.notFound,
    meta: { lang: 'tr', key: 'notFound' },
  },
]
