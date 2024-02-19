<script setup lang="ts">
import type { Comment } from "~/interfaces/comment";

const { data, pending, error, refresh } = await useFetch("/api/comments");

const tags = ["All", "Pending", "Approved", "Trash"];
let selection = ref(0);

const filteredComments = computed(() => {
  const filter = tags[selection.value];

  if (!filter || filter == "All") {
    return data.value as Comment[];
  }

  return (data.value as Comment[]).filter(
    (c) => c.status == filter.toLowerCase()
  );
});
</script>

<template>
  <v-container>
    <v-col
      cols="6"
      class="mx-auto">
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
            v-for="(comment, index) in filteredComments"
            :key="comment.id">
            <comment v-model="filteredComments[index]" />
          </template>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>
