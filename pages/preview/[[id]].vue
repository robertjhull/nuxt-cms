<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Post } from "~/interfaces/post";
import type { Settings } from "~/interfaces/settings";

const route = useRoute();
const id = route.params.id;
const appearanceSettings = ref<Settings>({} as Settings);
const publishedPosts = ref<Post[]>([]);

const { data: settings } = await useFetch("/api/settings/", {
  method: "get",
  params: { id: "e95155db-412e-4e48-a8a4-302b73ec4beb" },
});

if (settings.value) {
  appearanceSettings.value = settings.value as Settings;
}

const {
  data: posts,
  pending,
  error,
} = useFetch("/api/posts", {
  params: { id: id ? id : null },
});

if (posts.value) {
  publishedPosts.value = posts.value as Post[];
}
</script>

<template>
  <v-container
    fluid
    class="pa-0"
    :style="{ backgroundColor: appearanceSettings.pageColor }">
    <return-to-dashboard />

    <!-- Header Image -->
    <v-row no-gutters>
      <v-img
        class="header-image"
        :src="appearanceSettings.headerImage"
        gradient="to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)"
        width="100%"
        height="15dvw"
        cover>
        <v-row class="fill-height align-center">
          <v-col class="text-center">
            <h1
              class="page-title"
              style="color: white">
              {{ appearanceSettings.pageTitle }}
            </h1>
          </v-col>
        </v-row>
      </v-img>
    </v-row>
    <!-- Main Content -->
    <v-row class="mt-8 d-flex justify-center">
      <v-col cols="2"></v-col>
      <v-col
        cols="8"
        xl="4"
        lg="5"
        md="6"
        sm="12">
        <!-- Blog post content here -->
        <template
          v-for="(post, index) in publishedPosts"
          :key="post.id">
          <preview-post
            v-model="publishedPosts[index]"
            :settings="appearanceSettings" />
        </template>
      </v-col>
      <v-col cols="2">
        <sidebar />
      </v-col>
    </v-row>
  </v-container>
</template>
