<script setup lang="ts">
import type { User } from "~/interfaces/user";

interface DashboardActivityProps {
  user: User;
}

defineProps<DashboardActivityProps>();

const show = ref(true);
</script>

<template>
  <v-card class="pa-2">
    <template #prepend>
      <div
        color="orange-lighten-2"
        variant="text">
        OVERVIEW
      </div>
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
        <v-divider />
        <v-row class="pa-3">
          <v-col>
            <v-icon
              icon="$posts"
              color="secondary"
              class="mx-2" />
            <nuxt-link to="/posts">
              {{ user.posts }} Post{{ user.posts > 1 ? "s" : "" }}
            </nuxt-link>
          </v-col>
          <v-col>
            <v-icon
              icon="$comments"
              color="secondary"
              class="mx-2" />
            <nuxt-link to="/comments">
              <span class="text-secondary"
                >{{ user.comments }} Comment{{
                  user.comments > 1 ? "s" : ""
                }}</span
              >
            </nuxt-link>
          </v-col>
        </v-row>
      </div>
    </v-expand-transition>
  </v-card>
</template>
