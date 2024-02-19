<script setup lang="ts">
import { useTheme } from "vuetify";
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

  if (data.value) {
    toggleTheme();
  }
};

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = userSettings.darkMode ? "dark" : "light";
}
</script>

<template>
  <v-container>
    <v-col cols="5 mx-auto">
      <v-card class="w-100 py-8 px-12">
        <div class="text-h6 mb-8 d-flex justify-center">Settings</div>
        <v-form @change="updateSettings">
          <v-text-field
            v-model="userSettings.name"
            label="Name" />
          <v-text-field
            v-model="userSettings.email"
            label="Email" />
          <v-switch
            v-model="userSettings.darkMode"
            :label="
              userSettings.darkMode ? 'Dark mode' : 'Light mode'
            "></v-switch>
        </v-form>
      </v-card>
    </v-col>
  </v-container>
</template>
