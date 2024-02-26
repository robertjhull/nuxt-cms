<script setup lang="ts">
import { mdiThemeLightDark } from "@mdi/js";
import { useTheme } from "vuetify";

const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value =
    theme.global.name.value == "light" ? "dark" : "light";
};
</script>

<template>
  <v-chip
    @click="toggleTheme"
    class="theme-toggle"
    variant="elevated"
    size="large">
    <template #default>
      <v-icon :icon="mdiThemeLightDark" />
    </template>
  </v-chip>
</template>

<style scoped lang="scss">
.theme-toggle {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  pointer-events: auto !important;
  cursor: pointer !important;
  z-index: 99;
}
</style>
