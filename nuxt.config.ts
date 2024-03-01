import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    // list all env variables and expose to application
    // NUXT_<key>

    defaultUserId: "",
    functionsBaseUrl: "",
  },
  features: {
    inlineStyles: true, // or a function to determine inlining
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
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
