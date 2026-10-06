import { copyFileSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const dist = 'dist'
const siteUrl = /siteUrl = '([^']+)'/.exec(readFileSync('src/config/app.ts', 'utf8'))[1]

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? htmlFiles(path) : name.endsWith('.html') ? [path] : []
  })
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
  if (!/404/.test(clean)) pages.push(clean)
}

if (problems.length) {
  console.error('Derleme denetimi başarısız:\n- ' + problems.join('\n- '))
  process.exit(1)
}

copyFileSync(join(dist, '404', 'index.html'), join(dist, '404.html'))

const urls = pages
  .sort()
  .map((path) => `  <url><loc>${siteUrl}${path === '/' ? '/' : path}</loc></url>`)
  .join('\n')
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
console.log(`${pages.length} sayfa, sitemap.xml ve 404.html hazır.`)
