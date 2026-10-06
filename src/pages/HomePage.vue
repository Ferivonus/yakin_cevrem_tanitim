<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import ProblemSection from '@/components/home/ProblemSection.vue'
import HowItWorksSection from '@/components/home/HowItWorksSection.vue'
import WhoSection from '@/components/home/WhoSection.vue'
import TopicsSection from '@/components/home/TopicsSection.vue'
import PricingSection from '@/components/home/PricingSection.vue'
import SoonSection from '@/components/home/SoonSection.vue'
import WebSection from '@/components/home/WebSection.vue'
import FaqTeaser from '@/components/home/FaqTeaser.vue'
import FinalCta from '@/components/common/FinalCta.vue'
import { usePageHead } from '@/composables/usePageHead'
import { useAppStructuredData } from '@/composables/useStructuredData'

usePageHead()
useAppStructuredData()
</script>

<template>
  <HeroSection />
  <ProblemSection />
  <HowItWorksSection />
  <WhoSection />
  <TopicsSection />
  <PricingSection />
  <SoonSection />
  <WebSection />
  <FaqTeaser />
  <FinalCta anchor />
</template>
