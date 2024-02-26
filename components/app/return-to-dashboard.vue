<script setup lang="ts">
import { mdiChevronLeft } from "@mdi/js";
</script>

<template>
  <nuxt-link to="/dashboard">
    <v-btn
      class="dashboard-button"
      variant="elevated"
      color="info"
      size="large"
      text="Return to dashboard"
      :prepend-icon="mdiChevronLeft">
    </v-btn>
  </nuxt-link>
</template>

<style scoped lang="scss">
.dashboard-button {
  position: fixed;
  top: 1rem;
  left: 1rem;
  pointer-events: auto !important;
  cursor: pointer !important;
  z-index: 99;
}
</style>
