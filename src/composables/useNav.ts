import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useT } from '@/i18n/useT'
import { pathFor } from '@/router/pages'
import { topics } from '@/config/topics'

export function useNav() {
  const t = useT()
  const route = useRoute()

  const otherLang = computed(() => (t.lang.value === 'tr' ? 'en' : 'tr'))
  const otherLangPath = computed(() => pathFor(route.meta.key, otherLang.value))
  const homePath = computed(() => pathFor('home', t.lang.value))
  const downloadPath = computed(() => pathFor('home', t.lang.value, t('home.ids.download')))

  const topicLinks = computed(() =>
    topics.map((topic) => ({
      key: topic.key,
      icon: topic.icon,
      love: topic.love ?? false,
      to: pathFor(topic.key, t.lang.value),
      label: t(`nav.${topic.key}`),
      hint: t(`nav.hint.${topic.key}`),
      active: route.meta.key === topic.key,
    })),
  )

  return { otherLang, otherLangPath, homePath, downloadPath, topicLinks }
}
