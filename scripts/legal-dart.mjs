import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export const appDir = resolve(process.env.APP_DIR ?? '../../yakin_cevrem')
export const docs = { privacy: 'legal_privacy.dart', terms: 'legal_terms.dart' }

const placeholders = {
  '${SupportInfo.email}': '{email}',
  '${LegalInfo.minimumAge}': '{minimumAge}',
}

function readLiteral(src, start) {
  const quote = src[start]
  let out = ''
  for (let i = start + 1; i < src.length; i++) {
    const ch = src[i]
    if (ch === '\\') {
      out += src[i + 1]
      i++
    } else if (ch === quote) {
      return { value: out, end: i + 1 }
    } else {
      out += ch
    }
  }
  throw new Error('Kapanmamış dize')
}

function readStrings(src, start) {
  let i = start
  let value = ''
  for (;;) {
    while (/\s/.test(src[i])) i++
    if (src[i] !== "'" && src[i] !== '"') return { value, end: i }
    const lit = readLiteral(src, i)
    value += lit.value
    i = lit.end
  }
}

function applyPlaceholders(text) {
  return Object.entries(placeholders).reduce((acc, [from, to]) => acc.split(from).join(to), text)
}

export function parseDart(lang, doc) {
  const src = readFileSync(resolve(appDir, 'lib/l10n', lang, docs[doc]), 'utf8')
  const sections = []
  let cursor = src.indexOf('LegalSection(', src.indexOf('= ['))
  while (cursor !== -1) {
    const title = readStrings(src, cursor + 'LegalSection('.length)
    let i = src.indexOf('[', title.end) + 1
    const paragraphs = []
    for (;;) {
      while (/[\s,]/.test(src[i])) i++
      if (src[i] === ']') break
      const para = readStrings(src, i)
      paragraphs.push(applyPlaceholders(para.value))
      i = para.end
    }
    sections.push({ title: applyPlaceholders(title.value), paragraphs })
    cursor = src.indexOf('LegalSection(', i)
  }
  return sections
}

export function readLegalVersion() {
  const src = readFileSync(resolve(appDir, 'lib/core/constants.dart'), 'utf8')
  const block = src.slice(src.indexOf('class LegalInfo'))
  const version = Number(/version = (\d+)/.exec(block)?.[1])
  const date = /DateTime\((\d+), (\d+), (\d+)\)/.exec(block)
  const updatedOn = date ? `${date[1]}-${date[2].padStart(2, '0')}-${date[3].padStart(2, '0')}` : ''
  return { version, updatedOn }
}
