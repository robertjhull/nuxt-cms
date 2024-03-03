<script setup lang="ts">
import type { Post } from "~/interfaces";

const { data: posts } = await useFetch("/api/post");

interface SidebarLink {
  type?: "subheader";
  id?: string | undefined;
  title: string;
}

function sidebarLinks(): SidebarLink[] {
  const links: SidebarLink[] = [];
  let prevDate: string | null;

  (posts.value as Post[])?.forEach((post) => {
    if (!post.published) {
      return;
    }

    const createdDate = new Date(post.published).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });

    if (prevDate !== createdDate) {
      links.push({ type: "subheader", title: createdDate });
      prevDate = createdDate;
    }
    links.push({ id: post._id, title: post.title });
  });

  return links;
}
</script>

<template>
  <v-sheet class="d-flex flex-column my-16 sidebar mx-auto">
    <v-list
      dense
      class="bg-transparent">
      <v-list-item
        v-for="link in sidebarLinks()"
        :key="link.title">
        <template
          v-if="link.type == 'subheader'"
          class="text-caption">
          <strong>{{ link.title }}</strong>
        </template>
        <template v-else>
          <v-list-item-title>
            <nuxt-link :to="'/preview/' + link.id">
              {{ link.title }}
            </nuxt-link>
          </v-list-item-title>
        </template>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<style scoped lang="scss">
.sidebar {
  position: sticky;
  top: 0;
  background-color: rgba(var(--v-theme-background), 0.8);
}
</style>
