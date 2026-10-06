import { useHead } from '@unhead/vue'
import { useT } from '@/i18n/useT'
import { htmlLang } from '@/i18n/locales'
import { pathFor } from '@/router/pages'
import { app, siteUrl } from '@/config/app'
import { faqGroups } from '@/config/faq'

function jsonLd(data: () => object) {
  useHead({
    script: [{ type: 'application/ld+json', innerHTML: () => JSON.stringify(data()) }],
  })
}

export function useAppStructuredData() {
  const t = useT()
  jsonLd(() => {
    const lang = t.lang.value
    const home = siteUrl + pathFor('home', lang)
    const organization = {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: app.name,
      url: siteUrl + '/',
      logo: `${siteUrl}/icon-192.png`,
      email: app.supportEmail,
    }
    return {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        {
          '@type': 'WebSite',
          '@id': `${home}#website`,
          name: app.name,
          url: home,
          inLanguage: htmlLang[lang],
          publisher: { '@id': organization['@id'] },
        },
        {
          '@type': 'MobileApplication',
          name: app.name,
          description: t('meta.home.description'),
          url: home,
          image: `${siteUrl}/og-${lang}.png`,
          operatingSystem: 'Android',
          applicationCategory: 'LifestyleApplication',
          inLanguage: ['tr', 'en'],
          softwareVersion: app.version,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
          publisher: { '@id': organization['@id'] },
          ...(app.playStoreUrl ? { installUrl: app.playStoreUrl, downloadUrl: app.playStoreUrl } : {}),
        },
      ],
    }
  })
}

export function useFaqStructuredData() {
  const t = useT()
  jsonLd(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: htmlLang[t.lang.value],
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((id) => ({
        '@type': 'Question',
        name: t(`faq.items.${id}.q`),
        acceptedAnswer: { '@type': 'Answer', text: t(`faq.items.${id}.a`) },
      })),
    ),
  }))
}
