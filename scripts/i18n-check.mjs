import { readdirSync, readFileSync } from 'node:fs'

const dir = 'src/i18n'

function shape(value, prefix, out) {
  if (Array.isArray(value)) {
    out.add(`${prefix}[]`)
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) shape(child, prefix ? `${prefix}.${key}` : key, out)
  } else {
    out.add(prefix)
  }
  return out
}

const problems = []
for (const file of readdirSync(`${dir}/tr`)) {
  const tr = shape(JSON.parse(readFileSync(`${dir}/tr/${file}`, 'utf8')), '', new Set())
  const en = shape(JSON.parse(readFileSync(`${dir}/en/${file}`, 'utf8')), '', new Set())
  for (const key of tr) if (!en.has(key)) problems.push(`en/${file}: eksik ${key}`)
  for (const key of en) if (!tr.has(key)) problems.push(`tr/${file}: eksik ${key}`)
}

if (problems.length) {
  console.error('Dil dosyaları eşit değil:\n- ' + problems.join('\n- '))
  process.exit(1)
}
console.log('Dil dosyaları eşit.')
