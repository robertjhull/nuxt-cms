<script setup lang="ts">
import { mdiCheck, mdiChevronDown, mdiChevronUp, mdiTrashCan } from "@mdi/js";
import type { Comment } from "~/interfaces";

useHead({ title: "Comments" });

const { data: comments, pending } = useAsyncData<Comment[]>(
  "comments-data",
  () => {
    return $fetch("/api/comment");
  }
);

const tags = ["All", "Pending", "Approved", "Trash"];
const selection = ref();

const filteredComments = computed(() => {
  const filter = tags[selection.value];

  if (!filter || filter == "All") {
    return comments.value;
  }

  return comments.value?.filter((c) => c.status == filter.toLowerCase());
});

const statusColor = (status: string) => {
  return status == "trash"
    ? "red"
    : status == "pending"
    ? "warning"
    : "success";
};

const headers = [
  { key: "status", title: "Status" },
  { key: "text", sortable: false, title: "Comment" },
  { key: "postTitle", title: "Post" },
  { key: "author.name", title: "Author" },
  { key: "created", title: "Date" },
  {},
];

const { formatShortDate } = useFormattedDate();
const datePosted = (datetime: string): string => formatShortDate(datetime);

const updateComment = async (
  comment: Comment,
  status: "approved" | "pending" | "trash"
) => {
  const success = await $fetch("/api/comment", {
    method: "patch",
    body: { commentId: comment._id, status: status },
  });

  if (success) {
    comment.status = status;
  }
};

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
        <client-only>
          <v-data-table
            v-if="filteredComments"
            class="pa-2"
            :loading="pending"
            :headers="headers"
            :items="filteredComments">
            <template #item="{ item }">
              <tr>
                <td>
                  <v-chip
                    class="mr-2"
                    variant="flat"
                    :text="item.status"
                    :color="statusColor(item.status)" />
                </td>
                <td
                  style="
                    max-width: 600px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  ">
                  {{ item.text }}
                </td>
                <td
                  style="
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  ">
                  <strong>{{ item.postTitle }}</strong>
                </td>
                <td>
                  {{ item.authorName }}
                </td>
                <td>
                  <span style="font-size: 0.75rem">{{
                    datePosted(item.created)
                  }}</span>
                </td>
                <td class="d-flex justify-end">
                  <v-btn
                    v-if="item.status == 'pending'"
                    color="success"
                    variant="plain"
                    :icon="mdiCheck"
                    @click="updateComment(item, 'approved')" />
                  <v-btn
                    v-if="item.status != 'trash'"
                    variant="plain"
                    color="error"
                    :icon="mdiTrashCan"
                    @click="updateComment(item, 'trash')" />
                  <v-btn
                    variant="plain"
                    :icon="item.expanded ? mdiChevronUp : mdiChevronDown"
                    @click="item.expanded = !item.expanded" />
                </td>
              </tr>
              <tr v-if="item.expanded">
                <td :colspan="12">
                  <v-row>
                    <v-spacer />
                    <v-col
                      cols="6"
                      class="pl-8 my-2"
                      >{{ item.text }}</v-col
                    >
                    <v-col cols="5"></v-col>
                  </v-row>
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
