<script setup lang="ts">
import {
  mdiCommentTextOutline,
  mdiMagnify,
  mdiMonitorDashboard,
  mdiPaletteAdvanced,
  mdiPlusThick,
  mdiPostOutline,
} from "@mdi/js";

const navLinks = [
  { page: "Dashboard", route: "/dashboard", icon: mdiMonitorDashboard },
  { page: "Preview", route: "/preview", icon: mdiMagnify },
  { type: "divider" },
  { page: "Create", route: "/create", icon: mdiPlusThick },
  { page: "Posts", route: "/posts", icon: mdiPostOutline },
  { page: "Comments", route: "/comments", icon: mdiCommentTextOutline },
  { page: "Appearance", route: "/appearance", icon: mdiPaletteAdvanced },
];
</script>

<template>
  <v-navigation-drawer
    location="left"
    width="250"
    color="background-darken-8"
    class="navigation-drawer">
    <v-list>
      <template
        v-for="(link, index) in navLinks"
        :key="index">
        <v-divider
          v-if="link.type == 'divider'"
          class="my-4" />
        <nuxt-link
          v-else
          class="nav-link text-white"
          :to="link.route">
          <v-list-item
            :prepend-icon="link.icon"
            link>
            {{ link.page }}
          </v-list-item>
        </nuxt-link>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
