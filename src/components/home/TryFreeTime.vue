<script setup lang="ts">
import { computed, ref } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { useT } from '@/i18n/useT'
import { htmlLang } from '@/i18n/locales'
import { useNav } from '@/composables/useNav'

type Person = 'me' | 'a' | 'b' | 'c'
type Slot = 'morning' | 'afternoon' | 'evening'

const t = useT()
const { waitlistFor } = useNav()

const slots: Slot[] = ['morning', 'afternoon', 'evening']
// Kurgusal hafta (0 = Pazartesi): her kişinin dolu olduğu gün ve dilimler.
const busy: Record<Person, Record<number, Slot[]>> = {
  me: { 0: ['morning', 'afternoon'], 1: ['morning', 'afternoon', 'evening'], 2: ['morning', 'afternoon'], 3: ['morning', 'afternoon', 'evening'], 4: ['morning', 'afternoon'] },
  a: { 0: ['morning', 'afternoon', 'evening'], 1: ['morning', 'afternoon'], 2: ['morning', 'afternoon', 'evening'], 3: ['morning', 'afternoon'], 4: ['morning'] },
  b: { 1: ['afternoon'], 3: ['afternoon'], 4: ['evening'], 5: ['morning'] },
  c: { 2: ['evening'], 6: ['morning', 'afternoon', 'evening'] },
}

const people: Person[] = ['me', 'a', 'b', 'c']
const chosen = ref<Person[]>(['me', 'a', 'b'])
const planned = ref<{ day: number; slot: Slot } | null>(null)

const days = computed(() => {
  const format = new Intl.DateTimeFormat(htmlLang[t.lang.value], { weekday: 'short' })
  return Array.from({ length: 7 }, (_, i) => format.format(new Date(2024, 0, 1 + i)))
})
const longDays = computed(() => {
  const format = new Intl.DateTimeFormat(htmlLang[t.lang.value], { weekday: 'long' })
  return Array.from({ length: 7 }, (_, i) => format.format(new Date(2024, 0, 1 + i)))
})

const name = (person: Person) => (person === 'me' ? t('home.try.me') : t(`home.try.names.${person}`))
const isBusy = (person: Person, day: number, slot: Slot) => busy[person][day]?.includes(slot) ?? false
const busyCount = (day: number, slot: Slot) => chosen.value.filter((person) => isBusy(person, day, slot)).length
const isFree = (day: number, slot: Slot) => chosen.value.length > 0 && busyCount(day, slot) === 0
const freeCount = computed(() => slots.reduce((sum, slot) => sum + days.value.filter((_, day) => isFree(day, slot)).length, 0))

const when = (day: number, slot: Slot) => t('home.try.cell', { day: longDays.value[day], slot: t(`home.try.slots.${slot}`).toLowerCase() })
const invited = computed(() => chosen.value.filter((person) => person !== 'me').map(name).join(', '))

function toggle(person: Person) {
  planned.value = null
  chosen.value = chosen.value.includes(person) ? chosen.value.filter((item) => item !== person) : [...chosen.value, person]
}

function plan(day: number, slot: Slot) {
  if (isFree(day, slot)) planned.value = { day, slot }
}
</script>

