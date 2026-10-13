/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SUPABASE_URL?: string
  readonly SUPABASE_PUBLISHABLE_KEY?: string
}

import type { reveal } from './directives/reveal'

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof reveal
  }
}
