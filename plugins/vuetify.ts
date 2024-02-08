import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const customColors = {
  caribbeanCurrent: "#006466",
  midnightGreen: "#065a60",
  midnightGreen2: "#0b525b",
  midnightGreen3: "#144552",
  charcoal: "#1b3a4b",
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
