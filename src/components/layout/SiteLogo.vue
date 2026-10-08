<script setup lang="ts">
import icon from '@/assets/app-icon.webp'
</script>

<template>
  <span class="flex items-center gap-2.5">
    <img :src="icon" alt="" width="36" height="36" class="size-9 rounded-[0.7rem] ring-1 ring-black/5" />
    <span class="text-[1.0625rem] font-extrabold tracking-tight whitespace-nowrap text-ink max-[22.5rem]:sr-only">Yakın Çevrem</span>
  </span>
</template>
