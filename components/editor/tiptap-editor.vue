<script setup lang="ts">
import { mdiCheckCircle } from "@mdi/js";
import { EditorContent } from "@tiptap/vue-3";
import { useTheme } from "vuetify";
import type ExtendedEditor from "~/utils/extendedEditor";

const editor = defineModel<ExtendedEditor>("editor", { required: true });
const store = usePostsStore();
const router = useRouter();

const title = computed({
  get: () => editor.value.title?.value,
  set: (value) => {
    editor.value.title.value = value;
  },
});

const subtitle = computed({
  get: () => editor.value.subtitle?.value,
  set: (value) => {
    editor.value.subtitle.value = value;
  },
});

const saving = ref(false);
const success = ref(false);

const preview = () => {
  const draftId = saveDraft();
  router.push(`/preview/${draftId}`);
};

const saveDraft = () => {
  saving.value = true;

  const draftId = store.createAndSaveDraft(
    editor.value.title.value,
    editor.value.getHTML(),
    editor.value.subtitle.value
  );

  saving.value = false;
  success.value = true;

  return draftId;
};

const theme = useTheme();
</script>

<template>
  <v-row
    v-if="editor"
    no-gutters
    class="fill-height">
    <v-sheet class="bg-background-darken-3 w-100">
      <v-row
        no-gutters
        class="fill-height justify-space-between">
        <v-col
          cols="7"
          offset="1">
          <v-sheet
            class="my-12 mx-16 pa-12 editor"
            elevation="10">
            <div class="post-title">{{ title }}</div>
            <div class="post-subtitle">{{ subtitle }}</div>
            <v-divider class="my-10" />
            <editor-content :editor="editor" />
          </v-sheet>
        </v-col>
        <v-col
          cols="3"
          class="pa-4 d-flex flex-column"
          :class="{
            'bg-background-lighten-1': theme.current.value.dark,
            'bg-background-darken-1': !theme.current.value.dark,
          }">
          <div class="d-flex justify-space-between">
            <v-btn
              color="info"
              text="Preview"
              variant="flat"
              class="mx-2"
              @click="preview" />
            <div>
              <div
                v-if="saving"
                class="linear-progress-bar">
                <v-progress-circular
                  size="20"
                  indeterminate />
              </div>
              <v-fade-transition>
                <v-icon
                  v-if="success && !saving"
                  class="mx-2 text-success"
                  :icon="mdiCheckCircle" />
              </v-fade-transition>
              <v-btn
                color="warning"
                text="Save draft"
                variant="flat"
                class="mx-2"
                @click="saveDraft" />
            </div>
          </div>
          <div class="my-5">
            <v-text-field
              v-model="title"
              bg-color="background"
              label="Title"
              variant="solo"
              class="ma-2"
              hide-details />
            <v-text-field
              v-model="subtitle"
              bg-color="background"
              label="Subtitle"
              variant="solo"
              class="mt-6 mx-2"
              hide-details />
          </div>
          <div class="px-2">
            <menu-bar :editor="editor" />
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </v-row>
</template>

<style scoped lang="scss">
.editor {
  min-height: 90vh;
}

.post-title {
  font-size: 2.75em;
  font-weight: 600;
  margin-bottom: 0.15em;
  word-wrap: break-word;
}

.post-subtitle {
  font-size: 1.25em;
  margin-bottom: 0.15em;
}
</style>

<style lang="scss">
.tiptap {
  &:focus-visible,
  &:focus {
    outline: none !important;
  }

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1) !important;
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    border-radius: 0.5rem;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  mark {
    background-color: #faf594;
  }

  img {
    height: auto;
    max-width: 100%;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    border-left: 2px solid rgba(#0d0d0d, 0.1);
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      align-items: center;
      display: flex;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
}
</style>
~/utils/extendedEditor
