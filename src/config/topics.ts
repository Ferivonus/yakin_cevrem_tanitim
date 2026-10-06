import type { Messages } from '@/i18n/messages'
import type { PageKey } from '@/router/pages'
import type { AreaId } from './features'
import type { ShotId } from './shots'
import type { FaqId } from './faq'
import type { IconName } from '@/components/common/icons'

export type TopicKey = keyof Messages['topics']

export interface TopicRow {
  id: string
  shots: ShotId[]
}

export interface TopicCard {
  id: string
  icon: IconName
}

export interface Topic {
  key: TopicKey
  icon: IconName
  heroShot: ShotId
  love?: boolean
  rows: TopicRow[]
  cards: TopicCard[]
  areas: AreaId[]
  faq: FaqId[]
}

export const topics: Topic[] = [
  {
    key: 'schedule',
    icon: 'calendar',
    heroShot: '03',
    rows: [
      { id: 'week', shots: ['02'] },
      { id: 'people', shots: ['24'] },
    ],
    cards: [],
    areas: ['schedule', 'people'],
    faq: ['visibility', 'noPartner'],
  },
  {
    key: 'plans',
    icon: 'checklist',
    heroShot: '04',
    rows: [
      { id: 'poll', shots: ['05'] },
      { id: 'todos', shots: ['06'] },
      { id: 'tasks', shots: ['07'] },
    ],
    cards: [
      { id: 'reminders', icon: 'bell' },
      { id: 'offline', icon: 'cloudOff' },
    ],
    areas: ['plans'],
    faq: ['difference', 'solo'],
  },
  {
    key: 'projects',
    icon: 'kanban',
    heroShot: '10',
    rows: [
      { id: 'review', shots: ['13'] },
      { id: 'timeline', shots: ['11'] },
    ],
    cards: [
      { id: 'roadmap', icon: 'flag' },
      { id: 'pages', icon: 'layers' },
      { id: 'templates', icon: 'copy' },
    ],
    areas: ['projects'],
    faq: ['projectTools', 'difference'],
  },
  {
    key: 'chat',
    icon: 'chat',
    heroShot: '15',
    rows: [
      { id: 'circles', shots: ['14'] },
      { id: 'notifications', shots: ['26'] },
    ],
    cards: [
      { id: 'talkAbout', icon: 'link' },
      { id: 'theme', icon: 'palette' },
      { id: 'encrypted', icon: 'lock' },
    ],
    areas: ['messaging'],
    faq: ['messagesSafe', 'harassment'],
  },
  {
    key: 'couples',
    icon: 'heart',
    heroShot: '01',
    love: true,
    rows: [
      { id: 'plans', shots: ['16'] },
      { id: 'games', shots: ['19'] },
      { id: 'moments', shots: ['18', '22'] },
    ],
    cards: [
      { id: 'memories', icon: 'image' },
      { id: 'lists', icon: 'checklist' },
    ],
    areas: ['couple'],
    faq: ['partnerSees', 'breakup', 'longDistance'],
  },
  {
    key: 'trust',
    icon: 'shield',
    heroShot: '25',
    rows: [],
    cards: [
      { id: 'encrypted', icon: 'lock' },
      { id: 'block', icon: 'block' },
      { id: 'download', icon: 'download' },
      { id: 'delete', icon: 'trash' },
    ],
    areas: ['privacy'],
    faq: ['messagesSafe', 'harassment', 'deleteData'],
  },
]

export function topicByKey(key: PageKey) {
  return topics.find((topic) => topic.key === key)
}

export function nextTopic(key: TopicKey) {
  const index = topics.findIndex((topic) => topic.key === key)
  return topics[(index + 1) % topics.length]
}
