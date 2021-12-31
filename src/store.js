import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Vue アプリの状態管理 まだ何も使っていません
export default new Vuex.Store({
  state: {
    message: 'Hello Vuex',
    $db: {},
  },
  //   mutations: {},
  actions: {},
  mutations: {
    setdb: function(state, name, db) {
      state.$db[name] = db;
    },
  },
});
