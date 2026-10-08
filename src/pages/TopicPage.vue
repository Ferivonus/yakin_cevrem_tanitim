<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TopicHero from '@/components/topic/TopicHero.vue'
import FeatureRow from '@/components/topic/FeatureRow.vue'
import FeatureCards from '@/components/topic/FeatureCards.vue'
import TrustDocuments from '@/components/topic/TrustDocuments.vue'
import AreaFeatures from '@/components/topic/AreaFeatures.vue'
import RoadmapBanner from '@/components/roadmap/RoadmapBanner.vue'
import RelatedFaq from '@/components/topic/RelatedFaq.vue'
import NextTopic from '@/components/topic/NextTopic.vue'
import FinalCta from '@/components/common/FinalCta.vue'
import { usePageHead } from '@/composables/usePageHead'
import { topicByKey, topics } from '@/config/topics'

const route = useRoute()
const topic = computed(() => topicByKey(route.meta.key) ?? topics[0])

usePageHead()
</script>

<template>
  <div :class="topic.love ? 'theme-love' : ''" class="bg-bg">
    <TopicHero :topic="topic" />

    <div class="wrap grid gap-[clamp(4.5rem,10vw,8rem)] pb-[clamp(4rem,9vw,7.5rem)]">
      <FeatureRow
        v-for="(row, index) in topic.rows"
        :key="row.id"
        :topic="topic.key"
        :row="row"
        :flip="index % 2 === 1"
      />
      <div v-if="topic.cards.length" class="grid gap-6">
        <FeatureCards :topic="topic.key" :cards="topic.cards" />
        <TrustDocuments v-if="topic.key === 'trust'" />
      </div>
      <RoadmapBanner v-if="topic.key === 'projects'" />
      <AreaFeatures :areas="topic.areas" />
      <RelatedFaq :items="topic.faq" />
      <NextTopic :current="topic.key" />
    </div>

    <FinalCta />
  </div>
</template>
