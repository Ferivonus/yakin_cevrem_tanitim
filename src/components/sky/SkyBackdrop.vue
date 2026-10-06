<script setup lang="ts">
import CloudShape from './CloudShape.vue'

withDefaults(defineProps<{ hills?: boolean; plane?: boolean }>(), { hills: false, plane: false })

const stars = [
  [6, 12, 0],
  [14, 34, 2.2],
  [27, 8, 1.1],
  [41, 22, 3.1],
  [52, 6, 0.4],
  [63, 30, 1.7],
  [74, 14, 2.8],
  [86, 36, 0.9],
  [94, 9, 2],
  [33, 44, 1.4],
] as const
</script>

<template>
  <div class="sky pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div class="sun absolute" />
    <span
      v-for="([x, y, delay], index) in stars"
      :key="index"
      class="star absolute size-[3px] rounded-full"
      :style="{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s` }"
    />
    <CloudShape class="drift-a absolute top-[9%] left-[-4%] w-[clamp(9rem,20vw,17rem)] opacity-90" />
    <CloudShape class="drift-b absolute top-[4%] right-[6%] w-[clamp(6rem,12vw,10rem)] opacity-80" />
    <CloudShape class="drift-c absolute top-[40%] left-[38%] hidden w-[clamp(5rem,8vw,7.5rem)] opacity-60 md:block" />
    <CloudShape class="drift-a absolute top-[58%] right-[-6%] hidden w-[clamp(10rem,18vw,16rem)] opacity-75 sm:block" />

    <svg class="wind absolute inset-x-0 top-[18%] h-[50%] w-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
      <path d="M-20 120c180-60 320 40 520-10s300-90 420-20" pathLength="1" />
      <path d="M200 260c160-40 260 30 420 0s240-70 380-10" pathLength="1" />
      <path d="M600 60c120-30 200 20 320-6s160-40 300 0" pathLength="1" />
    </svg>

    <svg v-if="plane" class="plane absolute top-0 left-0 size-9 text-brand" viewBox="0 0 24 24">
      <path d="M3 11.5L21 4l-6.5 16-3.2-6.3L3 11.5z" fill="var(--surface)" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
      <path d="M11.3 13.7L21 4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
    </svg>

    <svg v-if="hills" class="absolute inset-x-0 bottom-0 h-[clamp(4rem,11vw,9rem)] w-full" viewBox="0 0 1440 160" preserveAspectRatio="none">
      <path class="hill-back" d="M0 92C210 40 380 30 560 66s330 54 520 14 300-46 360-30v110H0z" />
      <path class="hill-mid" d="M0 120c160-36 330-46 520-18s360 38 560 6 290-22 360-10v62H0z" />
      <path class="hill-front" d="M0 142c240-22 480-24 720-6s480 16 720-4v28H0z" />
    </svg>
  </div>
</template>

<style scoped>
.sky {
  background: linear-gradient(180deg, var(--sky-1) 0%, var(--sky-2) 42%, var(--sky-3) 78%, var(--bg) 100%);
}

.sun {
  top: -18%;
  right: 8%;
  width: min(44rem, 80vw);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(closest-side, var(--glow), transparent);
  opacity: 0.8;
}

.star {
  background: var(--star);
  box-shadow: 0 0 6px 1px color-mix(in oklab, var(--star) 60%, transparent);
  opacity: 0.3;
  animation: twinkle 4.5s var(--ease-breeze) infinite alternate;
}

.drift-a {
  animation: drift 46s var(--ease-breeze) infinite alternate;
}

.drift-b {
  animation: drift 38s var(--ease-breeze) -12s infinite alternate-reverse;
}

.drift-c {
  animation: drift 54s var(--ease-breeze) -20s infinite alternate;
}

.wind path {
  fill: none;
  stroke: var(--cloud);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-dasharray: 0.18 0.82;
  stroke-dashoffset: 1;
  opacity: 0.85;
  animation: gust 9s var(--ease-breeze) infinite;
}

.wind path:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 11s;
}

.wind path:nth-child(3) {
  animation-delay: -6.5s;
  animation-duration: 13s;
}

.plane {
  offset-path: path('M -40 220 C 160 120 320 260 520 150 S 860 40 1100 110');
  offset-rotate: auto 8deg;
  animation: glide 22s var(--ease-breeze) infinite;
  filter: drop-shadow(0 6px 6px rgb(20 86 130 / 0.2));
}

.hill-back {
  fill: var(--grass-2);
  opacity: 0.7;
}

.hill-mid {
  fill: var(--grass-1);
  opacity: 0.55;
}

.hill-front {
  fill: var(--bg);
}

@keyframes twinkle {
  to {
    opacity: 0.95;
  }
}

@keyframes drift {
  from {
    transform: translate3d(-3vw, 0, 0);
  }
  to {
    transform: translate3d(5vw, 6px, 0);
  }
}

@keyframes gust {
  0% {
    stroke-dashoffset: 1;
    opacity: 0;
  }
  15% {
    opacity: 0.85;
  }
  60% {
    opacity: 0.6;
  }
  100% {
    stroke-dashoffset: -0.2;
    opacity: 0;
  }
}

@keyframes glide {
  0% {
    offset-distance: 0%;
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    offset-distance: 100%;
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .plane {
    display: none;
  }
}
</style>
