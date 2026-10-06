<script setup lang="ts">
import { useT } from '@/i18n/useT'

const t = useT()

const bubbles = [
  { id: 'friends', side: 'start', tint: 'bg-brand-soft text-brand-ink' },
  { id: 'team', side: 'end', tint: 'bg-sun-soft text-sun-ink' },
  { id: 'family', side: 'start', tint: 'bg-accent-soft text-accent-ink' },
  { id: 'couple', side: 'end', tint: 'bg-surface-2 text-ink' },
] as const
</script>

<template>
  <section class="section-y pt-[clamp(2rem,5vw,4rem)]">
    <div class="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div v-reveal class="chat mx-auto grid w-full max-w-md gap-3.5" aria-hidden="true">
        <div
          v-for="(bubble, index) in bubbles"
          :key="bubble.id"
          class="bubble flex items-end gap-2.5"
          :class="bubble.side === 'end' ? 'flex-row-reverse' : ''"
          :style="{ '--i': index }"
        >
          <span class="grid size-9 shrink-0 place-items-center rounded-full text-sm font-extrabold" :class="bubble.tint">
            {{ t(`home.problem.bubbles.${bubble.id}.from`).charAt(0) }}
          </span>
          <div
            class="max-w-[17rem] rounded-3xl border border-line/70 bg-surface px-4 py-2.5 shadow-soft"
            :class="bubble.side === 'end' ? 'rounded-br-md' : 'rounded-bl-md'"
          >
            <p class="text-xs font-bold text-muted">{{ t(`home.problem.bubbles.${bubble.id}.from`) }}</p>
            <div class="grid *:[grid-area:1/1]">
              <p class="typing flex items-center gap-1">
                <span v-for="dot in 3" :key="dot" class="size-1.5 rounded-full bg-muted" />
              </p>
              <p class="message font-semibold text-ink">{{ t(`home.problem.bubbles.${bubble.id}.text`) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-reveal>
        <p class="eyebrow mb-3">{{ t('home.problem.eyebrow') }}</p>
        <p class="text-[clamp(1.5rem,3.2vw,2.25rem)] leading-tight font-bold tracking-tight text-balance">
          {{ t('home.problem.text') }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.typing {
  opacity: 0;
}

.chat.reveal-ready .bubble,
.chat.reveal-ready .message {
  opacity: 0;
}

.chat.reveal-ready.is-visible .bubble {
  animation: pop 0.9s var(--ease-soft) calc(var(--i) * 0.9s) both;
}

.chat.reveal-ready.is-visible .typing {
  animation: typing 0.75s linear calc(var(--i) * 0.9s) both;
}

.chat.reveal-ready.is-visible .message {
  animation: show 0.6s var(--ease-soft) calc(var(--i) * 0.9s + 0.75s) both;
}

.typing span {
  animation: blink 0.9s ease-in-out infinite;
}

.typing span:nth-child(2) {
  animation-delay: 0.15s;
}

.typing span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes pop {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes typing {
  0%,
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes blink {
  50% {
    opacity: 0.3;
  }
}
</style>
