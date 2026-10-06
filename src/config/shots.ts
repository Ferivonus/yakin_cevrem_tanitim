import type { Messages } from '@/i18n/messages'
import type { Lang } from '@/i18n/locales'

export type ShotId = keyof Messages['shots']

const files = import.meta.glob<string>('../assets/screens/*/*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
})

export const shotRatio: Partial<Record<ShotId, string>> = { '11': '1080 / 1500' }

export function shotSources(id: ShotId, lang: Lang) {
  const small = files[`../assets/screens/${lang}/${id}-400.webp`]
  const large = files[`../assets/screens/${lang}/${id}-800.webp`]
  return { src: large, srcset: `${small} 400w, ${large} 800w` }
}
