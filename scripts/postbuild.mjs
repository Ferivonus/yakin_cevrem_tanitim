import { copyFileSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const dist = 'dist'
const siteUrl = /siteUrl = '([^']+)'/.exec(readFileSync('src/config/app.ts', 'utf8'))[1]
const pairs = [...readFileSync('src/router/pages.ts', 'utf8').matchAll(/tr: '([^']+)', en: '([^']+)'/g)].map(
  ([, tr, en]) => ({ tr, en }),
)

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? htmlFiles(path) : name.endsWith('.html') ? [path] : []
  })
}

function attr(html, tag, match, name) {
  const found = html.match(new RegExp(`<${tag}\\b[^>]*${match}[^>]*>`, 'g')) ?? []
  return found.map((el) => new RegExp(`${name}="([^"]*)"`).exec(el)?.[1])
}

function seoProblems(html, path) {
  const out = []
  const titles = html.match(/<title>([^<]*)<\/title>/g) ?? []
  if (titles.length !== 1) out.push(`${titles.length} adet <title>`)
  const description = attr(html, 'meta', 'name="description"', 'content')
  if (description.length !== 1 || !description[0]) out.push('meta description yok ya da birden fazla')
  const canonical = attr(html, 'link', 'rel="canonical"', 'href')
  if (canonical.length !== 1 || canonical[0] !== siteUrl + path) out.push(`canonical "${canonical}" ≠ "${siteUrl + path}"`)
  const h1 = (html.match(/<h1\b/g) ?? []).length
  if (h1 !== 1) out.push(`${h1} adet <h1>`)
  const lang = /<html[^>]*\blang="([^"]+)"/.exec(html)?.[1]
  const expected = path === '/en' || path.startsWith('/en/') ? 'en' : 'tr'
  if (lang !== expected) out.push(`lang="${lang}", beklenen "${expected}"`)
  for (const image of attr(html, 'meta', 'property="og:image"', 'content')) {
    if (!image?.startsWith(siteUrl) || !existsSync(join(dist, image.slice(siteUrl.length)))) out.push(`og:image yok: ${image}`)
  }
  const types = []
  for (const [, json] of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(json)
      types.push(...(data['@graph'] ?? [data]).map((node) => node['@type']))
    } catch {
      out.push('JSON-LD bozuk')
    }
  }
  const home = pairs.find((p) => p.tr === '/')
  const faq = pairs.find((p) => p.tr === '/sss')
  if ((path === home.tr || path === home.en) && !types.includes('MobileApplication')) out.push('MobileApplication JSON-LD yok')
  if ((path === faq.tr || path === faq.en) && !types.includes('FAQPage')) out.push('FAQPage JSON-LD yok')
  return out
}

const files = htmlFiles(dist)
const leaked = /\b(?:meta|nav|store|badge|common|audience|footer|shots|home|topics|features|faq|legal)\.[a-zA-Z0-9]+\.[a-zA-Z0-9.]+/
const problems = []
const pages = []

for (const file of files) {
  const html = readFileSync(file, 'utf8')
  const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ')
  const match = leaked.exec(text)
  if (match) problems.push(`${file}: çevrilmemiş anahtar "${match[0]}"`)

  const path = '/' + relative(dist, file).split(sep).join('/').replace(/index\.html$/, '').replace(/\.html$/, '')
  const clean = path.length > 1 ? path.replace(/\/$/, '') : path
  if (/404/.test(clean)) continue
  pages.push(clean)
  for (const problem of seoProblems(html, clean)) problems.push(`${file}: ${problem}`)
}

if (problems.length) {
  console.error('Derleme denetimi başarısız:\n- ' + problems.join('\n- '))
  process.exit(1)
}

copyFileSync(join(dist, '404', 'index.html'), join(dist, '404.html'))

const urls = pages
  .sort()
  .map((path) => {
    const pair = pairs.find((p) => p.tr === path || p.en === path)
    const links = pair
      ? ['tr', 'en', 'x-default']
          .map((lang) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${siteUrl}${pair[lang === 'en' ? 'en' : 'tr']}"/>`)
          .join('')
      : ''
    return `  <url><loc>${siteUrl}${path}</loc>${links}</url>`
  })
  .join('\n')
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
)
console.log(`${pages.length} sayfa SEO denetiminden geçti; sitemap.xml ve 404.html hazır.`)
