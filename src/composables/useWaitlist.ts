import { waitlistApi } from '@/config/app'
import type { Lang } from '@/i18n/locales'

export const waitlistInterests = ['app', 'pro', 'web', 'projects', 'pilot'] as const
export type WaitlistInterest = (typeof waitlistInterests)[number]

export type WaitlistResult = 'ok' | 'invalid_email' | 'network'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const waitlistEnabled = () => Boolean(waitlistApi.url && waitlistApi.key)

export const looksLikeEmail = (value: string) => value.trim().length <= 254 && emailPattern.test(value.trim())

export function parseInterest(value: unknown): WaitlistInterest | null {
  return waitlistInterests.find((interest) => interest === value) ?? null
}

export async function joinWaitlist(email: string, interests: WaitlistInterest[], lang: Lang, source: string): Promise<WaitlistResult> {
  try {
    const response = await fetch(`${waitlistApi.url}/rest/v1/rpc/join_waitlist`, {
      method: 'POST',
      headers: { apikey: waitlistApi.key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_email: email.trim(), p_interests: interests, p_lang: lang, p_source: source }),
    })
    if (response.ok) return 'ok'
    const body = (await response.json().catch(() => null)) as { message?: string } | null
    return body?.message === 'invalid_email' ? 'invalid_email' : 'network'
  } catch {
    return 'network'
  }
}
