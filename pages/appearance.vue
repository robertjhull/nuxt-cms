<script setup lang="ts">
import { ref } from "vue";

const settings = ref({
  pageTitle: "",
  pageColor: "#424242",
  textColor: "#4FC3F7",
  fontFamily: "",
  fontSize: 16,
  navPosition: "left",
  headerImage: "",
});

const color = ref("#FFA000");

const colorOptions = [
  { name: "White", value: "white" },
  { name: "Black", value: "black" },
];

const fontOptions = [
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Times New Roman", value: '"Times New Roman", serif' },
  { name: "Courier New", value: '"Courier New", monospace' },
  { name: "Georgia", value: "Georgia, serif" },
];

const saveAppearanceSettings = async () => {
  const { data } = await useFetch("/api/appearance", {
    method: "patch",
    body: {},
  });
};

const loadAppearanceSettings = async () => {
  const { data } = await useFetch("/api/appearance", {
    method: "get",
  });
};

loadAppearanceSettings();
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        cols="10"
        class="mx-auto">
        <v-card class="pa-4">
          <v-card-title>Appearance Settings</v-card-title>
          <v-row class="d-flex justify-space-evenly w-100">
            <v-col cols="5">
              <v-row>
                <!-- Preview goes here -->
              </v-row>
              <v-row>
                <v-card-text>
                  <!-- Page Title -->
                  <v-text-field
                    v-model="settings.pageTitle"
                    label="Page Title" />

                  <!-- Header Image Upload -->
                  <v-text-field
                    v-model="settings.headerImage"
                    label="Link to Header Image" />

                  <!-- Navigation Panel -->
                  <v-radio-group
                    v-model="settings.navPosition"
                    label="Navigation Panel"
                    inline>
                    <v-radio
                      label="Left"
                      value="left" />
                    <v-radio
                      label="Right"
                      value="right" />
                  </v-radio-group>
                </v-card-text>
              </v-row>
            </v-col>
            <v-spacer />
            <v-col>
              <!-- Font Family -->
              <v-select
                v-model="settings.fontFamily"
                :items="fontOptions"
                label="Font Family"
                item-text="name"
                item-value="value" />

              <!-- Font Size -->
              <v-slider
                v-model="settings.fontSize"
                :max="24"
                :min="12"
                label="Font Size"
                thumb-label="always"
                class="mt-4" />

              <!-- Colors -->
              <v-color-picker
                v-model="color"
                class="ma-2"
                elevation="0"
                show-swatches
                swatches-max-height="150px">
                >
              </v-color-picker>
              <div class="d-flex justify-center ga-4 my-4">
                <v-btn
                  variant="outlined"
                  :color="settings.textColor"
                  @click="settings.textColor = color">
                  Text Color
                </v-btn>
                <v-btn
                  variant="outlined"
                  :color="settings.pageColor"
                  @click="settings.pageColor = color">
                  Page Color
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-center">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
.preview {
  height: 200px;
  width: 200px;
}
</style>
