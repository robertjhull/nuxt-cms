<script setup lang="ts">
import { type Comment } from "~/interfaces/comment";
const comment = defineModel<Comment>({ required: true });
const { formatDate } = useFormattedDate();
const dateCreated = (datetime: string): string => formatDate(datetime);

const notApproved = comment.value.status != "approved";
const trash = comment.value.status == "trash";
const chipColor = trash ? "red" : notApproved ? "warning" : "success";
</script>

<template>
  <v-card class="mx-auto w-100">
    <v-card-text class="pa-4">
      <span class="">{{ comment.content }} {{ comment.content }}</span>
    </v-card-text>
    <v-list-item class="w-100">
      <v-list-item-title class="text-caption">{{
        comment.author.name
      }}</v-list-item-title>
      <v-list-item-subtitle>
        <div class="font-weight-thin text-truncate">
          <span v-if="comment.parentCommentId">Reply to comment on </span>
          <span v-else>Commented on </span>
          <span>"{{ comment.post.title }}"</span>
        </div>
      </v-list-item-subtitle>
    </v-list-item>
    <v-card-actions class="px-3">
      <v-chip
        :class="'bg-' + chipColor"
        :text="comment.status" />
      <v-spacer />
      <v-btn
        v-if="notApproved && !trash"
        text="Approve"
        color="success" />
      <v-btn
        v-if="!trash"
        text="Delete"
        color="error"
        append-icon="$delete" />
    </v-card-actions>
  </v-card>
</template>
