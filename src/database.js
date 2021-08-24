import { set, get } from 'idb-keyval';
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
  { name: 'EventQuestDropExt' },
  { name: 'Events', key: 'm_EventType' },
  { name: 'Flavors', key: 'm_Id' },
  { name: 'ItemList', key: 'm_ID' },
  { name: 'MasterRank', key: 'm_Rank' },
  { name: 'MasterOrbList', key: 'm_ID' },
  { name: 'NamedList', key: 'm_NamedType' },
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

async function fetch(version) {
  await axios
    .all(
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
            return data;
          })
      )
    )
    .then(
      axios.spread(function() {
        requiredDatabases.forEach((requiredDatabase, i) => {
          const data = arguments[i].data;
          if (requiredDatabase.key) {
            database[requiredDatabase.name] = {};
            for (let j in data) {
              database[requiredDatabase.name][data[j][requiredDatabase.key]] =
                data[j];
            }
            database[`${requiredDatabase.name}Array`] = data;
          } else {
            database[requiredDatabase.name] = data;
          }
        });
      })
    );
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

async function load() {
  try {
    let localVersion = await get('databaseVersion');
    if (!localVersion) {
      return localVersion;
    }
    let localDatabase = await get('database');
    if (localDatabase) {
      Object.keys(localDatabase).forEach((name) => {
        database[name] = localDatabase[name];
        let requiredDatabase = requiredDatabases.find(
          (requiredDatabase) => requiredDatabase.name == name
        );
        if (requiredDatabase) {
          requiredDatabase.ok = true;
        }
      });
      database.version = localVersion;
      database.date = await get('databaseDate');
      window.vue.$emit('databaseLoaded');
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

async function main() {
  let localVersion = await load();
  if ((await get('settings'))['loadAssetbundle'] || false) {
    if (!(await get('database'))['assetBundle']) {
      localVersion = 'undefined';
    }
    requiredDatabases.unshift({ name: 'assetBundle', uri: '../assetBundle' });
  } else {
    set(
      'database',
      await (async () => {
        let tmp = await get('database');
        delete tmp['assetBundle'];
        return tmp;
      })()
    );
  }

  // get server time
  await axios
    .head(`${window.location.origin}/?t=${new Date().getTime()}`, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
    .then((response) => {
      Vue.prototype.$time = new Date(response.headers.date);
    })
    .catch(() => {});

  
  let version = await axios.get(
    `${databaseHost}/../version?t=${new Date().getTime()}`
  );

  if (localVersion != version.data) {
    if (localVersion) {
      window.vue.$emit('databaseUpdating');
    }
    await fetch(version.data);
    if (!localVersion) {
      window.vue.$emit('databaseLoaded');
    } else {
      window.vue.$emit('databaseUpdated');
    }
  }
}

main();

Vue.prototype.$db = database;
export default database;
