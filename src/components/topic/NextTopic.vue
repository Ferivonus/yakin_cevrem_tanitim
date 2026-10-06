<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { useT } from '@/i18n/useT'
import { nextTopic, type TopicKey } from '@/config/topics'
import { pathFor } from '@/router/pages'

const props = defineProps<{ current: TopicKey }>()
const t = useT()
const next = computed(() => nextTopic(props.current))
</script>

<template>
  <RouterLink
    v-reveal
    :to="pathFor(next.key, t.lang.value)"
    class="group flex items-center gap-5 rounded-card border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-soft sm:p-7"
  >
    <span
      class="grid size-14 shrink-0 place-items-center rounded-2xl"
      :class="next.love ? 'bg-love-petal text-love' : 'bg-brand-soft text-brand-ink'"
    >
      <AppIcon :name="next.icon" class="size-6.5" />
    </span>
    <span class="flex-1">
      <span class="block text-sm font-bold text-muted">{{ t('common.next') }}</span>
      <span class="block text-xl font-extrabold tracking-tight sm:text-2xl">{{ t(`nav.${next.key}`) }}</span>
      <span class="block text-muted">{{ t(`nav.hint.${next.key}`) }}</span>
    </span>
    <span class="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
      <AppIcon name="arrowRight" class="size-5" />
    </span>
  </RouterLink>
</template>
