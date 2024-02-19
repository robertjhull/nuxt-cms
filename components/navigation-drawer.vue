<script setup lang="ts">
import type { User } from "~/interfaces/user";

const initials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0].toUpperCase())
    .join("");
};

// testing
const { data } = await useFetch("/api/users", {
  method: "POST",
  body: { id: "e95155db-412e-4e48-a8a4-302b73ec4beb" },
});

const user = data.value as User;

const navLinks = [
  { page: "Posts", route: "/posts", icon: "$posts" },
  { page: "Comments", route: "/comments", icon: "$comments" },
  { page: "Analytics", route: "/analytics", icon: "$analytics" },
  { page: "Settings", route: "/settings", icon: "$settings" },
];

const open = ref(false);
</script>
<template>
  <v-navigation-drawer
    location="left"
    width="300"
    class="navigation-drawer"
    rail
    expand-on-hover
    @update:rail="open = !open">
    <v-list class="mt-2">
      <v-list-item
        :title="user.name"
        :subtitle="user.email"
        class="my-4">
        <template #prepend>
          <v-avatar
            color="anchor"
            variant="tonal"
            class="mx-auto">
            <span>{{ initials(user.name) }}</span>
          </v-avatar>
        </template>
      </v-list-item>
      <nuxt-link to="/dashboard">
        <v-list-item
          color="primary"
          prepend-icon="$dashboard"
          link>
          Dashboard
        </v-list-item>
      </nuxt-link>
      <v-divider class="my-4" />
      <template
        v-for="link in navLinks"
        :key="link.route">
        <nuxt-link :to="link.route">
          <v-list-item
            color="primary"
            :prepend-icon="link.icon"
            link>
            {{ link.page }}
          </v-list-item>
        </nuxt-link>
      </template>
    </v-list>
    <template #append>
      <div class="pa-2">
        <v-btn
          color="error"
          block>
          <span
            v-if="open"
            class="mx-1"
            >Logout</span
          >
          <v-icon icon="$logout" />
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
