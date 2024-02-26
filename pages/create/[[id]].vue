<script setup lang="ts">
import type { Post } from "~/interfaces";
import ExtendedEditor from "~/utils/tiptapEditor";

const post = ref<Partial<Post>>({ content: "<p>Start typing here...</p>" });
const route = useRoute();

const loadDraft = async () => {
  if (!route || !route.params.id) {
    return null;
  }

  const { data } = await useFetch("/api/posts", {
    method: "get",
    query: { id: route.params.id },
  });

  if (data.value) {
    post.value = (data.value as Post[])[0];
  }
};

await loadDraft();

let editor: ExtendedEditor | null = null;
onMounted(() => {
  editor = new ExtendedEditor(post.value);
});
</script>

<template>
  <v-container
    fluid
    class="pa-0 ma-0 fill-height">
    <client-only placeholder="loading...">
      <tiptap-editor :editor="editor" />
    </client-only>
  </v-container>
</template>
