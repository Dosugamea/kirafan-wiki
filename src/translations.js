// import { set, get } from 'idb-keyval';
import { set, get } from '@/idb-localforage';

import axios from 'axios';
import i18n from '@/i18n';
import Vue from 'vue';

const translationHost = 'https://trans.kirafan.cn';

const languages = ['zh', 'en', 'ko'];

const translations = {};

async function fetch(version) {
  await axios
    .all(languages.map(language =>
      axios.get(`${translationHost}/${language}.json?t=${new Date().getTime()}`)))
    .then(axios.spread(function () {
      languages.forEach((language, i) => {
        const data = arguments[i].data;
        translations[language] = data;
      });
    }));
  let date = new Date().toJSON();
  translations.version = version;
  translations.date = date;
  await set('translationVersion', version);
  await set('translations', translations);
  await set('translationDate', date);
}

async function load() {
  let localVersion = await get('translationVersion');
  let localTranslations = await get('translations');
  if (localVersion && localTranslations) {
    Object.keys(localTranslations).forEach(name => {
      translations[name] = localTranslations[name];
    });
    translations.version = localVersion;
    translations.date = await get('translationDate');
  }
  return localVersion;
}

async function main() {
  let localVersion = await load();
  let version = await axios.get(`${translationHost}/version?t=${new Date().getTime()}`);
  if (localVersion != version.data) {
    await fetch(version.data);
  }
}

main();


Vue.prototype.$name = function (name, noJapanese) {
  if (i18n.locale == 'ja') {
    return name;
  }
  let groups = /★5(.*)専用(.*)/.exec(name);
  if (groups && groups[1] && groups[2]) {
    return this.$t('Star 5 Special Weapon').format(this.$name(groups[1]), this.$name(groups[2]));
  }

  let trans = translations[i18n.locale] && translations[i18n.locale][name];
  if (!trans) {
    return name;
  }
  if (this.$s.alwaysShowJapanese && !noJapanese && trans != name) {
    return `${trans} / ${name}`;
  } else {
    return trans;
  }
};

export default translations;
