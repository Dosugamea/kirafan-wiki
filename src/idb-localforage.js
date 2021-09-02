import localforage from 'localforage';
localforage.config({
  storeName: 'keyval',
  name: 'keyval-store',
});
const set = localforage.setItem;
const get = localforage.getItem;

export { set, get };