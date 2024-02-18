<script setup lang="ts">
const show = ref(true);
</script>

<template>
  <v-card class="pa-2">
    <template #prepend>
      <div
        color="orange-lighten-2"
        variant="text">
        DRAFT
      </div>
    </template>
    <template #append>
      <v-card-actions>
        <v-btn
          :icon="show ? '$chevronUp' : '$chevronDown'"
          @click="show = !show"></v-btn>
      </v-card-actions>
    </template>
    <v-expand-transition>
      <div v-show="show">
        <v-sheet class="pa-4">
          <v-form>
            <v-text-field label="Title" />
            <v-textarea label="Content" />
            <v-btn
              type="submit"
              color="primary"
              class="mx-auto"
              text="save as draft" />
          </v-form>
        </v-sheet>
      </div>
    </v-expand-transition>
  </v-card>
</template>
