import { ViteSSG } from 'vite-ssg'
import '@fontsource-variable/plus-jakarta-sans'
import './styles/main.css'
import App from './App.vue'
import { routes } from './router/routes'
import { reveal } from './directives/reveal'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, from, saved) {
      const samePage = to.path === from.path
      const target = () => {
        if (saved) return saved
        if (to.hash) return { el: decodeURIComponent(to.hash), behavior: 'smooth' as const }
        return { top: 0, behavior: 'instant' as const }
      }
      if (samePage) return target()
      return new Promise((resolve) => setTimeout(() => resolve(target()), 240))
    },
  },
  ({ app }) => {
    app.directive('reveal', reveal)
  },
)
