import CharacterCount from "@tiptap/extension-character-count";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { Editor } from "@tiptap/vue-3";
import type { Post } from "~/interfaces";
import { usePostsStore } from "~/stores/posts";

export default class ExtendedEditor extends Editor {
  id?: string | undefined;
  title?: string | null;
  subtitle?: string | null;
  loading: boolean = false;
  error: string[] = [];

  constructor(post: Post | Partial<Post>) {
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

    this.id = post._id;
    this.title = post.title;
    this.subtitle = post.subtitle;
  }

  valid(): boolean {
    if (!this.title) this.error.push("Title is required!");
    if (!this.subtitle) this.error.push("Subtitle is required!");
    if (this.isEmpty) this.error.push("Content is required!");

    return this.error.length == 0;
  }

  async saveDraft(): Promise<string | boolean> {
    this.loading = true;
    this.error = [];

    if (!this.valid()) return false;

    const newDraft = {
      _id: this.id ? this.id : "temp-post-id",
      title: this.title,
      subtitle: this.subtitle,
      content: this.getHTML(),
    } as Post;

    const postsStore = usePostsStore();
    postsStore.addPost(newDraft);

    this.loading = false;
    return newDraft._id;
  }

  async preview(): Promise<void> {
    const draftId = await this.saveDraft();
    const router = useRouter();
    router.push(`/preview/${draftId}`);
  }
}
