<script setup lang="ts">
import { NavigationDrawer } from "#components";
// const runtimeConfig = useRuntimeConfig();
// const appConfig = useAppConfig();
</script>

<template>
  <v-app class="app">
    <nuxt-loading-indicator />
    <v-layout>
      <navigation-drawer />
      <v-container>
        <nuxt-page />
        <theme-toggle />
      </v-container>
    </v-layout>
  </v-app>
</template>

<style lang="scss">
@use "~/assets/scss/main.scss";
</style>
