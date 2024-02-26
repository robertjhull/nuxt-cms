<script setup lang="ts">
import {
  mdiArrowULeftTop,
  mdiArrowURightTop,
  mdiCodeBlockTags,
  mdiCodeTags,
  mdiFormatBold,
  mdiFormatClear,
  mdiFormatColorHighlight,
  mdiFormatHeader1,
  mdiFormatHeader2,
  mdiFormatHeader3,
  mdiFormatItalic,
  mdiFormatListBulleted,
  mdiFormatListNumbered,
  mdiFormatParagraph,
  mdiFormatQuoteOpen,
  mdiFormatStrikethroughVariant,
  mdiFormatTextWrappingWrap,
} from "@mdi/js";
import ExtendedEditor from "~/utils/tiptapEditor";

const props = defineProps<{ editor: ExtendedEditor }>();

const items = [
  {
    icon: mdiFormatBold,
    title: "Bold",
    action: () => props.editor.chain().focus().toggleBold().run(),
    isActive: () => props.editor.isActive("bold"),
  },
  {
    icon: mdiFormatItalic,
    title: "Italic",
    action: () => props.editor.chain().focus().toggleItalic().run(),
    isActive: () => props.editor.isActive("italic"),
  },
  {
    icon: mdiFormatStrikethroughVariant,
    title: "Strike",
    action: () => props.editor.chain().focus().toggleStrike().run(),
    isActive: () => props.editor.isActive("strike"),
  },
  {
    icon: mdiCodeTags,
    title: "Code",
    action: () => props.editor.chain().focus().toggleCode().run(),
    isActive: () => props.editor.isActive("code"),
  },
  {
    icon: mdiFormatColorHighlight,
    title: "Highlight",
    action: () => props.editor.chain().focus().toggleHighlight().run(),
    isActive: () => props.editor.isActive("highlight"),
  },
  {
    type: "divider",
  },
  {
    icon: mdiFormatHeader1,
    title: "Heading 1",
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => props.editor.isActive("heading", { level: 1 }),
  },
  {
    icon: mdiFormatHeader2,
    title: "Heading 2",
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => props.editor.isActive("heading", { level: 2 }),
  },
  {
    icon: mdiFormatHeader3,
    title: "Heading 3",
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => props.editor.isActive("heading", { level: 3 }),
  },
  {
    icon: mdiFormatParagraph,
    title: "Paragraph",
    action: () => props.editor.chain().focus().setParagraph().run(),
    isActive: () => props.editor.isActive("paragraph"),
  },
  {
    type: "divider",
  },
  {
    icon: mdiFormatListBulleted,
    title: "Bullet List",
    action: () => props.editor.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor.isActive("bulletList"),
  },
  {
    icon: mdiFormatListNumbered,
    title: "Ordered List",
    action: () => props.editor.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor.isActive("orderedList"),
  },
  {
    icon: mdiCodeBlockTags,
    title: "Code Block",
    action: () => props.editor.chain().focus().toggleCodeBlock().run(),
    isActive: () => props.editor.isActive("codeBlock"),
  },
  {
    type: "divider",
  },
  {
    icon: mdiFormatQuoteOpen,
    title: "Blockquote",
    action: () => props.editor.chain().focus().toggleBlockquote().run(),
    isActive: () => props.editor.isActive("blockquote"),
  },
  {
    icon: mdiFormatTextWrappingWrap,
    title: "Hard Break",
    action: () => props.editor.chain().focus().setHardBreak().run(),
    isActive: () => false,
  },
  {
    icon: mdiFormatClear,
    title: "Clear Format",
    action: () =>
      props.editor.chain().focus().clearNodes().unsetAllMarks().run(),
    isActive: () => false,
  },
  {
    icon: mdiArrowULeftTop,
    title: "Undo",
    action: () => props.editor.chain().focus().undo().run(),
    isActive: () => false,
  },
  {
    icon: mdiArrowURightTop,
    title: "Redo",
    action: () => props.editor.chain().focus().redo().run(),
    isActive: () => false,
  },
];
</script>

<template>
  <template v-for="(item, index) in items">
    <div
      class="divider"
      v-if="item.type === 'divider'"
      :key="`divider${index}`"></div>
    <menu-item
      v-else
      :key="index"
      v-bind="item" />
  </template>
</template>

<style lang="scss">
.divider {
  background-color: rgba(#fff, 0.25);
  height: 50%;
}
</style>
