<script setup lang="ts">
import { ref } from "vue";

const settings = ref({
  pageTitle: "",
  pageColor: "#EEEEEE",
  textColor: "#000",
  fontFamily: { name: "Arial", value: "Arial, sans-serif" },
  fontSize: 16,
  headerImage: "",
});

const { data } = await useFetch("/api/settings/", {
  method: "get",
  params: { id: "<id>" },
});

const color = ref("#FFA000");

const fontOptions = [
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Times New Roman", value: '"Times New Roman", serif' },
  { name: "Courier New", value: '"Courier New", monospace' },
  { name: "Georgia", value: "Georgia, serif" },
];

const saveAppearanceSettings = async () => {
  await useFetch("/api/settings", {
    method: "patch",
    body: { id: "<id>", ...settings.value },
  });
};

onMounted(() => {
  if (data.value) {
    Object.assign(settings.value, data.value);
  }
});
</script>

<template>
  <v-container
    fluid
    class="pa-0 fill-height">
    <v-card
      class="px-10 fill-height"
      rounded="0">
      <v-row
        class="py-10"
        no-gutters>
        <v-col cols="5">
          <v-card-title class="mb-5">Appearance Settings</v-card-title>
          <v-card-text>
            <!-- Page Title -->
            <v-text-field
              v-model="settings.pageTitle"
              label="Page Title" />

            <!-- Header Image Upload -->
            <v-text-field
              v-model="settings.headerImage"
              label="Link to Header Image" />

            <!-- Font Family -->
            <v-select
              v-model="settings.fontFamily"
              :items="fontOptions"
              label="Font Family"
              item-title="name"
              item-value="value"
              return-object />

            <!-- Font Size -->
            <v-slider
              v-model="settings.fontSize"
              :max="24"
              :min="12"
              :step="1"
              label="Font Size"
              thumb-label="always"
              class="mt-4" />
          </v-card-text>

          <!-- Colors -->
          <v-row class="justify-space-evenly d-flex">
            <client-only>
              <v-color-picker
                v-model="color"
                elevation="0"
                hide-inputs
                show-swatches
                swatches-max-height="150px">
                >
              </v-color-picker>
            </client-only>
            <div class="d-flex flex-column ga-4 my-4">
              <v-btn
                variant="tonal"
                @click="settings.textColor = color">
                Apply Text Color
                <div
                  :style="{ backgroundColor: settings.textColor }"
                  class="color-chip ml-3"></div>
              </v-btn>
              <v-btn
                variant="tonal"
                @click="settings.pageColor = color">
                Apply Page Color
                <div
                  :style="{ backgroundColor: settings.pageColor }"
                  class="color-chip ml-3"></div>
              </v-btn>
            </div>
          </v-row>
        </v-col>
        <v-spacer />
        <v-col cols="5">
          <v-card-title class="text-center">Preview</v-card-title>
          <v-sheet
            class="preview-pane pa-8 ma-4"
            elevation="8"
            rounded
            :style="{
              color: settings.textColor,
              backgroundColor: settings.pageColor,
              fontFamily: settings.fontFamily.value,
              fontSize: settings.fontSize + 'px',
            }">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </v-sheet>
        </v-col>
      </v-row>
      <v-row
        class="d-flex justify-end pa-2"
        no-gutters>
        <v-card-actions>
          <v-btn
            color="success"
            variant="flat"
            @click="saveAppearanceSettings">
            Save Appearance
          </v-btn>
        </v-card-actions>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped lang="scss">
.preview-pane {
  height: 70vh;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
}

.color-chip {
  height: 20px;
  width: 20px;
  border: 1px solid;
}
</style>
