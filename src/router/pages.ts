import type { Lang } from '@/i18n/locales'

export const pagePaths = {
  home: { tr: '/', en: '/en' },
  schedule: { tr: '/program', en: '/en/schedule' },
  plans: { tr: '/planlar', en: '/en/plans' },
  projects: { tr: '/projeler', en: '/en/projects' },
  chat: { tr: '/sohbet', en: '/en/chat' },
  couples: { tr: '/sevgilinle', en: '/en/couples' },
  trust: { tr: '/guven', en: '/en/trust' },
  features: { tr: '/ozellikler', en: '/en/features' },
  roadmap: { tr: '/yol-haritasi', en: '/en/roadmap' },
  faq: { tr: '/sss', en: '/en/faq' },
  privacy: { tr: '/gizlilik', en: '/en/privacy' },
  terms: { tr: '/kosullar', en: '/en/terms' },
  deleteAccount: { tr: '/hesap-silme', en: '/en/delete-account' },
  notFound: { tr: '/404', en: '/en/404' },
} as const satisfies Record<string, Record<Lang, string>>

export type PageKey = keyof typeof pagePaths

export function pathFor(key: PageKey, lang: Lang, hash?: string) {
  const path = pagePaths[key][lang]
  return hash ? `${path}#${hash}` : path
}
