import { readFileSync } from 'node:fs'
import { docs, parseDart, readLegalVersion } from './legal-dart.mjs'

const problems = []

for (const lang of ['tr', 'en']) {
  for (const doc of Object.keys(docs)) {
    const app = JSON.stringify(parseDart(lang, doc))
    const site = JSON.stringify(JSON.parse(readFileSync(`src/content/legal/${lang}/${doc}.json`, 'utf8')))
    if (app !== site) problems.push(`${lang}/${doc}: metin uygulamadakiyle aynı değil (npm run legal:sync)`)
  }
}

const appLegal = readLegalVersion()
const config = readFileSync('src/config/app.ts', 'utf8')
if (!config.includes(`version: ${appLegal.version},`)) problems.push(`LegalInfo.version uygulamada ${appLegal.version}`)
if (!config.includes(`updatedOn: '${appLegal.updatedOn}'`)) problems.push(`LegalInfo.updatedOn uygulamada ${appLegal.updatedOn}`)

if (problems.length) {
  console.error('Yasal metin denetimi başarısız:\n- ' + problems.join('\n- '))
  process.exit(1)
}
console.log('Yasal metinler uygulamayla aynı.')
