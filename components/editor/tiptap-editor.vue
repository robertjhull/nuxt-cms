<script setup lang="ts">
import { mdiNote } from "@mdi/js";
import { EditorContent } from "@tiptap/vue-3";
import type ExtendedEditor from "~/utils/tiptapEditor";

const editor = defineModel<ExtendedEditor>("editor", { required: true });
</script>

<template>
  <v-row>
    <v-col
      cols="8"
      class="mx-auto">
      <v-sheet
        class="editor my-10"
        elevation="10">
        <v-row
          class="header d-flex align-center py-4"
          no-gutters>
          <v-text-field
            :model-value="editor.title"
            class="mx-4"
            bg-color="background"
            label="Title"
            variant="solo"
            width="75px"
            hide-details />
          <v-btn
            class="mx-2"
            color="info"
            variant="flat"
            text="Preview"
            @click="editor.preview" />
          <v-btn
            class="mx-2"
            color="warning"
            text="Save draft"
            variant="flat"
            :prepend-icon="mdiNote"
            @click="editor.saveDraft" />
          <v-btn
            class="mx-2"
            color="success"
            variant="flat"
            text="Publish"
            @click="editor.publish" />
        </v-row>
        <v-row
          class="header d-flex justify-space-around"
          no-gutters>
          <menu-bar :editor="editor" />
        </v-row>
        <v-row class="pa-10">
          <editor-content :editor="editor" />
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.editor {
  width: 100%;
  min-height: calc(100vh - 75px);
  color: #0d0d0d;

  .header {
    background-color: rgba(var(--v-theme-background-darken-8));
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
