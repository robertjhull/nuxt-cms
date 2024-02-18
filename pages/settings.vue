<script setup lang="ts">
import type { User } from "~/interfaces/user";

const getSettings = async () => {
  const { data, error } = await useFetch(
    "/api/settings?userId=e95155db-412e-4e48-a8a4-302b73ec4beb"
  );

  console.log(data.value);
  return data.value;
};

const userSettings = (await getSettings()) as Partial<User>;

const updateSettings = async () => {
  console.log("updating");
  // Simulate an API call with useFetch
  const { data, error } = await useFetch("/api/settings", {
    method: "patch",
    body: {
      userId: "e95155db-412e-4e48-a8a4-302b73ec4beb",
      updated: userSettings,
    },
  });

  console.log(data.value);
};
</script>

<template>
  <v-container>
    <v-col cols="4 mx-auto">
      <div class="text-h6 my-8 d-flex justify-center">Settings</div>
      <v-form @change="updateSettings">
        <v-text-field
          v-model="userSettings.name"
          label="Name" />
        <v-text-field
          v-model="userSettings.email"
          label="Email" />
        <v-switch
          v-model="userSettings.darkMode"
          label="Dark mode"></v-switch>
      </v-form>
    </v-col>
  </v-container>
</template>
