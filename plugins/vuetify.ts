import "vuetify/styles";

import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: { mdi },
    },

    theme: {
      defaultTheme: "light",
      variations: {
        colors: ["primary", "secondary", "background"],
        lighten: 10,
        darken: 10,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
