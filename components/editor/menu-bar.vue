<script setup lang="ts">
import ExtendedEditor from "~/utils/tiptapEditor";

const props = defineProps<{ editor: ExtendedEditor }>();

const items = [
  {
    icon: "$bold",
    title: "Bold",
    action: () => props.editor.chain().focus().toggleBold().run(),
    isActive: () => props.editor.isActive("bold"),
  },
  {
    icon: "$italic",
    title: "Italic",
    action: () => props.editor.chain().focus().toggleItalic().run(),
    isActive: () => props.editor.isActive("italic"),
  },
  {
    icon: "$strikethrough",
    title: "Strike",
    action: () => props.editor.chain().focus().toggleStrike().run(),
    isActive: () => props.editor.isActive("strike"),
  },
  {
    icon: "$code",
    title: "Code",
    action: () => props.editor.chain().focus().toggleCode().run(),
    isActive: () => props.editor.isActive("code"),
  },
  {
    icon: "$highlight",
    title: "Highlight",
    action: () => props.editor.chain().focus().toggleHighlight().run(),
    isActive: () => props.editor.isActive("highlight"),
  },
  {
    type: "divider",
  },
  {
    icon: "$header1",
    title: "Heading 1",
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => props.editor.isActive("heading", { level: 1 }),
  },
  {
    icon: "$header2",
    title: "Heading 2",
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => props.editor.isActive("heading", { level: 2 }),
  },
  {
    icon: "$header3",
    title: "Heading 3",
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => props.editor.isActive("heading", { level: 3 }),
  },
  {
    icon: "$paragraph",
    title: "Paragraph",
    action: () => props.editor.chain().focus().setParagraph().run(),
    isActive: () => props.editor.isActive("paragraph"),
  },
  {
    type: "divider",
  },
  {
    icon: "$bulletList",
    title: "Bullet List",
    action: () => props.editor.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor.isActive("bulletList"),
  },
  {
    icon: "$orderList",
    title: "Ordered List",
    action: () => props.editor.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor.isActive("orderedList"),
  },
  {
    icon: "$codeBlock",
    title: "Code Block",
    action: () => props.editor.chain().focus().toggleCodeBlock().run(),
    isActive: () => props.editor.isActive("codeBlock"),
  },
  {
    type: "divider",
  },
  {
    icon: "$quote",
    title: "Blockquote",
    action: () => props.editor.chain().focus().toggleBlockquote().run(),
    isActive: () => props.editor.isActive("blockquote"),
  },
  {
    icon: "$textWrap",
    title: "Hard Break",
    action: () => props.editor.chain().focus().setHardBreak().run(),
    isActive: () => false,
  },
  {
    icon: "$formatClear",
    title: "Clear Format",
    action: () =>
      props.editor.chain().focus().clearNodes().unsetAllMarks().run(),
    isActive: () => false,
  },
  {
    icon: "$undo",
    title: "Undo",
    action: () => props.editor.chain().focus().undo().run(),
    isActive: () => false,
  },
  {
    icon: "$redo",
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
