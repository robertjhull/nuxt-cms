<script setup lang="ts">
import { NavigationDrawer } from "#components";
import { useTheme } from "vuetify";

const route = useRoute();
const theme = useTheme();

const showAppBar = computed(() => {
  return !route.path.toLowerCase().includes("preview");
});
</script>

<template>
  <v-app
    class="app"
    :class="{
      'bg-background': theme.current.value.dark,
      'bg-background-darken-2': !theme.current.value.dark,
    }">
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
