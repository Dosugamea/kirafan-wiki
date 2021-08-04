module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    i18n: {
      locale: 'ja',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    },
  },

  pwa: {
    workboxOptions: {
      skipWaiting: true,
    },
  },
};
