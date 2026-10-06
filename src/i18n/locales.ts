export const langs = ['tr', 'en'] as const
export type Lang = (typeof langs)[number]

export const defaultLang: Lang = 'tr'

export const htmlLang: Record<Lang, string> = { tr: 'tr', en: 'en' }
export const ogLocale: Record<Lang, string> = { tr: 'tr_TR', en: 'en_US' }
export const dateLocale: Record<Lang, string> = { tr: 'tr-TR', en: 'en-GB' }
