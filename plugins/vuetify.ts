import "vuetify/styles";

import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import {
  mdiNuxt,
  mdiPencilBoxMultipleOutline,
  mdiPostOutline,
  mdiArchive,
  mdiPoll,
  mdiCog,
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
        manage: mdiPencilBoxMultipleOutline,
        posts: mdiPostOutline,
        archive: mdiArchive,
        analytics: mdiPoll,
        settings: mdiCog,
      },
      sets: { mdi },
    },
    theme: {
      defaultTheme: "darkTheme",
      themes: {
        darkTheme: {
          dark: true,
          colors: {
            primary: customColors.caribbeanCurrent,
            secondary: customColors.midnightGreen,
            accent: customColors.midnightGreen2,
            info: customColors.midnightGreen3,
            success: customColors.charcoal,
            warning: customColors.prussianBlue,
            error: customColors.spaceCadet,
            anchor: customColors.darkPurple,
            // You can continue to define other colors
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
