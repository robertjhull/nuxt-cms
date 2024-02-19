import "vuetify/styles";

import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import {
  mdiAccount,
  mdiArchive,
  mdiChevronDown,
  mdiChevronUp,
  mdiCog,
  mdiCommentTextOutline,
  mdiLogout,
  mdiMonitorDashboard,
  mdiNuxt,
  mdiPencil,
  mdiPlus,
  mdiPoll,
  mdiPostOutline,
  mdiSquareMedium,
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
        settings: mdiCog,
        divider: mdiSquareMedium,
        chevronUp: mdiChevronUp,
        chevronDown: mdiChevronDown,
        logout: mdiLogout,
        new: mdiPlus,
        user: mdiAccount,
        edit: mdiPencil,
        delete: mdiTrashCan,
      },
      sets: { mdi },
    },

    theme: {
      defaultTheme: "light",
      variations: {
        colors: ["primary", "secondary", "background"],
        lighten: 2,
        darken: 2,
      },
      themes: {
        dark: {
          dark: true,
          colors: {
            primary: "#2fe5be",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
