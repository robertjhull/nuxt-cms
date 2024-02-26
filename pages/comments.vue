<script setup lang="ts">
import { mdiCheck, mdiChevronDown, mdiChevronUp, mdiTrashCan } from "@mdi/js";
import type { Comment } from "~/interfaces";

const { data, pending, error } = await useFetch("/api/comments");

const tags = ["All", "Pending", "Approved", "Trash"];
const selection = ref();

const filteredComments = computed(() => {
  const filter = tags[selection.value];

  if (!filter || filter == "All") {
    return data.value as Comment[];
  }

  return (data.value as Comment[]).filter(
    (c) => c.status == filter.toLowerCase()
  );
});

const statusColor = (status: string) => {
  return status == "trash"
    ? "red"
    : status == "pending"
    ? "warning"
    : "success";
};

const headers = [
  {
    align: "start",
    key: "status",
    sortable: true,
    title: "Status",
  },
  { key: "text", sortable: false, title: "Comment" },
  { key: "author.name", sortable: true, title: "Author" },
  { key: "created", sortable: true, title: "Date" },
];

const { formatShortDate } = useFormattedDate();
const datePosted = (datetime: string): string => formatShortDate(datetime);

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
            </v-row>
          </template>
          <v-data-table
            class="pa-2"
            :headers="headers"
            :items="filteredComments"
            expand-on-click
            show-expand>
            <template #item="{ item, internalItem, isExpanded, toggleExpand }">
              <tr>
                <td width="10%">
                  <v-chip
                    class="mr-2"
                    variant="flat"
                    :text="item.status"
                    :color="statusColor(item.status)" />
                </td>
                <td
                  style="
                    max-width: 100px;
                    max-height: 50px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  ">
                  <strong>{{ item.text }}</strong>
                </td>
                <td width="15%">
                  {{ item.author.name }}
                </td>
                <td width="20%">
                  <span style="font-size: 0.75rem">{{
                    datePosted(item.created)
                  }}</span>
                </td>
                <td class="d-flex justify-end">
                  <v-btn
                    v-if="item.status == 'pending'"
                    color="success"
                    variant="plain"
                    :icon="mdiCheck" />
                  <v-btn
                    v-if="item.status != 'trash'"
                    variant="plain"
                    color="error"
                    :icon="mdiTrashCan" />
                  <v-btn
                    variant="plain"
                    :icon="
                      isExpanded(internalItem) ? mdiChevronUp : mdiChevronDown
                    "
                    @click="toggleExpand(internalItem)" />
                </td>
              </tr>
            </template>
            <template #expanded-row="{ columns, item }">
              <tr>
                <td :colspan="columns.length">
                  {{ item.text }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </template>
    </v-row>
  </v-container>
</template>
