<script setup lang="ts">
import type { Post } from "~/interfaces";
import ExtendedEditor from "~/utils/extendedEditor";

const route = useRoute();
const store = usePostsStore();
const editor = ref<ExtendedEditor>();

const loadDraft = async () => {
  const draftId = route.params.id as string | undefined;
  if (!draftId) {
    return;
  }

  try {
    return (
      store.getPostById(draftId) ||
      (await $fetch<Post[]>(`/api/post?postId=${draftId}`))[0]
    );
  } catch (error) {
    console.error("Failed to load draft:", error);
    return;
  }
};

onMounted(() => {
  loadDraft().then((draft) => {
    editor.value = new ExtendedEditor(store, draft);
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
