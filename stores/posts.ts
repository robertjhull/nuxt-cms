import { defineStore } from "pinia";

import type { Post } from "~/interfaces";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [] as Post[],
  }),
  actions: {
    addPost(post: Post) {
      const existingIndex = this.posts.findIndex((p) => p._id === post._id);
      if (existingIndex !== -1) {
        this.posts[existingIndex] = post;
      } else {
        this.posts.push(post);
      }
    },
    getPostById(id: string) {
      return this.posts.find((post) => post._id === id);
    },
  },
});
