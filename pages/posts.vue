<script setup lang="ts">
import { mdiMagnify, mdiPencil, mdiPlusThick } from "@mdi/js";
import type { Post } from "~/interfaces/post";

const { data, pending, error } = await useFetch("/api/posts");

const tags = ["All", "Draft", "Published"];
let selection = ref();

const filteredPosts = computed(() => {
  const filter = tags[selection.value];

  if (!filter || filter == "All") {
    return data.value as Post[];
  }

  return (data.value as Post[]).filter((p) => p.status == filter.toLowerCase());
});

const search = ref("");

const headers = [
  {
    align: "start",
    key: "status",
    sortable: false,
    title: "Status",
  },
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
    class="pa-0 ma-0 fill-height"
    fluid>
    <v-row
      class="fill-height w-100"
      no-gutters>
      <template v-if="pending">Loading...</template>
      <template v-else-if="error"> {{ error }}</template>
      <template v-else>
        <v-card
          flat
          rounded="0"
          class="pa-4 w-100">
          <template #title>
            <v-row class="d-flex align-center">
              <v-col class="d-flex align-center"
                ><v-text-field
                  v-model="search"
                  label="Search"
                  variant="outlined"
                  :prepend-inner-icon="mdiMagnify"
                  single-line
                  hide-details
              /></v-col>
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
          <v-data-table
            class="pa-2"
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
                  {{ item.author.name }}
                </td>
                <td>
                  <em v-if="item.published">{{
                    datePublished(item.published)
                  }}</em>
                </td>
                <td width="10">
                  <nuxt-link :to="'/create/' + item.id">
                    <v-btn
                      variant="flat"
                      :icon="mdiPencil" />
                  </nuxt-link>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </template>
    </v-row>
  </v-container>
</template>
