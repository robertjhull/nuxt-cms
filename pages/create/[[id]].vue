<script setup lang="ts">
import type { Post } from "~/interfaces";
import ExtendedEditor from "~/utils/tiptapEditor";

const post = ref<Partial<Post>>({ content: "<p>Start typing here...</p>" });
const route = useRoute();
const store = usePostsStore();

let editor: ExtendedEditor | null = null;

const loadDraft = async () => {
  const draftId = route.params.id as string | undefined;
  if (!draftId) {
    return;
  }

  const draft = store.getPostById(draftId);
  if (draft) {
    post.value = draft;
    return;
  }

  try {
    const fetchedPost = await $fetch<Post>(`/api/post?postId=${draftId}`);
    if (fetchedPost) {
      post.value = fetchedPost;
    }
  } catch (error) {
    console.error("Failed to load draft:", error);
  }
};

onMounted(() => {
  loadDraft().then(() => {
    editor = new ExtendedEditor(post.value, store);
  });
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
