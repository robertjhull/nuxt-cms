<script setup lang="ts">
import type { Post, Settings } from "~/interfaces";

const post = defineModel<Post>({ required: true });
const props = defineProps<{ settings: Settings }>();

const { formatLongDate } = useFormattedDate();
const datePublished = (datetime: string): string => formatLongDate(datetime);

const computedStyle = computed(() => {
  return `
    color: ${props.settings.textColor} !important;
    font-size: ${props.settings.fontSize} !important;
    font-family: ${props.settings.fontFamily.value} !important;
  `;
});
</script>

<template>
  <v-sheet
    class="pa-6 mb-16"
    color="transparent"
    :key="post._id">
    <header
      class="post-header"
      :style="computedStyle">
      <div class="post-title">{{ post.title }}</div>
      <div class="post-subtitle">{{ post.subtitle }}</div>
      <div class="post-meta">
        <span class="author">By {{ post.authorName }}</span>
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
        :style="computedStyle"
        v-html="post.content"></div>
    </div>

    <v-divider class="my-10" />

    <!-- Comments Section -->
    <v-sheet class="bg-transparent">
      <h2
        class="px-4"
        :style="computedStyle">
        Comments ({{
          post.comments && post.comments.length ? post.comments.length : "0"
        }})
      </h2>
      <v-list
        v-if="post.comments && post.comments.length"
        class="bg-transparent"
        :style="computedStyle">
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
    word-wrap: break-word;
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
}
</style>

<style lang="scss">
.post-content {
  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1) !important;
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    border-radius: 0.5rem;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  mark {
    background-color: #faf594;
  }

  img {
    height: auto;
    max-width: 100%;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    border-left: 2px solid rgba(#0d0d0d, 0.1);
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      align-items: center;
      display: flex;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }

  p {
    margin: 2rem 0;
  }
}
</style>
