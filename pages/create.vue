<script setup lang="ts">
import ExtendedEditor from "~/utils/tiptapEditor";
const editor = new ExtendedEditor("<p>Start typing here...</p>");
</script>

<template>
  <v-container>
    <v-row class="w-100 justify-center">
      <v-col
        class="d-flex flex-column main-content"
        cols="9">
        <client-only placeholder="loading...">
          <tiptap-editor :editor="editor" />
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>
