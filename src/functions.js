import Vue from 'vue';
// import axios from 'axios';
// import { lazy_load_array } from './lib';

Vue.prototype.$size = function(base) {
  return (
    {
      xs: 0,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
    }[this.$vuetify.breakpoint.name] + (base || 48)
  );
};

Vue.prototype.$asset = {
  achievement: 'https://asset.kirafan.cn/texture/achievement/achievement_{0}',
  advlibraryicon:
    'https://asset.kirafan.cn/texture/advlibraryicon/advlibraryicon_{0}',
  advscript: 'https://advscript-asset.kirafan.cn/{0}/ADVScriptText_{1}_{2}',
  battleai: 'https://database.kirafan.cn/database/battleai/BattleAIData_{0}',
  battleuiatlas:
    'https://asset.kirafan.cn/uiatlas/battleuiatlas.muast?name={0}',
  characard:
    'https://asset.kirafan.cn/texture/charauiresource/characard/characard_{0}',
  charaicon:
    'https://asset.kirafan.cn/texture/charauiresource/charaicon/charaicon_{0}',
  charaillustchara:
    'https://asset.kirafan.cn/texture/charauiresource/charaillustchara/charaillust_chara_{0}',
  charaillustfull:
    'https://asset.kirafan.cn/texture/charauiresource/charaillustfull/charaillust_full_{0}',
  commonuiatlas:
    'https://asset.kirafan.cn/uiatlas/commonuiatlas.muast?name={0}',
  contentslogo:
    'https://asset.kirafan.cn/texture/contenttitlelogo/contentslogo{0}',
  itemicon: 'https://asset.kirafan.cn/texture/itemicon/itemicon_{0}',
  mergedcharaicon: 'https://mergedcharaicon-asset.kirafan.cn/charaicon_{0}',
  orbicon: 'https://asset.kirafan.cn/texture/orbicon/orbicon_{0}',
  ordericon:
    'https://asset.kirafan.cn/texture/charauiresource/ordericon/en_ordericon_{0}',
  originalcharacterillust:
    'https://asset.kirafan.cn/texture/originalcharacterillust/originalcharacterillust_{0}',
  originalcharactericon:
    'https://asset.kirafan.cn/texture/originalcharactericon/originalcharactericon_{0}',
  roomobjecticon:
    'https://asset.kirafan.cn/texture/roomobjecticon/roomobjecticon_{_0}_{1}',
  /* TODO: index */ standpic: 'https://asset.kirafan.cn/adv/standpic/{0}/{1}',
  townobjecticon:
    'https://asset.kirafan.cn/texture/townobjecticon/townobjecticon_bld_{1}',
  voice: 'https://voice-cri.kirafan.cn/Voice_{0}/{1}',

  weaponicon: 'https://asset.kirafan.cn/texture/weaponicon/weaponicon_wpn_{0}',
};

Vue.prototype.$4 = function(x) {
  switch (Math.floor(Math.log10(x))) {
    case 0:
      return x;
    case 1:
      return x;
    case 2:
      return x;
    case 3:
      return x;
    case 4:
      return (x / 1e3).toFixed(0) + 'K';
    case 5:
      return (x / 1e3).toFixed(0) + 'K';
    case 6:
      return (x / 1e6).toFixed(1) + 'M';
    case 7:
      return (x / 1e6).toFixed(0) + 'M';
    case 8:
      return (x / 1e6).toFixed(0) + 'M';
    case 9:
      return (x / 1e9).toFixed(1) + 'G';
    case 10:
      return (x / 1e9).toFixed(0) + 'G';
    case 11:
      return (x / 1e9).toFixed(0) + 'G';
    default:
      if (x > 1e12) return '∞';
      return x;
  }
};

Vue.prototype.$const = {
  sites: {
    calculator: 'https://calc.kirafan.moe/',
    assets: 'https://asset.kirafan.moe/',
    standpic: 'https://asset.kirafan.moe/#/adv/standpic/{0}',
    cardmaker: 'https://kirafanautodec.github.io/CharaCardCreater/',

    yarudesu: 'http://kirarafan.com/',
    wikiwiki: 'https://wikiwiki.jp/kirarafan/',
    moegirl:
      'https://zh.moegirl.org/%E9%97%AA%E8%80%80%E5%B9%BB%E6%83%B3%E6%9B%B2',
    miraheze: 'https://kirarafantasia.miraheze.org/',
    timer: 'https://icekirby.github.io/kirafan-timer/',

    translations: 'https://gitlab.com/kirafan/translations',
  },
  wikiwiki: {
    _: 'https://wikiwiki.jp/kirarafan/{0}',
    character: 'https://wikiwiki.jp/kirarafan/クリエメイト/{0}',
    quest: 'https://wikiwiki.jp/kirarafan/クエスト/{0}',
  },
};

Vue.prototype.$isMoe = function() {
  return window.location.host == 'wiki.kirafan.moe';
};

Vue.prototype.$isDev = function() {
  return process.env.NODE_ENV !== 'production';
};

Vue.prototype.$showAd = function() {
  return false;
};

Vue.prototype.$ad = function(i) {
  return i && i % 12 == 0;
};

Vue.prototype.$zoom = function() {
  if (document.body.clientWidth <= 320) {
    return 0.8;
  }
  if (
    document.body.clientWidth <= 360 &&
    document.body.clientHeight / document.body.clientWidth < 2
  ) {
    return 0.9;
  }
  return 1.0;
};

Vue.prototype.$questLock = function() {
  return false;
};

Vue.prototype.$version = 'Forked-version-0.0.2 Media 4.1.3';



// const rvh_url = `https://rvh.kirafan.cn/`;
// const rvh_url = 'https://y52en.github.io/test/rvh.txt';
// Vue.prototype.$lazy = lazy_load_array([
//   ['rvh', () => axios.get(rvh_url).then((res) => res.data)],
// ]);


// Vue.prototype.$store.state.$db = {
//   get () => window.vue.$root.$children[0].ddd,
//   set (val) => window.vue.$root.$children[0].ddd = val
// }

Object.defineProperty(Vue.prototype, '$db', {
  get: function () {
    return window.vue.$store.state.$db;
  },
  // set: function (value) {
  //   window.vue.$root.$children[0].db = value;
  // },
});

// Vue.prototype.db = $store.state.$db;