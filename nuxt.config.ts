import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: false },
  runtimeConfig: {
    // not accessible to client
    defaultUserId: "",
    functionsBaseUrl: "",
    functionsAuthToken: "",
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
