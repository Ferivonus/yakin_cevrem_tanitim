import type { Directive } from 'vue'

const observers = new WeakMap<HTMLElement, IntersectionObserver>()

export const reveal: Directive<HTMLElement, number | undefined> = {
  getSSRProps: () => ({}),
  mounted(el, { value }) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const alreadyInView = el.getBoundingClientRect().top < window.innerHeight * 0.9
    if (reduced || alreadyInView || !('IntersectionObserver' in window)) return

    if (value) el.style.setProperty('--reveal-delay', `${value}ms`)
    el.classList.add('reveal-ready')
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        el.classList.add('is-visible')
        observer.disconnect()
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    observers.set(el, observer)
  },
  unmounted(el) {
    observers.get(el)?.disconnect()
  },
}
