<script setup lang="ts">
import type { Post } from "~/interfaces/post";

const show = ref(true);

const { data } = await useFetch("/api/activity");
const { recentlyPublished, recentComments } = data.value as {
  recentlyPublished: Post[];
  recentComments: any[];
};

const { formatDate } = useFormattedDate();
const format = (datetime: string): string => formatDate(datetime);
</script>

<template>
  <v-card class="pa-2">
    <template #prepend>
      <div variant="text">ACTIVITY</div>
    </template>
    <template #append>
      <v-card-actions>
        <v-btn
          :icon="show ? '$chevronUp' : '$chevronDown'"
          @click="show = !show"></v-btn>
      </v-card-actions>
    </template>
    <v-expand-transition>
      <div v-show="show">
        <v-list
          :items="recentlyPublished"
          item-props
          lines="two">
          <template #subtitle="{ item }">
            <span>{{ format(item.published as string) }}</span>
          </template>
          <template #append="{ item }">
            <v-btn
              append-icon="$comments"
              variant="plain"
              :text="item.comments?.toString()" />
          </template>
        </v-list>
        <v-card-item class="justify-end">
          <nuxt-link to="/comments">all posts...</nuxt-link>
        </v-card-item>
        <v-divider />
        <v-list
          :items="recentComments"
          item-props>
          <template #item="{ props }">
            <v-sheet class="ma-4 mb-8 pl-2 comment">
              {{ props.content }}
              <v-row>
                <v-col cols="8">
                  <div class="font-weight-thin">
                    {{ props.user }} on <em>{{ props.post?.title }}</em>
                  </div>
                  <div class="text-caption">
                    {{ format(props.created as string) }}
                  </div>
                </v-col>
                <v-spacer />
                <v-col>
                  <v-chip>{{ props.status }}</v-chip>
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

<style lang="scss">
.comment {
  border-left: 2px solid rgba(var(--v-theme-primary));

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
