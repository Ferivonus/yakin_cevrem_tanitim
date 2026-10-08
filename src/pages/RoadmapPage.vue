<script setup lang="ts">
import RoadmapHero from '@/components/roadmap/RoadmapHero.vue'
import RoadmapPrinciples from '@/components/roadmap/RoadmapPrinciples.vue'
import RoadmapStages from '@/components/roadmap/RoadmapStages.vue'
import RoadmapPaths from '@/components/roadmap/RoadmapPaths.vue'
import RoadmapFoundation from '@/components/roadmap/RoadmapFoundation.vue'
import RoadmapPilot from '@/components/roadmap/RoadmapPilot.vue'
import RelatedFaq from '@/components/topic/RelatedFaq.vue'
import FinalCta from '@/components/common/FinalCta.vue'
import { usePageHead } from '@/composables/usePageHead'

usePageHead()
</script>

<template>
  <RoadmapHero />
  <div class="wrap grid gap-[clamp(4.5rem,10vw,8rem)] pb-[clamp(4rem,9vw,7.5rem)]">
    <RoadmapPrinciples />
    <RoadmapStages />
    <RoadmapPaths />
    <div v-reveal class="grid gap-4 md:grid-cols-2">
      <RoadmapFoundation />
      <RoadmapPilot />
    </div>
    <RelatedFaq :items="['roadmap', 'freelance', 'web']" />
  </div>
  <FinalCta />
</template>
