import CharacterCount from "@tiptap/extension-character-count";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { Editor } from "@tiptap/vue-3";
import type { Post } from "~/interfaces";

export default class ExtendedEditor extends Editor {
  id: string;
  title: Ref<string>;
  subtitle: Ref<string>;
  loading: boolean = false;
  errors: string[] = [];
  success: boolean = false;
  store: ReturnType<typeof usePostsStore>;

  constructor(piniaStore: ReturnType<typeof usePostsStore>, post?: Post) {
    super({
      content: post?.content || "<p>Start typing here...</p>",
      extensions: [
        StarterKit,
        Highlight,
        Image,
        TextStyle,
        Color,
        CharacterCount,
      ],
    });

    this.store = piniaStore;

    post ??= this.newDraft();

    this.id = post._id;
    this.title = ref(post.title);
    this.subtitle = ref(post.subtitle);
  }

  newDraft(): Post {
    return {
      _id: this.store.getDraftId(),
      title: "",
      subtitle: "",
      content: "",
      authorName: "Demo User",
      comments: [],
      created: new Date().toDateString(),
      status: "draft",
    };
  }

  async saveDraft(): Promise<string> {
    this.loading = true;
    this.success = false;
    this.errors = [];

    const newDraft = {
      _id: this.id,
      title: this.title.value,
      subtitle: this.subtitle.value,
      content: this.getHTML(),
      authorName: "Demo User",
      status: "draft",
      created: new Date().toDateString(),
    } as Post;

    this.store.addPost(newDraft);

    this.loading = false;
    this.success = true;
    return newDraft._id;
  }

  async preview(): Promise<void> {
    const draftId = await this.saveDraft();
    const router = useRouter();
    router.push(`/preview/${draftId}`);
  }
}
