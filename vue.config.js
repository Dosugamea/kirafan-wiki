module.exports = {
  transpileDependencies: ["vuetify"],
  outputDir: "docs",
  publicPath: "./",

  pluginOptions: {
    i18n: {
      locale: "ja",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.compiler = require("vue-template-babel-compiler");
        return options;
      });
  },

  pwa: {
    workboxOptions: {
      skipWaiting: true,
    },
  },
};
