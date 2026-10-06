import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { useT } from '@/i18n/useT'
import { htmlLang, langs, ogLocale } from '@/i18n/locales'
import { pathFor } from '@/router/pages'
import { siteUrl } from '@/config/app'
import type { Messages } from '@/i18n/messages'

type MetaKey = Exclude<keyof Messages['meta'], 'siteName' | 'image'>

export function usePageHead(key?: MetaKey) {
  const t = useT()
  const route = useRoute()
  const pageKey = computed(() => key ?? (route.meta.key as MetaKey))
  const title = computed(() => t(`meta.${pageKey.value}.title`))
  const description = computed(() => t(`meta.${pageKey.value}.description`))
  const url = computed(() => siteUrl + pathFor(route.meta.key, t.lang.value))
  const couples = computed(() => route.meta.key === 'couples')
  const image = computed(() => `${siteUrl}/og-${couples.value ? 'couples-' : ''}${t.lang.value}.png`)
  const imageAlt = computed(() => t(couples.value ? 'meta.image.couples' : 'meta.image.home'))
  const isNotFound = computed(() => route.meta.key === 'notFound')

  useHead({
    htmlAttrs: { lang: () => htmlLang[t.lang.value] },
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: () => (isNotFound.value ? 'noindex' : 'index, follow, max-image-preview:large') },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: () => t('meta.siteName') },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: imageAlt },
      { property: 'og:locale', content: () => ogLocale[t.lang.value] },
      {
        property: 'og:locale:alternate',
        content: () => langs.filter((lang) => lang !== t.lang.value).map((lang) => ogLocale[lang]).join(','),
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image:alt', content: imageAlt },
    ],
    link: () =>
      isNotFound.value
        ? []
        : [
            { rel: 'canonical', href: url.value },
            ...langs.map((lang) => ({
              rel: 'alternate',
              hreflang: lang,
              href: siteUrl + pathFor(route.meta.key, lang),
            })),
            { rel: 'alternate', hreflang: 'x-default', href: siteUrl + pathFor(route.meta.key, 'tr') },
          ],
  })
}
