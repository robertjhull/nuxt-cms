<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Post } from "~/interfaces";
import { usePostsStore } from "~/stores/posts";

const route = useRoute();
const postsStore = usePostsStore();
const { settings } = useAppearanceSettings();

const postId = computed(() => route.params.id as string | undefined);

const publishedPosts = ref<Post[]>([]);

watch(
  postId,
  async (newId) => {
    if (!newId) {
      const posts = await $fetch<Post[]>("/api/post");
      publishedPosts.value = posts || [];
    } else {
      let storePost = postsStore.getPostById(newId as string);
      if (storePost) {
        publishedPosts.value = [storePost];
      } else {
        try {
          const fetchedPost = await $fetch<Post[]>(`/api/post?postId=${newId}`);
          publishedPosts.value = fetchedPost;
        } catch (error) {
          console.error("Failed to fetch post:", error);
          publishedPosts.value = [];
        }
      }
    }
  },
  { immediate: true }
);
</script>

<template>
  <v-container
    v-if="settings"
    fluid
    class="pa-0"
    :style="{
      backgroundColor: settings.pageColor,
      fontFamily: settings.fontFamily.value,
      color: settings.textColor,
      minHeight: '100dvh',
    }">
    <return-to-dashboard />

    <!-- Header Image -->
    <v-row no-gutters>
      <v-img
        class="header-image"
        :src="settings.headerImage"
        gradient="to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.5)"
        width="100%"
        height="15dvw"
        cover>
        <v-row class="fill-height align-center">
          <v-col class="text-center">
            <h1
              class="page-title"
              style="color: white">
              {{ settings.pageTitle }}
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
          v-if="publishedPosts"
          v-for="(post, index) in publishedPosts"
          :key="post._id">
          <preview-post
            v-model="publishedPosts[index]"
            :settings="settings"></preview-post>
        </template>
      </v-col>
      <v-col cols="2">
        <sidebar />
      </v-col>
    </v-row>
  </v-container>
</template>
