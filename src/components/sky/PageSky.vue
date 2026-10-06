<script setup lang="ts">
import SkyBackdrop from './SkyBackdrop.vue'
</script>

<template>
  <div class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[clamp(20rem,45vw,30rem)]" aria-hidden="true">
    <SkyBackdrop />
  </div>
</template>
