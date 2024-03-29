<script setup lang="ts">
import { mdiMagnify, mdiPencil, mdiPlusThick } from "@mdi/js";
import type { Post } from "~/interfaces";

useHead({ title: "Posts" });

const { data: posts, pending } = useAsyncData<Post[]>("posts-data", () => {
  return $fetch("/api/post");
});

const store = usePostsStore();

const tags = ["All", "Draft", "Published"];
let selection = ref();

const filteredPosts = computed(() => {
  const filter = tags[selection.value];

  switch (filter) {
    case "All":
      return [...store.posts, ...posts.value!];
    case "Draft":
      return [...store.posts, ...posts.value!].filter(
        (p) => p.status === "draft"
      );
    case "Published":
      return [...store.posts, ...posts.value!].filter(
        (p) => p.status === "published"
      );
    default:
      return [];
  }
});

const search = ref("");

const headers = [
  { key: "status", title: "Status" },
  { key: "title", title: "Title" },
  { key: "author", title: "Author" },
  { key: "created", title: "Created" },
  {},
];

const { formatLongDate } = useFormattedDate();
const datePublished = (datetime: string): string => formatLongDate(datetime);

onMounted(() => (selection.value = 0));
</script>

<template>
  <v-container
    class="pa-0 ma-0 fill-height app-content"
    fluid>
    <div
      v-if="pending"
      class="linear-progress-bar">
      <v-progress-linear
        color="primary"
        indeterminate />
    </div>
    <v-row
      v-else
      class="fill-height w-100"
      no-gutters>
      <v-card
        flat
        rounded="0"
        class="pa-4 w-100">
        <template #title>
          <v-row class="d-flex align-center">
            <v-col class="d-flex align-center">
              <client-only>
                <v-text-field
                  v-model="search"
                  label="Search"
                  variant="outlined"
                  :prepend-inner-icon="mdiMagnify"
                  single-line
                  hide-details />
              </client-only>
            </v-col>
            <v-col class="d-flex justify-center">
              <v-chip-group
                mandatory
                v-model="selection"
                selected-class="bg-primary">
                <v-chip
                  v-for="tag in tags"
                  :key="tag">
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </v-col>
            <v-col class="d-flex justify-end">
              <nuxt-link to="/create">
                <v-btn
                  variant="elevated"
                  color="info"
                  text="Create New"
                  :append-icon="mdiPlusThick" />
              </nuxt-link>
            </v-col>
          </v-row>
        </template>
        <client-only>
          <v-data-table
            v-if="filteredPosts"
            class="pa-2"
            :loading="pending"
            :headers="headers"
            :items="filteredPosts"
            :search="search">
            <template #item="{ item }">
              <tr>
                <td width="20">
                  <v-chip
                    class="mr-2"
                    variant="flat"
                    :text="item.status"
                    :color="item.status == 'draft' ? 'warning' : 'success'" />
                </td>
                <td>
                  <strong>{{ item.title }}</strong>
                </td>
                <td>
                  {{ item.authorName }}
                </td>
                <td>
                  <em v-if="item.published">{{
                    datePublished(item.published)
                  }}</em>
                  <em v-else>{{ datePublished(item.created) }}</em>
                </td>
                <td width="10">
                  <nuxt-link :to="'/create/' + item._id">
                    <v-btn
                      variant="flat"
                      :icon="mdiPencil" />
                  </nuxt-link>
                </td>
              </tr>
            </template>
          </v-data-table>
        </client-only>
      </v-card>
    </v-row>
  </v-container>
</template>

<style lang="scss">
@use "~/assets/scss/main.scss";
</style>
