// import { set, get } from "idb-keyval";
import { set, get } from '@/idb-localforage';
import axios from 'axios';
import Vue from 'vue';

const databaseHost = 'https://database.kirafan.cn/database';

const requiredDatabases = [
  { name: 'AbilitySpheres', key: 'm_ID' },
  { name: 'AchievementList', key: 'id' },
  {
    name: 'ADVCharacterList',
    key: 'm_ADVCharaID',
    uri: '../advdatabase/ADVCharacterList',
  },
  { name: 'ADVLibraryList', key: 'm_LibraryListID' },
  { name: 'ADVList', key: 'm_AdvID' },
  // { name: "assetBundle", uri: "../assetBundle" },

  { name: 'ArousalLevels' },
  { name: 'BattleStatusRatioByHp', key: 'm_ID' },
  { name: 'BattleRandomStatusChange', key: 'm_ID' },
  { name: 'BattleAIDataList', key: 'm_ID' },
  { name: 'CharacterExp' },
  { name: 'CharacterFlavorText', key: 'm_CharaID' },
  { name: 'CharacterList', key: 'm_CharaID' },
  { name: 'CharacterParamGrowthList', key: 'm_Lv' },
  { name: 'CRIFileVersion', key: 'm_FileName' },
  { name: 'EventQuestDropExt' },
  { name: 'Events', key: 'm_EventType' },
  { name: 'Flavors', key: 'm_Id' },
  { name: 'ItemList', key: 'm_ID' },
  { name: 'MasterRank', key: 'm_Rank' },
  { name: 'MasterOrbList', key: 'm_ID' },
  { name: 'NamedList', key: 'm_NamedType' },
  { name: 'NamedFriendshipExp', key: 'm_Lv' },
  { name: 'OriginalCharaLibraryList', key: 'm_ID' },
  { name: 'PassiveSkillList_ABL', key: 'm_ID' },
  { name: 'PassiveSkillList_WPN', key: 'm_ID' },
  { name: 'QuestEnemyList', key: 'm_ID' },
  { name: 'QuestLibraryList', key: 'id' },
  { name: 'QuestList', key: 'questID' },
  { name: 'QuestWaveList', key: 'm_ID' },
  { name: 'QuestWaveRandomList', key: 'm_ID' },
  { name: 'RoomObjectList', key: 'm_DBAccessID' },
  { name: 'ScheduleName', key: 'm_ID', uri: '../flddb/ScheduleName' },
  {
    name: 'ScheduleNameReplace',
    key: 'm_CharaID',
    uri: '../flddb/ScheduleNameReplace',
  },
  { name: 'SkillContentList_CARD', key: 'm_ID' },
  { name: 'SkillContentList_EN', key: 'm_ID' },
  { name: 'SkillContentList_MST', key: 'm_ID' },
  { name: 'SkillContentList_PL', key: 'm_ID' },
  { name: 'SkillContentList_WPN', key: 'm_ID' },
  { name: 'SkillExp' },
  { name: 'SkillList_CARD', key: 'm_ID' },
  { name: 'SkillList_EN', key: 'm_ID' },
  { name: 'SkillList_MST', key: 'm_ID' },
  { name: 'SkillList_PL', key: 'm_ID' },
  { name: 'SkillList_WPN', key: 'm_ID' },
  { name: 'SkillLvCoef', key: 'm_LvRangeMin' },
  { name: 'TitleList', key: 'm_TitleType' },
  { name: 'TogetherChargeDefine' },
  { name: 'TownObjectList', key: 'm_ID' },
  { name: 'TweetList' },
  { name: 'WeaponEvolutionList', key: 'm_SrcWeaponID' },
  { name: 'WeaponExp' },
  { name: 'WeaponList', key: 'm_ID' },
  { name: 'WeaponRecipeList', key: 'm_WeaponID' },
];

const database = {};
// const progresses = {};
let loaded = 0;

// async function rm_database() {
//   await set("databaseVersion", null);
//   await set("database", null);
//   await set("databaseDate", null);
// }

async function fetch(version) {
  await axios.all(
    requiredDatabases.map((requiredDatabase) =>
      axios
        .get(
          `${databaseHost}/${requiredDatabase.uri ||
            requiredDatabase.name}.json?t=${new Date().getTime()}`
        )
        .then((data) => {
          loaded += 1;
          window.vue.$emit('databaseLoading', {
            loaded: loaded,
            total: requiredDatabases.length,
          });
          // console.log('data :>> ', data);

          return data;
        })
        .then((data) => {
          // (requiredDatabase) => {
          // const data = data;
          data = data.data;
          if (requiredDatabase.key) {
            database[requiredDatabase.name] = {};
            for (let j in data) {
              database[requiredDatabase.name][data[j][requiredDatabase.key]] =
                data[j];
            }

            window.vue.$store.commit('setdb', [
              requiredDatabase.name,
              database[requiredDatabase.name],
            ]);

            // database[`${requiredDatabase.name}Array`] = data;
            setdb(`${requiredDatabase.name}Array`, data);
          } else {
            setdb(requiredDatabase.name, data);
            // database[requiredDatabase.name] = data;

            // window.vue.$store.commit("setdb",requiredDatabase.name,data);
          }
          // };
        })
    )
  );
  // .then(
  //   axios.spread(function() {
  //     requiredDatabases.forEach(

  //     );
  //   })
  // );
  try {
    let date = Vue.prototype.$time.toJSON();
    database.version = version;
    database.date = date;
    await set('databaseVersion', version);
    await set('database', database);
    await set('databaseDate', date);
  } catch (e) {
    // eslint-disable-next-line
  }
}

