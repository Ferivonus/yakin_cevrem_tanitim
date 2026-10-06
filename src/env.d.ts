/// <reference types="vite/client" />

import type { reveal } from './directives/reveal'

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof reveal
  }
}
