<script setup lang="ts">
import { mdiReply } from "@mdi/js";
import type { Comment, Settings } from "~/interfaces";

const comment = defineModel<Comment>({ required: true });
const props = defineProps<{ settings: Settings }>();

const { formatShortDate } = useFormattedDate();
const format = (datetime: string): string => formatShortDate(datetime);

const computedStyle = computed(() => {
  return `
    color: ${props.settings.textColor} !important;
    font-size: ${props.settings.fontSize} !important;
    font-family: ${props.settings.fontFamily.value} !important;
  `;
});
</script>

<template>
  <v-sheet
    class="comment my-2 py-2"
    elevation="1">
    <div class="pl-3">
      <v-row
        no-gutters
        :style="computedStyle">
        {{ comment.text }}
      </v-row>
      <v-row
        class="d-flex align-center"
        no-gutters>
        <v-col cols="10">
          <div
            class="font-weight-thin"
            :style="computedStyle">
            {{ comment.authorName }}
          </div>
          <div class="text-caption">
            {{ format(comment.created as string) }}
          </div>
        </v-col>
      </v-row>
    </div>
    <v-row
      v-if="comment.replies && comment.replies.length"
      no-gutters
      class="d-flex justify-end">
      <v-col
        cols="1"
        class="d-flex justify-center align-center">
        <v-icon :icon="mdiReply" />
      </v-col>
      <v-col cols="11">
        <template
          v-for="(reply, index) in comment.replies"
          :key="index">
          <preview-comment
            v-model="comment.replies[index]"
            :settings="settings" />
        </template>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped lang="scss">
.comment {
  background-color: rgba(var(--v-theme-background), 0.8);
  border-left: 2px solid rgba(var(--v-theme-background-darken-4));
}
</style>
