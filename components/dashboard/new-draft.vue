<script setup lang="ts">
import { mdiChevronDown, mdiChevronUp, mdiNote } from "@mdi/js";
import type { VForm } from "vuetify/components/VForm";
import type { Post } from "~/interfaces";

const router = useRouter();
const store = usePostsStore();
const show = ref(true);
const formRef = ref();
const title = ref<string>();
const content = ref<string>();

const saveDraft = async () => {
  const { valid } = await (formRef.value as VForm).validate();
  if (!valid) {
    return;
  }

  const draftPost = {
    _id: store.getDraftId(),
    title: title.value,
    subtitle: "",
    content: content.value,
    authorName: "Demo User",
  } as Post;

  const id = store.addPost(draftPost);
  router.push(`/create/${id}`);
};
</script>

<template>
  <v-card class="pa-2">
    <template #prepend>
      <div>NEW DRAFT</div>
    </template>
    <template #append>
      <v-card-actions>
        <v-btn
          :icon="show ? mdiChevronUp : mdiChevronDown"
          @click="show = !show"></v-btn>
      </v-card-actions>
    </template>
    <v-expand-transition>
      <div v-show="show">
        <v-sheet class="pa-4">
          <v-form
            ref="formRef"
            @submit.prevent="saveDraft"
            validate-on="submit">
            <v-text-field
              label="Title"
              v-model="title"
              :rules="[(title) => !!title || 'Title is required']" />
            <v-textarea
              label="Content"
              v-model="content"
              :rules="[(content) => !!content || 'Content is required']" />
            <v-row class="justify-end">
              <v-btn
                type="submit"
                color="info"
                class="ma-3"
                :prepend-icon="mdiNote"
                text="save as draft" />
            </v-row>
          </v-form>
        </v-sheet>
      </div>
    </v-expand-transition>
  </v-card>
</template>
