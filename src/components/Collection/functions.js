// import { set, get } from 'idb-keyval';
import { set, get } from "@/idb-localforage";

import Vue from 'vue';

const c = {
  current: 0,
  max: 3,
  collections: [
    [],
    [],
    [],
  ],
};

Vue.prototype.$c = {
  set: function (route) {
    let name = route.name;
    let id = route.id || route.params.id;
    let level = route.level || route.query.level;
    let qid = route.qid || route.query.qid;
    let collections = c.collections[c.current];
    for (let i in collections) {
      if (collections[i].name == name && collections[i].id == id) {
        collections.splice(i, 1);
        return;
      }
    }
    let collection = {
      name: name,
      id: id,
    };
    if (level != undefined) {
      collection.level = level;
    }
    if (qid != undefined) {
      collection.qid = qid;
    }
    collections.push(collection);
  },
  get: function (route) {
    let name = route.name;
    let id = route.id || route.params.id;
    let collections = c.collections[c.current];
    for (let i in collections) {
      if (collections[i].name == name && collections[i].id == id) {
        return true;
      }
    }
    return false;
  },
};

async function main() {
  let localCollections = await get('collections') || [];
  localCollections.forEach((collection, i) => collection.forEach(item => c.collections[i].push(item)));
  setInterval(() => {
    set('collections', c.collections);
  }, 5000);
}

main();

export default c;
