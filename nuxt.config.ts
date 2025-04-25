// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },

  // include custom elements
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes("-"),
    },
  },

  // client-side rendering
  ssr: false,

  // provetcloud design system
  css: ["@provetcloud/css"],
  alias: {
    '@ds': '@provetcloud/web-components/lib/'
  },

  compatibilityDate: "2025-04-25",
});