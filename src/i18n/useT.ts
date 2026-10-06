import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { messages, type Messages } from './messages'
import { defaultLang, type Lang } from './locales'

type Join<K, P> = K extends string ? (P extends string ? `${K}.${P}` : never) : never

type PathsOf<T, Leaf> = {
  [K in keyof T & string]: T[K] extends Leaf
    ? K
    : T[K] extends readonly unknown[]
      ? never
      : T[K] extends object
        ? Join<K, PathsOf<T[K], Leaf>>
        : never
}[keyof T & string]

export type TextKey = PathsOf<Messages, string>
export type ListKey = PathsOf<Messages, readonly string[]>
type Vars = Record<string, string | number>

function lookup(lang: Lang, key: string): unknown {
  return key.split('.').reduce<unknown>((node, part) => {
    return node && typeof node === 'object' ? (node as Record<string, unknown>)[part] : undefined
  }, messages[lang])
}

function format(text: string, vars?: Vars) {
  if (!vars) return text
  return text.replace(/\{(\w+)\}/g, (match, name: string) => String(vars[name] ?? match))
}

export function useLang() {
  const route = useRoute()
  return computed<Lang>(() => route.meta.lang ?? defaultLang)
}

export function useT() {
  const lang = useLang()

  const t = (key: TextKey, vars?: Vars): string => {
    const value = lookup(lang.value, key)
    return typeof value === 'string' ? format(value, vars) : key
  }

  t.list = (key: ListKey): string[] => {
    const value = lookup(lang.value, key)
    return Array.isArray(value) ? (value as string[]) : []
  }

  t.lang = lang
  return t
}
