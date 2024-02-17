<script setup lang="ts">
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";

const editor = new Editor({
  content: "...",
  extensions: [StarterKit],
});

defineExpose({
  getHtml: () => editor.getHTML(),
});
</script>

<template>
  <v-sheet
    elevation="5"
    min-height="25vh"
    max-height="75vh">
    <editor-content :editor="editor" />
  </v-sheet>
</template>

<style lang="scss">
.tiptap {
  padding: 20px;
  width: 100%;
  height: 100%;

  &:focus-visible {
    outline: none;
  }
}
</style>
