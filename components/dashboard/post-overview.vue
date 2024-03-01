<script setup lang="ts">
import { mdiChevronDown, mdiChevronUp, mdiCommentTextOutline } from "@mdi/js";
import type { Post } from "~/interfaces";

const recentlyPublished = defineModel<Post[]>({ required: true });

const show = ref(true);

const { formatLongDate } = useFormattedDate();
const format = (datetime: string): string => formatLongDate(datetime);
</script>

<template>
  <v-card class="pa-2">
    <template #prepend>
      <div variant="text">RECENT POSTS</div>
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
        <v-list class="pa-2">
          <template
            v-for="(post, index) in recentlyPublished"
            :key="post.id">
            <v-divider v-if="index != 0" />
            <div class="d-flex justify-space-between recent-post align-center">
              <v-col cols="8">
                <v-list-item-title>{{ post.title }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  format(post.published as string)
                }}</v-list-item-subtitle>
              </v-col>
              <v-col
                cols="2"
                class="d-flex justify-end">
                <v-list-item-action>
                  {{ post.comments.length }}
                  <v-icon
                    :icon="mdiCommentTextOutline"
                    class="mx-1" />
                </v-list-item-action>
              </v-col>
            </div>
          </template>
        </v-list>
        <v-card-item class="justify-end">
          <nuxt-link to="/posts">all posts...</nuxt-link>
        </v-card-item>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped lang="scss">
.recent-post:hover {
  color: rgba(var(--v-theme-primary));
  cursor: pointer;
}
</style>
