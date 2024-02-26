<script setup lang="ts">
import { mdiGithub } from "@mdi/js";
</script>

<template>
  <v-card class="pa-4">
    <div>
      A simple content management system demo built with Nuxt 3.
      <br /><br />
      View the preview page <nuxt-link to="/preview">here.</nuxt-link>
      <br /><br />
      <div>
        <v-icon
          :icon="mdiGithub"
          class="mr-1" />
        <a href="https://github.com/robertjhull/nuxt-cms">GitHub source code</a>
      </div>
    </div>
  </v-card>
</template>
