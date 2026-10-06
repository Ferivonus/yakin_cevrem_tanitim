import { mkdirSync, writeFileSync } from 'node:fs'
import { docs, parseDart } from './legal-dart.mjs'

for (const lang of ['tr', 'en']) {
  mkdirSync(`src/content/legal/${lang}`, { recursive: true })
  for (const doc of Object.keys(docs)) {
    const sections = parseDart(lang, doc)
    writeFileSync(`src/content/legal/${lang}/${doc}.json`, JSON.stringify(sections, null, 2) + '\n')
    console.log(`${lang}/${doc}: ${sections.length} bölüm`)
  }
}
