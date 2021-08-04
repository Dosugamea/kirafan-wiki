import { set, get } from 'idb-keyval';
import { cleaTalkData } from './cleaTalk';

const DBStoreName = 'cleaMemory';
const DataVersion = '1.0.0';

const FriendShipTable = [300, 2500, 15000, 30000];

function daysBetween(first, second) {
  const one_day_ms = 1000 * 60 * 60 * 24;
  let between_ms = Math.abs(new Date(second) - new Date(first));
  return Math.floor(between_ms / one_day_ms);
}

export const CleaData = {
  _: {
    dataVersion: DataVersion,
    init: true,
    firstMet: new Date().toDateString(),
    dayMetTotal: 0,
    lastMet: new Date().toDateString(),
    lastInteractInMilli: new Date().getTime(),
    // touchedTime : 0, // => headTouchedTime + faceTouchedTime + breastTouchedTime + bodyTouchedTime
    headTouchedTime: 0,
    faceTouchedTime: 0,
    breastTouchedTime: 0,
    bodyTouchedTime: 0,
    experience: 0,
    friendship: 0,
  },

  get talkData() {
    return cleaTalkData;
  },

  get friendshipLevel() {
    if (this.friendship == 0) return 0;
    const absVal = Math.abs(this.friendship);
    let i = 0;
    for (; i < FriendShipTable.length && absVal > FriendShipTable[i]; ++i);
    return Math.sign(this.friendship) * (i + 1);
  },

  get daysBetweenLastMet() {
    if (!this._daysBetweenLastMet) {
      this._daysBetweenLastMet = daysBetween(new Date().toDateString(), CleaData.lastMet);
    }
    return this._daysBetweenLastMet;
  },

  get daysBetweenFirstMet() {
    if (!this._daysBetweenFirstMet) {
      this._daysBetweenFirstMet = daysBetween(new Date().toDateString(), CleaData.firstMet);
    }
    return this._daysBetweenFirstMet;
  },

  async load() {
    let savedData = await get(DBStoreName) || {};
    Object.keys(savedData).forEach(key => {
      CleaData._[key] = savedData[key];
    });
  },

  async save() {
    await set(DBStoreName, this._);
  }
};

Object.keys(CleaData._).forEach(key => {
  Object.defineProperty(CleaData, key, {
    get: function () {
      return this._[key];
    },
    set: function (value) {
      this._[key] = value;
      this.save();
    },
  });
});