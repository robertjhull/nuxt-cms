import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: false },
  telemetry: false,
  runtimeConfig: {
    // not accessible to client
    defaultUserId: process.env.NUXT_PRIVATE_DEFAULT_USER_ID,
    functionsBaseUrl: process.env.NUXT_PRIVATE_FUNCTIONS_BASE_URL,
    functionsAuthToken: process.env.NUXT_PRIVATE_FUNCTIONS_AUTH_TOKEN,
  },
  features: {
    inlineStyles: true,
  },
  future: {
    typescriptBundlerResolution: true,
  },
  components: [
    {
      path: `~/components`,
      pathPrefix: false,
    },
  ],
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins?.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt",
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
