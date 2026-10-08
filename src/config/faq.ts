import type { Messages } from '@/i18n/messages'

export type FaqId = keyof Messages['faq']['items']
export type FaqGroupId = keyof Messages['faq']['groups']

export const faqGroups: { id: FaqGroupId; items: FaqId[] }[] = [
  { id: 'general', items: ['whatFor', 'free', 'iphone', 'web', 'languages', 'solo'] },
  { id: 'planning', items: ['noPartner', 'difference', 'projectTools', 'roadmap', 'freelance'] },
  { id: 'privacy', items: ['visibility', 'messagesSafe', 'harassment'] },
  { id: 'couple', items: ['partnerSees', 'breakup', 'longDistance'] },
  { id: 'account', items: ['deleteData', 'age'] },
]

export const homeFaq: FaqId[] = ['whatFor', 'free', 'noPartner', 'visibility', 'iphone']
