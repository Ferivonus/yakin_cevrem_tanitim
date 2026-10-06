import { computed } from 'vue'
import { useT } from '@/i18n/useT'
import { dateLocale } from '@/i18n/locales'
import { legalInfo } from '@/config/app'

export function useLegalVersion() {
  const t = useT()
  return computed(() => {
    const date = new Intl.DateTimeFormat(dateLocale[t.lang.value], {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${legalInfo.updatedOn}T00:00:00Z`))
    return t('legal.version', { version: legalInfo.version, date })
  })
}
