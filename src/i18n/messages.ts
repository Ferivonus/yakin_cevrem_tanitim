import trCommon from './tr/common.json'
import trHome from './tr/home.json'
import trTopics from './tr/topics.json'
import trFeatures from './tr/features.json'
import trFaq from './tr/faq.json'
import trLegal from './tr/legal.json'
import enCommon from './en/common.json'
import enHome from './en/home.json'
import enTopics from './en/topics.json'
import enFeatures from './en/features.json'
import enFaq from './en/faq.json'
import enLegal from './en/legal.json'
import type { Lang } from './locales'

const tr = {
  ...trCommon,
  home: trHome,
  topics: trTopics,
  features: trFeatures,
  faq: trFaq,
  legal: trLegal,
}

export type Messages = typeof tr

const en: Messages = {
  ...enCommon,
  home: enHome,
  topics: enTopics,
  features: enFeatures,
  faq: enFaq,
  legal: enLegal,
}

export const messages: Record<Lang, Messages> = { tr, en }
