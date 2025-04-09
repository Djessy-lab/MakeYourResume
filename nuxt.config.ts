// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@sidebase/nuxt-auth",
    "@nuxt/fonts",
  ],
  auth: {
    originEnvKey: process.env.NODE_ENV === "production"
      ? process.env.PROD_URL
      : "http://localhost:3000",
    baseURL: process.env.NODE_ENV === "production"
      ? `${process.env.PROD_URL}/api/auth`
      : "http://localhost:3000/api/auth",
  },
  runtimeConfig: {
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    authSecret: process.env.AUTH_SECRET,
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      authOrigin: process.env.NODE_ENV === "production"
        ? process.env.PROD_URL
        : "http://localhost:3000",
    },
  },
});
