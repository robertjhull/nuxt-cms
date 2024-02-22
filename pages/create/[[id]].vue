<script setup lang="ts">
import type { Post } from "~/interfaces/post";
import ExtendedEditor from "~/utils/tiptapEditor";

const content = ref({ content: "<p>Start typing here...</p>" });
const route = useRoute();

const loadDraft = async () => {
  console.log(route.params);
  if (!route) {
    return null;
  }

  const { data } = await useFetch("/api/posts", {
    method: "get",
    query: { id: route.params.id },
  });

  if (data.value) {
    content.value = (data.value as Post[])[0];
  }
};

await loadDraft();

let editor: ExtendedEditor | null = null;
onMounted(() => {
  editor = new ExtendedEditor(content.value);
});
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
