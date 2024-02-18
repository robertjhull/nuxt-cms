import "vuetify/styles";

import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import {
  mdiArchive,
  mdiChevronDown,
  mdiChevronUp,
  mdiCog,
  mdiCommentTextOutline,
  mdiLogout,
  mdiMonitorDashboard,
  mdiNuxt,
  mdiPoll,
  mdiPostOutline,
  mdiSquareMedium,
} from "@mdi/js";

const customColors = {
  caribbeanCurrent: "#CAD2C5",
  midnightGreen: "#84A98C",
  midnightGreen2: "#52796F",
  midnightGreen3: "#354F52",
  charcoal: "#2F3E46",
  prussianBlue: "#212f45",
  spaceCadet: "#272640",
  darkPurple: "#312244",
  darkPurple2: "#3e1f47",
  palatinate: "#4d194d",
  white: "#FFFFFF",
  light: "#EFEFF0",
};

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
      },
      sets: { mdi },
    },
    theme: {
      defaultTheme: "lightTheme",
      themes: {
        lightTheme: {
          dark: false,
          colors: {
            primary: customColors.charcoal,
            secondary: customColors.prussianBlue,
            accent: customColors.midnightGreen2,
            info: customColors.midnightGreen3,
            success: customColors.charcoal,
            warning: customColors.palatinate,
            error: customColors.spaceCadet,
            anchor: customColors.darkPurple,
            background: customColors.white,
            "background-secondary": customColors.light,
            // You can continue to define other colors
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
