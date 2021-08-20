import { set, get } from 'idb-keyval';
import Vue from 'vue';
import i18n from './i18n';

const settings = {
  _: {
    theme: 7,
    dark: false,
    locale: i18n.locale,

    characterTalentShowLuck: false,
    characterShowMaxStatus: false,
    characterIconFramed: false,
    loadAssetbundle: false,
    questDropsGrouped: false,
    appTitleShowID: false,
    advancedFilter: false,
    enemyAIPattern: false,
    alwaysShowJapanese: false,
    // cleaSettingsEnable: false,
    showCleaOnStart : false,
    showCleaInDetailPage: false,
  },
  save() {
    set('settings', this._);
  }
};

Object.keys(settings._).forEach(key => {
  Object.defineProperty(settings, key, {
    get: function () {
      return this._[key];
    },
    set: function (value) {
      this._[key] = value;
      this.save();
    },
  });
});

async function main() {
  let localSettings = Object.assign({},
    await get('settings') || {},
    window.vue.$route.query || {});
  Object.keys(localSettings).forEach(key => {
    settings._[key] = localSettings[key];
    if (key =='showCleaOnStart') {
      window.vue.$emit('cleaVisibility', settings[key]);
    }
    if (key == 'theme') {
      window.vue.$emit('theme', settings[key]);
    }
    if (key == 'dark') {
      window.vue.$emit('dark', settings[key]);
    }
    if (key == 'locale') {
      window.vue.$i18n.locale = settings[key];
    }
  });
  settings.save();
}

main();

Vue.prototype.$s = settings;
export default settings;
