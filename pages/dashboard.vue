<script setup lang="ts">
import type { User } from "~/interfaces";

const { data } = await useFetch("/api/users", {
  method: "POST",
  body: { id: "e95155db-412e-4e48-a8a4-302b73ec4beb" },
});
const user = data.value as User;
</script>

<template>
  <v-row class="d-flex justify-center mt-6">
    <v-col
      class="d-flex flex-column main-content"
      cols="10"
      xs="10"
      sm="10"
      md="10"
      lg="8"
      xl="8">
      <v-row>
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
</template>
