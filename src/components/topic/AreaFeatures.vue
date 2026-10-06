<script setup lang="ts">
import { computed } from 'vue'
import FeatureList from '@/components/features/FeatureList.vue'
import { useT } from '@/i18n/useT'
import { areasFor, type AreaId } from '@/config/features'

const props = defineProps<{ areas: AreaId[] }>()
const t = useT()
const list = computed(() => areasFor(props.areas))
const hasSoon = computed(() => list.value.some((area) => area.items.some((item) => item.status !== 'live')))
</script>

<template>
  <section>
    <h2 v-reveal class="h-section">{{ t('common.everything') }}</h2>
    <div v-for="area in list" :key="area.id" v-reveal class="mt-8">
      <h3 v-if="list.length > 1" class="mb-2 text-sm font-bold text-muted">{{ t(`features.areas.${area.id}.title`) }}</h3>
      <FeatureList :items="area.items" />
    </div>
    <p v-if="hasSoon" class="mt-5 text-sm text-muted">{{ t('common.soonHint') }}</p>
  </section>
</template>
