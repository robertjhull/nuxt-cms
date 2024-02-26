<script setup lang="ts">
import type { Draft, Post } from "~/interfaces/post";
import ExtendedEditor from "~/utils/tiptapEditor";

const draft = ref<Draft | Post>({ content: "<p>Start typing here...</p>" });
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
    draft.value = (data.value as Post[])[0];
  }
};

await loadDraft();

let editor: ExtendedEditor | null = null;
onMounted(() => {
  editor = new ExtendedEditor(draft.value);
});
</script>

<template>
  <v-container
    fluid
    class="pa-0">
    <client-only placeholder="loading...">
      <tiptap-editor :editor="editor" />
    </client-only>
  </v-container>
</template>
