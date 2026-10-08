import type { Messages } from '@/i18n/messages'
import type { IconName } from '@/components/common/icons'

type Roadmap = Messages['roadmap']

export type StageId = keyof Roadmap['stages']['steps']
export type PathId = keyof Roadmap['paths']['items']
export type PrincipleId = keyof Roadmap['principles']['items']

export const stages: { id: StageId; icon: IconName }[] = [
  { id: 'plan', icon: 'layers' },
  { id: 'everywhere', icon: 'monitor' },
  { id: 'clients', icon: 'users' },
  { id: 'depth', icon: 'kanban' },
]

export const paths: { id: PathId; icon: IconName; stage: StageId }[] = [
  { id: 'builder', icon: 'sparkle', stage: 'plan' },
  { id: 'business', icon: 'flag', stage: 'plan' },
  { id: 'freelance', icon: 'link', stage: 'clients' },
  { id: 'team', icon: 'users', stage: 'clients' },
]

export const principles: { id: PrincipleId; icon: IconName }[] = [
  { id: 'choice', icon: 'check' },
  { id: 'simple', icon: 'sun' },
  { id: 'yours', icon: 'download' },
]
