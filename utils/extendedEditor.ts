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

  constructor(post: Post) {
    super({
      content: post.content || "<p>Start typing here...</p>",
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
    this.title = ref(post.title);
    this.subtitle = ref(post.subtitle);
  }
}
