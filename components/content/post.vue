<script setup lang="ts">
import type { Post } from "~/interfaces/post";

const post: Post = defineModel();
const { formatDate } = useFormattedDate();
const datePublished = (datetime: string): string => formatDate(datetime);
const isDraft = post.status == "draft";
const statusColor = isDraft ? "warning" : "primary";
</script>

<template>
  <v-card class="pa-1 w-100">
    <template #prepend>
      <v-chip
        class="mr-2"
        variant="flat"
        :text="post.status"
        :color="statusColor" />
      <span v-if="post.published">{{ datePublished(post.published) }}</span>
    </template>
    <template #append>
      <v-icon icon="$edit" />
    </template>
    <v-card-text
      class="text-h5 pl-5 pb-0"
      :class="{ draft: isDraft }"
      >{{ post.title }}
    </v-card-text>
    <v-card-actions>
      <v-list-item
        class="w-100"
        :class="{ draft: isDraft }">
        <v-list-item-title>{{ post.author.name }}</v-list-item-title>

        <template
          #append
          v-if="!isDraft">
          <div class="justify-self-end">
            <nuxt-link to="/analytics">
              <v-icon
                icon="$user"
                color="secondary"
                class="mx-2" />
              <span class="text-secondary"
                >{{ post.readers }} Reader{{
                  post.readers != 1 ? "s" : ""
                }}</span
              >
            </nuxt-link>
            <nuxt-link to="/comments">
              <v-icon
                icon="$comments"
                color="secondary"
                class="mx-2" />
              <span class="text-secondary"
                >{{ post.comments }} Comment{{
                  post.comments > 1 ? "s" : ""
                }}</span
              >
            </nuxt-link>
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<style scoped lang="scss">
.draft {
  opacity: 0.5;
}
</style>
