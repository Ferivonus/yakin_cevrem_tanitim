import type { Directive } from 'vue'

const observers = new WeakMap<HTMLElement, IntersectionObserver>()

// Yatay kaydırılan şeritteki öğe ekrana yandan girer; görünürlüğü şeridin kendisine bakılarak ölçülür.
function scrollStrip(el: HTMLElement) {
  for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
    const overflow = getComputedStyle(node).overflowX
    if (overflow === 'auto' || overflow === 'scroll') return node
  }
  return el
}

// Animasyon bitince sınıflar kaldırılır; öğenin kendi hover geçişleri gecikmesiz çalışır.
function settle(el: HTMLElement) {
  el.classList.remove('reveal-ready', 'is-visible')
  el.style.removeProperty('--reveal-delay')
}

export const reveal: Directive<HTMLElement, number | undefined> = {
  getSSRProps: () => ({}),
  mounted(el, { value }) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const target = scrollStrip(el)
    const alreadyInView = target.getBoundingClientRect().top < window.innerHeight * 0.9
    // Bölüm bağlantısıyla gelen ya da arka plandaki sekmede içerik animasyonu beklemeden görünür.
    const skip = window.location.hash !== '' || document.visibilityState === 'hidden'
    if (reduced || alreadyInView || skip || !('IntersectionObserver' in window)) return

    if (value) el.style.setProperty('--reveal-delay', `${value}ms`)
    el.classList.add('reveal-ready')
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        el.classList.add('is-visible')
        if (!('revealKeep' in el.dataset)) window.setTimeout(() => settle(el), 1100 + (value ?? 0))
        observer.disconnect()
      },
      { rootMargin: '0px 0px -5% 0px' },
    )
    observer.observe(target)
    observers.set(el, observer)
  },
  unmounted(el) {
    observers.get(el)?.disconnect()
  },
}
