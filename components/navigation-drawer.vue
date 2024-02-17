<script setup lang="ts"></script>
<template>
  <v-navigation-drawer
    location="left"
    width="300"
    rail
    expand-on-hover>
    <v-list class="mt-8">
      <v-list-item
        prepend-icon="$nuxt"
        color="primary"
        title="Nuxt CMS"
        subtitle="Github Repo"></v-list-item>
      <v-divider class="my-8" />
      <nuxt-link to="/manage">
        <v-list-item
          prepend-icon="$manage"
          link>
          Manage
        </v-list-item>
      </nuxt-link>
      <nuxt-link to="/posts">
        <v-list-item
          prepend-icon="$posts"
          link>
          Posts
        </v-list-item>
      </nuxt-link>
      <nuxt-link to="/archive">
        <v-list-item
          prepend-icon="$archive"
          link>
          Archive
        </v-list-item>
      </nuxt-link>
      <nuxt-link to="/analytics">
        <v-list-item
          prepend-icon="$analytics"
          link>
          Analytics
        </v-list-item>
      </nuxt-link>
      <nuxt-link to="/settings">
        <v-list-item
          prepend-icon="$settings"
          link>
          Settings
        </v-list-item>
      </nuxt-link>
    </v-list>
  </v-navigation-drawer>
</template>
