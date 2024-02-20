import "vuetify/styles";

import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import {
  mdiAccount,
  mdiArchive,
  mdiArrowULeftTop,
  mdiArrowURightTop,
  mdiChevronDown,
  mdiChevronUp,
  mdiCodeBlockTags,
  mdiCodeTags,
  mdiCommentTextOutline,
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
  mdiLogout,
  mdiMonitorDashboard,
  mdiNote,
  mdiNuxt,
  mdiPaletteAdvanced,
  mdiPencil,
  mdiPlusThick,
  mdiPoll,
  mdiPostOutline,
  mdiSquareMedium,
  mdiThemeLightDark,
  mdiTrashCan,
} from "@mdi/js";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    icons: {
      defaultSet: "mdi",
      aliases: {
        ...aliases,
        nuxt: mdiNuxt,
        dashboard: mdiMonitorDashboard,
        posts: mdiPostOutline,
        comments: mdiCommentTextOutline,
        archive: mdiArchive,
        analytics: mdiPoll,
        appearance: mdiPaletteAdvanced,
        divider: mdiSquareMedium,
        chevronUp: mdiChevronUp,
        chevronDown: mdiChevronDown,
        logout: mdiLogout,
        new: mdiPlusThick,
        user: mdiAccount,
        edit: mdiPencil,
        delete: mdiTrashCan,
        bold: mdiFormatBold,
        italic: mdiFormatItalic,
        code: mdiCodeTags,
        strikethrough: mdiFormatStrikethroughVariant,
        highlight: mdiFormatColorHighlight,
        header1: mdiFormatHeader1,
        header2: mdiFormatHeader2,
        header3: mdiFormatHeader3,
        paragraph: mdiFormatParagraph,
        orderList: mdiFormatListNumbered,
        bulletList: mdiFormatListBulleted,
        codeBlock: mdiCodeBlockTags,
        quote: mdiFormatQuoteOpen,
        textWrap: mdiFormatTextWrappingWrap,
        formatClear: mdiFormatClear,
        redo: mdiArrowURightTop,
        undo: mdiArrowULeftTop,
        note: mdiNote,
        theme: mdiThemeLightDark,
      },
      sets: { mdi },
    },

    theme: {
      defaultTheme: "light",
      variations: {
        colors: ["primary", "secondary", "background"],
        lighten: 4,
        darken: 4,
      },
      themes: {
        light: {
          dark: false,
          colors: {
            "surface-dark": "#0D0E0E",
          },
        },
        dark: {
          dark: true,
          colors: {
            primary: "#2fe5be",
            surface: "#0D0E0E",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
