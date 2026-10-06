import trPrivacy from './tr/privacy.json'
import trTerms from './tr/terms.json'
import enPrivacy from './en/privacy.json'
import enTerms from './en/terms.json'
import type { Lang } from '@/i18n/locales'
import type { LegalDoc } from './types'
import { app } from '@/config/app'

const docs: Record<Lang, Record<'privacy' | 'terms', LegalDoc>> = {
  tr: { privacy: trPrivacy, terms: trTerms },
  en: { privacy: enPrivacy, terms: enTerms },
}

const fill = (text: string) =>
  text.replaceAll('{email}', app.supportEmail).replaceAll('{minimumAge}', String(app.minimumAge))

export function legalDoc(lang: Lang, doc: 'privacy' | 'terms'): LegalDoc {
  return docs[lang][doc].map((section) => ({
    title: fill(section.title),
    paragraphs: section.paragraphs.map(fill),
  }))
}
