import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    // list all env variables and expose to application
    // NUXT_<key>

    // The private keys which are only available server-side
    apiSecret: "123",
    // Keys within public are also exposed client-side
    public: {
      apiBase: "/api",
    },
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
