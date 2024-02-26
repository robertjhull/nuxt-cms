<script setup lang="ts">
import { EditorContent } from "@tiptap/vue-3";
import { useTheme } from "vuetify";
import type ExtendedEditor from "~/utils/tiptapEditor";

const editor = defineModel<ExtendedEditor>("editor", { required: true });

const theme = useTheme();
</script>

<template>
  <v-row
    no-gutters
    class="fill-height">
    <v-sheet class="bg-background-darken-3">
      <v-row
        no-gutters
        class="fill-height">
        <v-col cols="9">
          <v-sheet
            class="my-12 mx-16 pa-12 editor"
            elevation="10">
            <editor-content :editor="editor" />
          </v-sheet>
        </v-col>
        <v-col
          cols="3"
          class="pa-4 d-flex flex-column"
          :class="{
            'bg-background-lighten-1': theme.current.value.dark,
            'bg-background-darken-1': !theme.current.value.dark,
          }">
          <div class="d-flex justify-space-between">
            <v-btn
              color="warning"
              text="Save draft"
              variant="flat"
              class="mx-2"
              @click="editor.saveDraft" />
            <v-btn
              color="success"
              variant="flat"
              text="Publish"
              class="mx-2"
              @click="editor.publish" />
          </div>
          <div class="my-5">
            <v-text-field
              :model-value="editor.title"
              bg-color="background"
              label="Title"
              variant="solo"
              class="ma-2"
              hide-details />
            <v-text-field
              :model-value="editor.subtitle"
              bg-color="background"
              label="Subtitle"
              variant="solo"
              class="mt-6 mx-2"
              hide-details />
          </div>
          <div class="px-2">
            <menu-bar :editor="editor" />
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </v-row>
</template>

<style lang="scss">
.editor {
  min-height: 90vh;
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
