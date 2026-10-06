<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import PhoneFrame from '@/components/common/PhoneFrame.vue'
import StoreButton from '@/components/common/StoreButton.vue'
import MarkedTitle from '@/components/common/MarkedTitle.vue'
import SkyBackdrop from '@/components/sky/SkyBackdrop.vue'
import { useT } from '@/i18n/useT'

const t = useT()
const statusInitial = computed(() => t('home.hero.sticker.statusName').charAt(0))
</script>

<template>
  <section class="relative isolate overflow-hidden">
    <SkyBackdrop hills plane />
    <div class="wrap grid items-center gap-12 pt-10 pb-24 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-16 lg:pb-36">
      <div class="hero-copy">
        <p class="inline-flex items-center gap-2 rounded-full border border-line/60 bg-surface/70 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-muted shadow-soft backdrop-blur-md">
          <AppIcon name="plane" class="size-4 text-brand" />
          {{ t('home.hero.eyebrow') }}
        </p>
        <MarkedTitle tag="h1" class="h-display mt-6" :text="t('home.hero.title')" :mark="t('home.hero.titleMark')" />
        <p class="lead mt-6 max-w-xl">{{ t('home.hero.text') }}</p>
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <StoreButton />
          <a
            :href="`#${t('home.ids.inside')}`"
            class="group inline-flex items-center gap-2 rounded-2xl px-4 py-3.5 font-bold text-brand-ink transition-colors duration-500 hover:bg-surface/70"
          >
            {{ t('home.hero.ctaSecondary') }}
            <AppIcon name="arrowDown" class="size-4.5 transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-y-0.5" />
          </a>
        </div>
        <p class="mt-5 text-sm font-medium text-muted">{{ t('store.note') }}</p>
      </div>

      <div class="hero-art relative mx-auto w-full max-w-[26rem] lg:max-w-none">
        <div class="relative mx-auto aspect-[10/13] w-full max-w-[30rem] sm:aspect-[10/12]">
          <div class="absolute top-[6%] right-[2%] hidden w-[46%] rotate-[8deg] sm:block">
            <PhoneFrame shot="15" decorative sizes="(min-width: 1024px) 240px, 45vw" class="float-slower opacity-95" />
          </div>
          <div class="absolute top-0 left-1/2 w-[58%] -translate-x-1/2 sm:left-[14%] sm:w-[52%] sm:translate-x-0">
            <PhoneFrame shot="28" eager sizes="(min-width: 1024px) 270px, 60vw" class="float-slow" />
          </div>

          <div
            class="sticker float-slower absolute bottom-[10%] left-0 w-[13.5rem] rounded-2xl border border-line/60 bg-surface/85 p-3.5 shadow-soft backdrop-blur-md sm:-left-[2%]"
            aria-hidden="true"
          >
            <p class="text-xs font-semibold text-muted">{{ t('home.hero.sticker.listTitle') }}</p>
            <div class="mt-2 flex items-center gap-2.5">
              <span class="check grid size-6 shrink-0 place-items-center rounded-full border-2 border-line">
                <AppIcon name="check" class="tick-mark size-3.5 text-white" />
              </span>
              <span class="item relative font-bold text-ink">{{ t('home.hero.sticker.item') }}</span>
              <span class="done ml-auto text-xs font-semibold text-success">{{ t('home.hero.sticker.itemBy') }}</span>
            </div>
          </div>

          <div
            class="float-slow absolute top-[38%] right-0 hidden items-center gap-2.5 rounded-full border border-line/60 bg-surface/85 py-2 pr-4 pl-2 shadow-soft backdrop-blur-md sm:flex"
            aria-hidden="true"
          >
            <span class="relative grid size-8 place-items-center rounded-full bg-brand-soft text-sm font-extrabold text-brand-ink">
              {{ statusInitial }}
              <span class="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-surface bg-success" />
            </span>
            <span class="leading-tight">
              <span class="block text-xs font-semibold text-muted">{{ t('home.hero.sticker.statusName') }}</span>
              <span class="block text-sm font-bold text-ink">{{ t('home.hero.sticker.status') }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-copy > * {
  animation: rise 1.1s var(--ease-soft) both;
}

.hero-copy > :nth-child(2) {
  animation-delay: 0.08s;
}

.hero-copy > :nth-child(3) {
  animation-delay: 0.16s;
}

.hero-copy > :nth-child(4) {
  animation-delay: 0.24s;
}

.hero-copy > :nth-child(5) {
  animation-delay: 0.32s;
}

.hero-art {
  animation: rise 1.4s var(--ease-soft) 0.2s both;
}

.check {
  animation: tick 0.6s var(--ease-soft) 2.2s both;
}

.item::after {
  content: '';
  position: absolute;
  left: -2px;
  right: -2px;
  top: 55%;
  height: 2px;
  border-radius: 2px;
  background: var(--muted);
  transform: scaleX(0);
  transform-origin: left;
  animation: strike 0.6s var(--ease-soft) 2.45s both;
}

.done {
  animation: fade-in 0.6s var(--ease-soft) 2.7s both;
}

.tick-mark {
  animation: fade-in 0.4s var(--ease-soft) 2.35s both;
}

@keyframes tick {
  from {
    background: transparent;
    transform: scale(0.85);
  }
  to {
    background: var(--success);
    border-color: var(--success);
    transform: scale(1);
  }
}

@keyframes strike {
  to {
    transform: scaleX(1);
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
}
</style>
