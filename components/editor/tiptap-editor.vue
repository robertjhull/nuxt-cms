<script setup lang="ts">
import { EditorContent } from "@tiptap/vue-3";
import type ExtendedEditor from "~/utils/tiptapEditor";

const editor = defineModel<ExtendedEditor>("editor", { required: true });
</script>

<template>
  <v-container v-if="editor">
    <v-sheet
      class="editor"
      elevation="5">
      <v-row
        class="editor__header"
        no-gutters>
        <menu-bar :editor="editor" />
      </v-row>
      <v-row
        class="editor__subheader w-100"
        no-gutters>
        <v-form class="d-flex align-center justify-space-evenly w-100 py-2">
          <v-text-field
            :model-value="editor.title"
            class="mx-4"
            bg-color="background"
            color="primary-darken-2"
            label="Title"
            variant="solo"
            hide-details />
          <v-btn
            class="mx-4"
            color="info"
            text="Preview" />
          <v-btn
            class="mx-4"
            color="warning"
            text="Save draft"
            prepend-icon="$note" />
        </v-form>
      </v-row>
      <v-row
        class="editor__content d-flex"
        no-gutters>
        <editor-content :editor="editor" />
      </v-row>
    </v-sheet>
  </v-container>
</template>

<style lang="scss">
.editor {
  $main-editor-color: rgba(var(--v-theme-background-darken-4));

  width: 100%;
  height: 90vh;
  border-radius: 0.75rem;
  background-color: rgba(var(--v-theme-background));
  border: 3px solid $main-editor-color;
  color: #0d0d0d;
  display: flex;
  flex-direction: column;

  &__header {
    background: $main-editor-color;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: flex;
    flex: 0 0 auto;
    padding: 0.4rem 0.25rem;
  }

  &__subheader {
    background: $main-editor-color;
    flex: 0 0 auto;
  }

  &__content {
    flex: 1 1 auto;
    text-overflow: wrap;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 2rem;
    -webkit-overflow-scrolling: touch;
  }
}

.tiptap {
  &:focus-visible {
    outline: none;
  }

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1) !important;
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    border-radius: 0.5rem;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  mark {
    background-color: #faf594;
  }

  img {
    height: auto;
    max-width: 100%;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    border-left: 2px solid rgba(#0d0d0d, 0.1);
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      align-items: center;
      display: flex;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
}
</style>
