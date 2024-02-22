<script setup lang="ts">
import { ref } from "vue";

const settings = ref({
  pageTitle: "",
  pageColor: "#EEEEEE",
  textColor: "#000",
  fontFamily: { name: "Arial", value: "Arial, sans-serif" },
  fontSize: 16,
  navPosition: "left",
  headerImage: "",
});

const { data } = await useFetch("/api/settings/", {
  method: "get",
  params: { id: "<id>" },
});

if (data.value) {
  Object.assign(settings.value, data.value);
}

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
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        cols="10"
        xl="8"
        lg="10"
        md="10"
        sm="10"
        class="mx-auto">
        <v-card class="pa-4">
          <v-card-title>Appearance Settings</v-card-title>
          <v-row class="d-flex justify-space-between">
            <v-col
              cols="6"
              xl="6"
              lg="6"
              md="6"
              sm="12"
              xs="12"
              class="pa-8 d-flex flex-column justify-space-between">
              <v-row>
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </v-sheet>
              </v-row>
              <v-spacer />
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
            <v-col
              cols="6"
              xl="6"
              lg="6"
              md="6"
              sm="12"
              xs="12"
              class="pa-8">
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

              <!-- Colors -->
              <client-only>
                <v-color-picker
                  v-model="color"
                  class="ma-2 mx-auto"
                  elevation="0"
                  show-swatches
                  swatches-max-height="150px">
                  >
                </v-color-picker>
              </client-only>
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
          <v-row class="d-flex justify-end pa-2">
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
.preview-pane {
  height: 300px;
  width: 100%;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
}
</style>
