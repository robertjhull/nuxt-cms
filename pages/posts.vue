<script setup lang="ts">
import type { Post } from "~/interfaces/post";

const { data, pending, error, refresh } = await useFetch("/api/posts");

const tags = ["All", "Draft", "Published"];
let selection = ref(0);

const filteredPosts = computed(() => {
  const filter = tags[selection.value];

  if (!filter || filter == "All") {
    return data.value as Post[];
  }

  return (data.value as Post[]).filter((p) => p.status == filter.toLowerCase());
});
</script>

<template>
  <v-container>
    <v-col
      cols="8"
      class="mx-auto">
      <v-row class="justify-end pa-2 mt-2">
        <v-btn
          color="info"
          text="Create New"
          append-icon="$new" />
      </v-row>
      <v-row class="justify-center">
        <v-chip-group
          mandatory
          v-model="selection"
          selected-class="bg-primary">
          <v-chip
            v-for="tag in tags"
            :key="tag">
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-row>
      <v-row>
        <v-col class="d-flex flex-column main-content ga-4">
          <template v-if="pending">Loading...</template>
          <template v-else-if="error"> {{ error }}</template>
          <template
            v-else
            v-for="(post, index) in filteredPosts"
            :key="post.id">
            <post v-model="filteredPosts[index]" />
          </template>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>
