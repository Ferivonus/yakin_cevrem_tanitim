import type { Messages } from '@/i18n/messages'
import type { PageKey } from '@/router/pages'

export type FeatureId = keyof Messages['features']['items']
export type AreaId = keyof Messages['features']['areas']
export type FeatureStatus = 'live' | 'soon' | 'pro'
export type Audience = 'everyone' | 'friends' | 'team' | 'family' | 'couples'

export interface Feature {
  id: FeatureId
  status: FeatureStatus
}

export interface FeatureArea {
  id: AreaId
  page: PageKey | null
  audiences: Audience[]
  items: Feature[]
}

const live = (...ids: FeatureId[]): Feature[] => ids.map((id) => ({ id, status: 'live' }))
const soon = (...ids: FeatureId[]): Feature[] => ids.map((id) => ({ id, status: 'soon' }))
const pro = (...ids: FeatureId[]): Feature[] => ids.map((id) => ({ id, status: 'pro' }))

export const featureAreas: FeatureArea[] = [
  {
    id: 'schedule',
    page: 'schedule',
    audiences: ['everyone'],
    items: live('weekly', 'freeTime', 'compare', 'status', 'scheduleVisibility', 'weekComments'),
  },
  {
    id: 'plans',
    page: 'plans',
    audiences: ['friends', 'family', 'couples'],
    items: live('meetups', 'polls', 'todos', 'tasks', 'remote', 'reminders', 'partnerView', 'offline', 'sameCityFirst'),
  },
  {
    id: 'projects',
    page: 'projects',
    audiences: ['team', 'friends'],
    items: [
      ...live(
        'roles',
        'review',
        'assigned',
        'views',
        'dependencies',
        'teamTab',
        'roadmap',
        'templates',
        'projectTypes',
        'strategy',
        'pagePlans',
        'changeRequests',
        'weeklyDigest',
        'partnerProjects',
      ),
      ...soon('projectInvites'),
    ],
  },
  {
    id: 'messaging',
    page: 'chat',
    audiences: ['everyone'],
    items: [
      ...live(
        'chats',
        'talkAbout',
        'tagTodos',
        'reactions',
        'chatTheme',
        'photos',
        'ticks',
        'lastSeen',
        'notifReply',
        'encrypted',
        'notifPreview',
      ),
      ...soon('groupPoll', 'multiPhoto'),
      ...pro('voiceCall', 'videoCall'),
    ],
  },
  {
    id: 'couple',
    page: 'couples',
    audiences: ['couples'],
    items: [
      ...live(
        'couplePlans',
        'games',
        'memories',
        'photoDays',
        'coupleLists',
        'coupleCard',
        'capsule',
        'dailyQuestion',
        'us',
        'loveLanguage',
        'gameMemories',
        'shortcuts',
        'archive',
      ),
      ...soon('newGames', 'memoryExtras'),
    ],
  },
  {
    id: 'people',
    page: 'schedule',
    audiences: ['everyone'],
    items: [
      ...live('addByUsername', 'nudge', 'specialDays', 'profile', 'sameCity', 'nicknames', 'favorites', 'timeZone'),
      ...soon('inviteLink'),
    ],
  },
  {
    id: 'personal',
    page: null,
    audiences: ['everyone'],
    items: live(
      'languages',
      'theme',
      'homeCards',
      'notifications',
      'closedNotifs',
      'permissions',
      'onboarding',
      'releaseNotes',
      'android',
    ),
  },
  {
    id: 'privacy',
    page: 'trust',
    audiences: ['everyone'],
    items: [
      ...live('perPerson', 'optionalInfo', 'blockReport', 'moderation', 'download', 'deleteAccount', 'legalInApp', 'age'),
      ...soon('appLock'),
    ],
  },
]

export function areasFor(ids: AreaId[]) {
  return featureAreas.filter((area) => ids.includes(area.id))
}
