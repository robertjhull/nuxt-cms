<script setup lang="ts">
import { mdiGithub } from "@mdi/js";
</script>

<template>
  <v-card class="pa-4">
    <div>
      A basic content management demo app built with Nuxt and Vuetify. View the
      preview page <nuxt-link to="/preview">here.</nuxt-link> <br /><br />
      <v-row
        class="w-100 justify-space-between align-center"
        no-gutters>
        <div>
          <v-icon
            :icon="mdiGithub"
            class="mr-1" />
          <a href="https://github.com/robertjhull/nuxt-cms"
            >GitHub source code</a
          >
        </div>
        <div class="py-2">
          <a
            href="https://www.digitalocean.com/?refcode=bfa4e5bdac67&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"
            ><img
              src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg"
              alt="DigitalOcean Referral Badge"
          /></a>
        </div>
      </v-row>
    </div>
  </v-card>
</template>
