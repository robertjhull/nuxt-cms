<script setup lang="ts">
import type { User } from "~/interfaces";

const { data: user, pending } = useAsyncData<User>("user-dashboard", () => {
  return $fetch("/api/dashboard");
});
</script>

<template>
  <v-container
    class="pa-0 ma-0 fill-height align-start"
    fluid>
    <div
      v-if="pending"
      class="linear-progress-bar">
      <v-progress-linear
        color="primary"
        indeterminate />
    </div>
    <v-row
      v-else
      class="d-flex justify-center mt-6">
      <v-col
        class="d-flex flex-column main-content"
        cols="10"
        xs="10"
        sm="10"
        md="10"
        lg="8"
        xl="8">
        <v-row v-if="user">
          <v-col class="d-flex flex-column ga-10">
            <project-summary />
            <comment-overview v-model="user.comments" />
          </v-col>
          <v-col class="d-flex flex-column ga-10 mb-10">
            <post-overview v-model="user.posts" />
            <new-draft />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
