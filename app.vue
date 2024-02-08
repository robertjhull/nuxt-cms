<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const appConfig = useAppConfig();
</script>

<template>
  <v-app class="app">
    <!-- <NuxtWelcome /> -->
    <v-container>
      <v-row class="d-flex justify-center mb-6">
        <v-col class="d-flex flex-column main-content ga-10"> </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped lang="scss">
.app {
  background-color: rgba(var(--v-theme-error));
}
.main-content {
  text-align: center;
}
</style>
