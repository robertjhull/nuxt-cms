<script setup lang="ts">
import type { Post } from "~/interfaces";
import ExtendedEditor from "~/utils/tiptapEditor";

const post = ref<Partial<Post>>({ content: "<p>Start typing here...</p>" });
const route = useRoute();
const store = usePostsStore();

const loadDraft = async () => {
  if (!route || !route.params.id) {
    return null;
  }

  const draft = store.getPostById(route.params.id as string);
  if (draft) {
    post.value = draft;
  } else {
    const { data } = await useFetch("/api/post", {
      method: "get",
      query: { id: route.params.id },
    });

    if (data.value) {
      post.value = (data.value as Post[])[0];
    }
  }
};

await loadDraft();

let editor: ExtendedEditor | null = null;
onMounted(() => {
  editor = new ExtendedEditor(post.value, store);
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
