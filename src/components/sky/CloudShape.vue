<template>
  <svg viewBox="0 0 200 90" aria-hidden="true" focusable="false" class="cloud-shape">
    <path
      class="shade"
      d="M30 86C10 86 4 66 22 58c-4-18 18-30 34-20 6-22 44-28 56-6 12-12 38-6 40 14 20-4 34 12 26 26-2 8-10 14-18 14z"
    />
    <path
      class="body"
      d="M32 78C14 78 8 60 24 52c-4-17 17-28 32-18 6-21 42-27 54-6 12-11 36-5 38 13 19-4 32 11 24 24-2 7-9 13-16 13z"
    />
  </svg>
</template>

<style scoped>
.cloud-shape {
  overflow: visible;
}

.shade {
  fill: var(--cloud-shade);
}

.body {
  fill: var(--cloud);
}
</style>
