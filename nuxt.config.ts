// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  typescript: {
    typeCheck: true,
    strict: false
  },
  components: true,
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },

  modules: ['@vee-validate/nuxt', '@pinia/nuxt', '@nuxt/ui'],
  ui: {
    global: true
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
});