<script setup lang="ts">
import type { User } from "~/interfaces/user";

// testing
const { data } = await useFetch("/api/users", {
  method: "POST",
  body: { id: "e95155db-412e-4e48-a8a4-302b73ec4beb" },
});
const user = data.value as User;
</script>

<template>
  <v-row class="d-flex justify-center mb-6">
    <v-col
      class="d-flex flex-column main-content ga-10"
      cols="12"
      sm="10"
      md="8"
      lg="6">
      <overview :user="user" />
      <activity />
      <drafts />
    </v-col>
  </v-row>
</template>
