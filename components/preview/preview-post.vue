<script setup lang="ts">
import type { Post, Settings } from "~/interfaces";

const post = defineModel<Post>({ required: true });
defineProps<{ settings: Settings }>();

const { formatLongDate } = useFormattedDate();
const datePublished = (datetime: string): string => formatLongDate(datetime);
</script>

<template>
  <v-sheet
    class="pa-6 mb-16"
    color="transparent"
    :key="post._id">
    <!-- Meta -->
    <header
      class="post-header"
      :style="{
        color: settings.textColor,
        fontSize: settings.fontSize,
        fontFamily: settings.fontFamily.value,
      }">
      <div class="post-title">{{ post.title }}</div>
      <div class="post-meta">
        <span class="author">By {{ post.author.name }}</span>
        <time
          class="timestamp"
          :datetime="post.created"
          >{{ datePublished(post.created) }}</time
        >
      </div>
    </header>

    <v-divider class="my-10" />

    <!-- Content -->
    <div>
      <div
        class="post-content"
        :style="{
          color: settings.textColor,
          fontSize: settings.fontSize,
          fontFamily: settings.fontFamily.value,
        }"
        v-html="post.content"></div>
    </div>

    <v-divider class="my-10" />

    <!-- Comments Section -->
    <v-sheet class="bg-transparent">
      <h2 class="px-4 text-white">
        Comments ({{ post.comments.length ?? "0" }})
      </h2>
      <v-list
        v-if="post.comments.length"
        class="bg-transparent">
        <template
          v-for="(comment, index) in post.comments"
          :key="comment._id">
          <preview-comment v-model="post.comments[index]" />
        </template>
      </v-list>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
.post-header {
  margin-bottom: 30px;

  .post-title {
    font-size: 2.75em;
    font-weight: 600;
    margin-bottom: 0.15em;
  }

  .post-subtitle {
    font-size: 1.25em;
    margin-bottom: 0.15em;
  }

  .post-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8em;

    .author {
      font-weight: bold;
    }

    .timestamp {
      font-style: italic;
    }
  }

  .post-content p {
    margin: 2rem 0;
  }
}
</style>
