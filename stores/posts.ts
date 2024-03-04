import { defineStore } from "pinia";

import type { Post } from "~/interfaces";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [] as Post[],
  }),
  actions: {
    addPost(post: Post): string {
      const existingIndex = this.posts.findIndex((p) => p._id === post._id);
      if (existingIndex !== -1) {
        this.posts[existingIndex] = post;
      } else {
        this.posts.push(post);
      }
      return post._id;
    },
    createAndSaveDraft(title: string, content: string, subtitle?: string) {
      const draftPost: Post = {
        _id: this.getDraftId(),
        title,
        subtitle: subtitle || "",
        content,
        authorName: "Demo User",
        status: "draft",
        created: new Date().toDateString(),
        comments: [],
      };
      return this.addPost(draftPost);
    },
    getPostById(id: string) {
      return this.posts.find((post) => post._id === id);
    },
    getDraftId() {
      return "draft-" + this.posts.length;
    },
  },
});
