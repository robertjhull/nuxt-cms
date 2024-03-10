<script setup lang="ts">
import type { Post } from "~/interfaces";
import ExtendedEditor from "~/utils/extendedEditor";

useHead({ title: "Create Post" });

const route = useRoute();
const store = usePostsStore();
const editor = ref<ExtendedEditor>();

const loadDraft = async () => {
  const draftId = route.params.id as string | undefined;

  if (!draftId) {
    return {} as Post;
  }

  if (draftId.includes("draft")) {
    return store.getPostById(draftId) || ({} as Post);
  }

  try {
    const posts = await $fetch<Post[]>(`/api/post?postId=${draftId}`);
    return posts[0] || ({} as Post);
  } catch (error) {
    console.error("Failed to load draft:", error);
    return {} as Post;
  }
};

onMounted(() => {
  loadDraft().then((draft) => {
    editor.value = new ExtendedEditor(draft);
  });
});
</script>

<template>
  <v-container
    v-if="editor"
    fluid
    class="pa-0 ma-0 fill-height">
    <ClientOnly>
      <template #fallback>
        <div class="linear-progress-bar">
          <v-progress-linear
            color="primary"
            indeterminate />
        </div>
      </template>
      <tiptap-editor :editor="editor" />
    </ClientOnly>
  </v-container>
</template>
