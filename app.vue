<script setup lang="ts">
import { NavigationDrawer } from "#components";
// const runtimeConfig = useRuntimeConfig();
// const appConfig = useAppConfig();
</script>

<template>
  <v-app class="app">
    <v-layout>
      <navigation-drawer />
      <v-container>
        <nuxt-page />
      </v-container>
    </v-layout>
  </v-app>
</template>

<style scoped lang="scss">
.app {
  color: white;
  background-color: #111111;
}
.main-content {
  text-align: center;
}
</style>
