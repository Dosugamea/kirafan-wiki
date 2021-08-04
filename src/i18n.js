import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.js$/i);
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

const messages = loadLocaleMessages();

function getLocale() {
  for (let language of navigator.languages) {
    for (let lang in messages) {
      if (language.startsWith(lang)) {
        return lang;
      }
    }
  }
  return 'ja';
}

export default new VueI18n({
  locale: getLocale(),
  fallbackLocale: 'en',
  messages: messages,
  silentTranslationWarn: true,
});