<template>
  <section :id="t('home.ids.try')" class="section-y pt-0">
    <div class="wrap">
      <div v-reveal class="try relative overflow-hidden rounded-[2rem] border border-line/70 p-6 sm:p-10 lg:p-12">
        <div class="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
          <div>
            <SectionHeading :eyebrow="t('home.try.eyebrow')" :title="t('home.try.title')" :text="t('home.try.text')" />
            <p class="mt-8 text-sm font-bold">{{ t('home.try.people') }}</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <button
                v-for="person in people"
                :key="person"
                type="button"
                :aria-pressed="chosen.includes(person)"
                class="inline-flex items-center gap-2 rounded-full border py-1.5 pr-4 pl-1.5 font-semibold transition-colors duration-300"
                :class="chosen.includes(person) ? 'border-brand bg-brand text-white' : 'border-line bg-surface text-ink/70 hover:border-brand/50'"
                @click="toggle(person)"
              >
                <span
                  class="grid size-7 place-items-center rounded-full text-xs font-extrabold"
                  :class="chosen.includes(person) ? 'bg-white/20' : 'bg-surface-2'"
                >
                  {{ name(person).slice(0, 1) }}
                </span>
                {{ name(person) }}
              </button>
            </div>
            <p class="mt-6 hidden text-sm text-muted lg:block">{{ t('home.try.note') }}</p>
          </div>

          <div>
            <div class="rounded-card border border-line/70 bg-surface p-3 shadow-soft sm:p-5">
              <div class="grid grid-cols-[3.4rem_repeat(7,minmax(0,1fr))] gap-1 sm:grid-cols-[4.5rem_repeat(7,minmax(0,1fr))] sm:gap-1.5">
                <span />
                <span v-for="day in days" :key="day" class="pb-1 text-center text-[0.7rem] font-bold text-muted uppercase sm:text-xs">{{ day }}</span>
                <template v-for="slot in slots" :key="slot">
                  <span class="flex items-center text-[0.7rem] font-semibold text-muted sm:text-xs">{{ t(`home.try.slots.${slot}`) }}</span>
                  <button
                    v-for="(dayName, day) in days"
                    :key="dayName + slot"
                    type="button"
                    class="cell h-10 rounded-lg transition duration-300 sm:h-12"
                    :class="[
                      isFree(day, slot) ? 'free' : '',
                      planned?.day === day && planned?.slot === slot ? 'picked' : '',
                    ]"
                    :style="{ '--busy': chosen.length ? busyCount(day, slot) / chosen.length : 0 }"
                    :disabled="!isFree(day, slot)"
                    :aria-label="`${when(day, slot)}: ${isFree(day, slot) ? t('home.try.open') : t('home.try.busy')}`"
                    @click="plan(day, slot)"
                  >
                    <AppIcon v-if="planned?.day === day && planned?.slot === slot" name="check" class="mx-auto size-4.5 text-white" />
                  </button>
                </template>
              </div>
            </div>

            <div class="mt-4 min-h-[4.5rem]" aria-live="polite">
              <Transition name="note" mode="out-in">
                <div v-if="planned" key="planned" class="flex flex-wrap items-center justify-between gap-3 rounded-card bg-accent-soft px-4 py-3">
                  <p class="flex items-start gap-3 text-accent-ink">
                    <AppIcon name="plane" class="mt-0.5 size-5 shrink-0" />
                    <span>
                      <span class="block font-bold">{{ t('home.try.planned', { when: when(planned.day, planned.slot) }) }}</span>
                      <span v-if="invited" class="block text-sm">{{ t('home.try.invited', { people: invited }) }}</span>
                    </span>
                  </p>
                  <button type="button" class="text-sm font-bold text-accent-ink hover:underline" @click="planned = null">
                    {{ t('home.try.reset') }}
                  </button>
                </div>
                <p v-else :key="String(freeCount)" class="px-1 py-3 font-semibold" :class="freeCount ? 'text-accent-ink' : 'text-muted'">
                  {{ freeCount ? t('home.try.free', { n: freeCount }) : t('home.try.none') }}
                </p>
              </Transition>
            </div>

            <RouterLink
              :to="waitlistFor('app', 'try')"
              class="mt-2 inline-flex items-center gap-2 font-bold text-brand-ink hover:underline"
            >
              {{ t('home.try.cta') }}
              <AppIcon name="arrowRight" class="size-4.5" />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.try {
  background:
    radial-gradient(40rem 20rem at 100% 0%, color-mix(in oklab, var(--sky-2) 55%, transparent), transparent 70%),
    linear-gradient(180deg, var(--surface), color-mix(in oklab, var(--accent-soft) 35%, var(--surface)));
}

.cell {
  background: color-mix(in oklab, var(--muted) calc(6% + var(--busy) * 16%), var(--surface-2));
}

.cell.free {
  background: color-mix(in oklab, var(--accent) 34%, var(--surface));
  box-shadow: inset 0 0 0 1.5px color-mix(in oklab, var(--accent) 70%, transparent);
  cursor: pointer;
}

.cell.free:hover {
  background: color-mix(in oklab, var(--accent) 55%, var(--surface));
  transform: translateY(-1px);
}

.cell.free.picked,
.cell.free.picked:hover {
  background: var(--accent);
  box-shadow: 0 10px 20px -10px var(--accent);
  transform: none;
}

.cell:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 2px;
}

.note-enter-active,
.note-leave-active {
  transition:
    opacity 0.3s var(--ease-soft),
    transform 0.4s var(--ease-soft);
}

.note-enter-from,
.note-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
