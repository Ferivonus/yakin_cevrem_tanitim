<script setup lang="ts">
import PricingSection from '@/components/home/PricingSection.vue'
import RelatedFaq from '@/components/topic/RelatedFaq.vue'
import FinalCta from '@/components/common/FinalCta.vue'
import { usePageHead } from '@/composables/usePageHead'
import { pricingFaq } from '@/config/faq'

usePageHead()
</script>

<template>
  <PricingSection page />
  <div class="wrap py-[clamp(4rem,9vw,7.5rem)]">
    <RelatedFaq :items="pricingFaq" />
  </div>
  <FinalCta />
</template>
