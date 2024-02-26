import CharacterCount from "@tiptap/extension-character-count";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { Editor } from "@tiptap/vue-3";
import type { Draft, Post } from "~/interfaces/post";

export default class ExtendedEditor extends Editor {
  title?: string | null;
  subtitle?: string | null;
  loading: boolean = false;
  error: string[] = [];

  constructor(post: Post | Draft) {
    super({
      content: post.content,
      extensions: [
        StarterKit,
        Highlight,
        Image,
        TextStyle,
        Color,
        CharacterCount,
      ],
    });

    this.title = post.title;
    this.subtitle = post.subtitle;
  }

  valid(): boolean {
    if (!this.title) this.error.push("Title is required!");
    if (!this.subtitle) this.error.push("Subtitle is required!");
    if (this.isEmpty) this.error.push("Content is required!");

    return this.error.length == 0;
  }

  async saveDraft(): Promise<boolean> {
    this.loading = true;
    this.error = [];

    if (!this.valid()) return false;

    const newDraft = {
      title: this.title,
      subtitle: this.subtitle,
      content: this.getHTML(),
    };

    const { data, error } = await useFetch("/api/posts", {
      method: "post",
      body: newDraft,
    });

    if (error.value) {
      this.error.push(error.value.message);
    }

    return data.value as boolean;
  }

  publish() {}
}
