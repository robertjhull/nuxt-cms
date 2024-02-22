<script setup lang="ts">
import ExtendedEditor from "~/utils/tiptapEditor";

let content = "<p>Start typing here...</p>";
const route = useRoute();

const loadDraft = async () => {
  if (!route.params.id) {
    return null;
  }

  const { data } = await useFetch("/api/posts", {
    method: "get",
    query: { id: route.params.id },
  });

  content = data.value as string;
};

const editor = new ExtendedEditor(content);
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