function setdb(name, val) {
  database[name] = val;
  window.vue.$store.commit('setdb', [name, val]);
}

async function load() {
  try {
    let localVersion = await get_version();
    // if (!localVersion) {
    //   return localVersion;
    // }
    let localDatabase = await get('database');
    if (localDatabase) {
      Object.keys(localDatabase).forEach((name) => {
        // database[name] = localDatabase[name];
        // window.vue.$store.state.setdb(name, localDatabase[name]);

        setdb(name, localDatabase[name]);

        let requiredDatabase = requiredDatabases.find(
          (requiredDatabase) => requiredDatabase.name == name
        );
        if (requiredDatabase) {
          requiredDatabase.ok = true;
        }
      });
      // XXX_QuestLibrary();

      // database.version = localVersion;
      // database.date = await get('databaseDate');

      setdb('version', localVersion);
      setdb('date', await get('databaseDate'));

      // window.vue.$emit("databaseLoaded");
    } else {
      throw new Error('no local database');
    }

    if (
      !requiredDatabases
        .map((requiredDatabase) => requiredDatabase.ok || false)
        .reduce((x, y) => x && y)
    ) {
      return true;
    }
    return localVersion;
  } catch (e) {
    // eslint-disable-next-line
    console.log("Error occurs when accessing indexedDB: " + e);
  }
}

async function get_version() {
  return await get('databaseVersion');
}

async function main() {
  let settings = await get('settings');
  if (settings ? settings['loadAssetbundle'] : false) {
    // if (!(await get('database'))['assetBundle']) {
    // localVersion = 'undefined';
    // }
    requiredDatabases.unshift({ name: 'assetBundle', uri: '../assetBundle' });
  }
  // else {
  //   (async () => {
  //     const db = await get("database");
  //     if (db["assetBundle"]) {
  //       delete db["assetBundle"];
  //       set("database", db);
  //     }
  //   })();
  // }

  // get server time
  // await axios
  //   .head(`${window.location.origin}/?t=${new Date().getTime()}`, {
  //     headers: {
  //       'Cache-Control': 'no-cache',
  //     },
  //   })
  //   .then((response) => {
  //     Vue.prototype.$time = new Date(response.headers.date);
  //   })
  //   .catch(() => {});
  Vue.prototype.$time = new Date();

  let localVersion = await get_version();
  let version = await axios
    .get('https://database.kirafan.cn/version')
    .catch(() => ({ data: localVersion }));

  // XXX_QuestLibrary();

  if (localVersion != version.data) {
    // let isUpdate = localVersion && !(await detectFirefoxPrivate());
    // if (isUpdate) {
    //   window.vue.$emit("databaseUpdating");
    // }
    window.vue.$emit('databaseLoaded');

    await fetch(version.data);

    window.vue.$emit('allLoaded');

    // if (isUpdate) {
    //   window.vue.$emit("databaseUpdated");
    // } else {
    // XXX_QuestLibrary();
    // }/
  } else {
    await load();
    window.vue.$emit('databaseLoaded');
    window.vue.$emit('allLoaded');
  }
}

// https://gist.github.com/jherax/a81c8c132d09cc354a0e2cb911841ff1
// function detectFirefoxPrivate() {
//   return new Promise(function detect(resolve) {
//     const isMozillaFirefox = "MozAppearance" in document.documentElement.style;
//     if (isMozillaFirefox) {
//       if (indexedDB == null) resolve(true);
//       else {
//         const db = indexedDB.open("inPrivate");
//         db.onsuccess = function() {
//           resolve(false);
//         };
//         db.onerror = function() {
//           resolve(true);
//         };
//       }
//     }
//     return resolve(false); // ?
//   });
// }

main();

// function XXX_QuestLibrary() {
//   // eslint-disable
//   return;

//   // eslint-disable-next-line no-unreachable
//   const questList = {
//     badge: 'Normal',
//     category: 0,
//     icon:
//       'https://texture-asset.kirafan.cn/advlibraryicon/advlibraryicon_105.png',
//     id: 105,
//     name: '-5章-\nご注文はゲリラですか？',
//     quests: {},
//   };
//   database.QuestListArray.filter((x) =>
//     String(x.questID).startsWith('1205')
//   ).forEach((x) => {
//     questList.quests[x.section] = x.questID;
//   });

//   // eslint-disable-next-line no-unreachable
//   const questList2 = {
//     category: 1,
//     icon: '',
//     id: 1113,
//     name: '4周年カウントダウンクエスト！',
//     quests: {},
//   };
//   database.QuestListArray.filter((x) =>
//     String(x.questID).startsWith('2049')
//   ).forEach((x) => {
//     questList2.quests[x.section] = x.questID;
//   });

//   // eslint-disable-next-line no-unreachable
//   const db = [
//     questList,
//     // , questList2
//   ];
//   // eslint-disable-next-line no-unreachable
//   database.QuestLibraryListArray.push(...db);
//   // eslint-disable-next-line no-unreachable
//   db.forEach((x) => {
//     database.QuestLibraryList[x.id] = x;
//   });
// }

// Vue.prototype.$store.state.$db = database;

export default database;
