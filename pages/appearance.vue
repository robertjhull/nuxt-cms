<script setup lang="ts">
import { mdiCheckCircle } from "@mdi/js";
import { ref } from "vue";
import useAppearanceSettings from "~/composables/useAppearanceSettings";

useHead({ title: "Settings" });

const {
  settings,
  fontOptions,
  saveAppearanceSettings,
  pending,
  saving,
  success,
} = useAppearanceSettings();
const color = ref("#FFA000");
</script>

<template>
  <v-container
    fluid
    class="pa-0 fill-height">
    <div
      v-if="pending"
      class="linear-progress-bar">
      <v-progress-linear
        color="primary"
        indeterminate />
    </div>
    <v-card
      v-else
      class="px-10 fill-height w-100"
      rounded="0">
      <v-row
        class="py-5"
        no-gutters>
        <client-only>
          <v-col cols="5">
            <v-row>
              <v-card-title class="mb-5">Appearance Settings</v-card-title>
              <v-card-text>
                <!-- Page Title -->
                <v-text-field
                  v-model="settings.pageTitle"
                  label="Page Title" />

                <!-- Header Image Upload -->
                <v-text-field
                  v-model="settings.headerImage"
                  disabled
                  label="Link to Header Image" />

                <!-- Preview -->
                <v-sheet
                  class="preview-pane pa-8 my-4"
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
                </v-sheet>

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
            </v-row>

            <!-- Colors -->
            <v-row class="justify-space-evenly d-flex">
              <client-only>
                <v-color-picker
                  v-model="color"
                  elevation="0"
                  hide-sliders
                  hide-canvas
                  hide-inputs
                  show-swatches
                  swatches-max-height="200px">
                  >
                </v-color-picker>
              </client-only>
              <div class="d-flex flex-column ga-4">
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
            <v-row
              no-gutters
              class="w-100 pa-2 align-center">
              <v-btn
                color="success"
                variant="flat"
                class="my-12"
                @click="saveAppearanceSettings">
                <template #prepend>
                  <v-progress-circular
                    v-if="saving"
                    size="20"
                    indeterminate />
                </template>
                Save Appearance
              </v-btn>
              <v-fade-transition>
                <v-icon
                  v-if="success && !saving"
                  class="mx-2 text-success"
                  :icon="mdiCheckCircle" />
              </v-fade-transition>
            </v-row>
          </v-col>
        </client-only>
        <v-spacer />
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped lang="scss">
.preview-pane {
  width: 100%;
  min-height: 130px;
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
