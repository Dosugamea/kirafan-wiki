import Vue from 'vue';

import { isArray, isObject } from 'util';
import processKorean from '@/locales/ko/extra';

import infiniteScroll from 'vue-infinite-scroll';
import Ads from 'vue-google-adsense';
import router from './router';
import i18n from './i18n';
import './registerServiceWorker';

import vuetify from './plugins/vuetify';
import Collection from './components/Collection';
import ItemList from './components/ItemList';
import KeyValue from './components/KeyValue';
import Navigation from './components/Navigation';
import PassiveSkill from './components/PassiveSkill';
import Scroller from './components/Scroller';
import Skill from './components/Skill';
import SkillSelector from './components/SkillSelector';
import PassiveSelector from './components/Selector/PassiveSelector';
import Status from './components/Status';
import Theme from './components/Theme';
import Credit from './components/Credit';
import Voice from './components/Voice';
import CharaIcon from './components/CharaIcon';
import Ad from './components/Ad';
import Clea from './components/Clea';
import WIP from './components/WIP';

import App from './App';
import store from './store';
// import AsyncComputed from "vue-async-computed";


Vue.config.productionTip = false;
Vue.config.errorHandler = (err, vm, info) => {
  window.vue.$errorHasOccured = true;
  console.error(`Captured in Vue.config.errorHandler: ${info}`, err);
};

Vue.prototype.$errorHasOccured = false;


Vue.use(infiniteScroll);
Vue.use(require('vue-script2'));
// Vue.use(AsyncComputed);


Vue.use(Ads.Adsense);
Vue.use(Ads.InFeedAdsense);
Vue.component(Collection.name, Collection);
Vue.component(ItemList.name, ItemList);
Vue.component(KeyValue.name, KeyValue);
Vue.component(Navigation.name, Navigation);
Vue.component(PassiveSkill.name, PassiveSkill);
Vue.component(Scroller.name, Scroller);
Vue.component(Skill.name, Skill);
Vue.component(SkillSelector.name, SkillSelector);
Vue.component(PassiveSelector.name, PassiveSelector);
Vue.component(Status.name, Status);
Vue.component(Theme.name, Theme);
Vue.component(Credit.name, Credit);
Vue.component(Voice.name, Voice);
Vue.component(CharaIcon.name, CharaIcon);
Vue.component(Ad.name, Ad);
Vue.component(Clea.name, Clea);
Vue.component(WIP.name, WIP);

const vue = new Vue({
  vuetify,
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app');

window.vue = vue;



String.prototype.format = function (pattern) {
  if (arguments.length > 1) {
    pattern = arguments;
  }
  let string = this;
  string = string.replace(/\{(_|\^)?([A-Za-z0-9]*)\}/g, function (match, _, key) {
    // console.log('replace', match, key, key2);
    let a = isArray(pattern) || isObject(pattern) ?
      pattern[key] === undefined ? '' : pattern[key] :
      pattern;
    if (_ == '_') {
      return a.toLowerCase();
    }
    return a;
  });
  return processKorean(string);
};

String.prototype.upper = function () {
  let item = this.toString().trim();
  return item[0].toUpperCase() + item.slice(1);
};

import '@/database';
import '@/functions';
import '@/settings';
import '@/translations';
