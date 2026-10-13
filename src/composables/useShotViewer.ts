import { ref } from 'vue'
import type { ShotId } from '@/config/shots'

const shots = ref<ShotId[]>([])
const index = ref(-1)

function visible(el: HTMLElement) {
  return el.checkVisibility ? el.checkVisibility({ opacityProperty: true, visibilityProperty: true }) : el.offsetParent !== null
}

// Galeri, sayfada o an görünen büyütülebilir ekranlardan oluşur; aynı görsel bir kez sayılır.
export function openShot(from: HTMLElement) {
  const buttons = [...document.querySelectorAll<HTMLElement>('[data-shot]')].filter((el) => el === from || visible(el))
  const list: ShotId[] = []
  let at = 0
  for (const el of buttons) {
    const id = el.dataset.shot as ShotId
    if (el === from) at = list.includes(id) ? list.indexOf(id) : list.length
    if (!list.includes(id)) list.push(id)
  }
  shots.value = list
  index.value = at
}

export function useShotViewer() {
  const close = () => (index.value = -1)
  const step = (by: number) => {
    const total = shots.value.length
    if (total > 1) index.value = (index.value + by + total) % total
  }
  return { shots, index, close, step }
}
