<script setup lang="ts">
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import type { Comment } from "~/interfaces";

const recentComments = defineModel<Comment[]>({ required: true });

const show = ref(true);

const statusColor = (status: string) => {
  return status == "trash"
    ? "red"
    : status == "pending"
    ? "warning"
    : "success";
};

const { formatShortDate } = useFormattedDate();
const format = (datetime: string): string => formatShortDate(datetime);
</script>

<template>
  <v-card class="pa-2">
    <template #prepend>
      <div variant="text">RECENT COMMENTS</div>
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
        <v-list>
          <template
            v-for="(comment, index) in recentComments"
            :key="comment.id">
            <v-divider v-if="index != 0" />
            <v-sheet class="ma-4 mb-8 pl-2 comment">
              <v-row
                no-gutters
                style="
                  max-height: 50px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                ">
                {{ comment.text }}
              </v-row>
              <v-row class="d-flex align-center">
                <v-col cols="8">
                  <div
                    class="font-weight-thin"
                    style="
                      max-height: 50px;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    ">
                    {{ comment.author.name }} on
                    <em>{{ comment.post.title }}</em>
                  </div>
                  <div class="text-caption">
                    {{ format(comment.created as string) }}
                  </div>
                </v-col>
                <v-spacer />
                <v-col>
                  <v-chip
                    class="mr-2"
                    variant="flat"
                    :text="comment.status"
                    :color="statusColor(comment.status)" />
                </v-col>
              </v-row>
            </v-sheet>
          </template>
        </v-list>
        <v-card-item class="justify-end">
          <nuxt-link to="/comments">all comments...</nuxt-link>
        </v-card-item>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped lang="scss">
.comment {
  border-left: 2px solid;
  &:hover {
    border-left: 2px solid rgba(var(--v-theme-primary));
    color: rgba(var(--v-theme-primary));
    cursor: pointer;
  }
}
</style>
