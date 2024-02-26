<script setup lang="ts">
import { NavigationDrawer } from "#components";
// const runtimeConfig = useRuntimeConfig();
// const appConfig = useAppConfig();

const route = useRoute();

const showAppBar = computed(() => {
  return !route.path.toLowerCase().includes("preview");
});
</script>

<template>
  <v-app class="app">
    <nuxt-loading-indicator />
    <v-layout>
      <navigation-drawer v-if="showAppBar" />
      <v-main>
        <nuxt-page />
        <theme-toggle v-if="showAppBar" />
      </v-main>
    </v-layout>
  </v-app>
</template>

<style lang="scss">
@use "~/assets/scss/main.scss";
</style>
