import database from "@/database";

// 何でこんな仕様になっているのか…
let _friendshipBuff = {};
const friendshipBuff = new Proxy(_friendshipBuff, {
  get(target, phrase) {
    if (Object.keys(target).length === 0) {
      _friendshipBuff = (() => {
        let db = [];
        Object.keys(database.NamedFriendshipExpArray[0]).forEach((key) => {
          let val = key.match(/^m_Correct/);
          if (val) {
            db[key.replace(/^m_Correct/, "")] = [0];
          }
        });
        database.NamedFriendshipExpArray.forEach((item) => {
          Object.keys(item).forEach((key) => {
            let val = key.match(/^m_Correct/);
            if (val) {
              db[key.replace(/^m_Correct/, "")].push(item[key]);
            }
          });
        });
        let output = {};
        Object.keys(db).forEach((key) => {
          output[key] = (friendship) => db[key][friendship];
        });
        return output;
      })();
    }
    return _friendshipBuff[phrase];
  },
});
//  {
//   HP: (x) =>[0, 1, 2, 5, 8, 10][x],
//   ATK: [0, 1, 2, 5, 8, 10],
//   MAT: [0, 1, 2, 5, 8, 10],
//   DEF: [0, 1, 2, 5, 8, 10],
//   MDF: [0, 1, 2, 5, 8, 10],
//   SPD: [0, 1, 2, 2, 4, 4, 6],
//   LUk: [0, 1, 1, 1, 1, 1],
// };

const titleFacilityBuff = {
  Hp: (x) => x,
  Atk: (x) => x,
  Mgc: (x) => x,
  Def: (x) => x,
  MDef: (x) => x,
  Spd: (x) => x,
};

const classFacilityBuff = [
  {
    Hp: (x) => x && 1 + 0.2 * x,
    Atk: (x) => x && 1 + 0.3 * x,
    Def: (x) => x && 0.85 + 0.15 * x,
  },
  {
    Hp: (x) => x && 1 + 0.2 * x,
    Mgc: (x) => x && 1 + 0.3 * x,
    MDef: (x) => x && 0.85 + 0.15 * x,
  },
  {
    Hp: (x) => x && 1 + 0.2 * x,
    Mgc: (x) => x && 1 + 0.3 * x,
    MDef: (x) => x && 0.85 + 0.15 * x,
  },
  {
    Hp: (x) => x && 1 + 0.2 * x,
    Def: (x) => x && 1 + 0.3 * x,
    MDef: (x) => x && 0.85 + 0.15 * x,
  },
  {
    Hp: (x) => x && 1 + 0.2 * x,
    Mgc: (x) => x && 0.85 + 0.15 * x,
    Spd: (x) => x && 1 + 0.3 * x,
  },
];

const orbBuff = {
  Hp: (x) => x,
  Atk: (x) => x,
  Mgc: (x) => x,
  Def: (x) => x,
  MDef: (x) => x,
  Spd: () => 0,
  Luck: () => 0,
};

function status(
  characterID,
  level,
  arousal,
  friendship,
  titleFacility,
  classFacilities,
  orb
) {
  const character = database.CharacterList[characterID];
  const arousalLevel =
    database.ArousalLevels.filter(
      (item) => item.m_Rare == character.m_Rare && item.m_Lv == arousal
    )[0] || {};
  const status = {};
  const keys = ["Hp", "Atk", "Mgc", "Def", "MDef", "Spd", "Luck"];
  for (let key of keys) {
    status[key] = Math.ceil(
      Math.fround(
        character[`m_Init${key}`] *
          database.CharacterParamGrowthList[level][`m_Growth${key}`][
            character.m_GrowthTableID
          ]
      )
    );
    status[key] = Math.ceil(
      Math.fround(status[key] * (1 + 0.01 * friendshipBuff[key](friendship)))
    );
    let buff = 0;
    buff +=
      titleFacilityBuff[key] != undefined &&
      titleFacilityBuff[key](titleFacility);
    buff +=
      classFacilityBuff[character.m_Class][key] != undefined &&
      classFacilityBuff[character.m_Class][key](classFacilities[0]) +
        classFacilityBuff[character.m_Class][key](classFacilities[1]) +
        classFacilityBuff[character.m_Class][key](classFacilities[2]);
    status[key] = Math.ceil(Math.fround(status[key] * (1 + 0.01 * buff)));
    status[key] = Math.ceil(
      Math.fround(status[key] * (1 + 0.01 * orbBuff[key](orb)))
    );
    status[key] += arousalLevel[`m_${key}`] || 0;
  }
  return {
    HP: status.Hp,
    ATK: status.Atk,
    MAT: status.Mgc,
    DEF: status.Def,
    MDF: status.MDef,
    SPD: status.Spd,
    LUK: status.Luck,
  };
}

export default {
  friendshipBuff,
  titleFacilityBuff,
  classFacilityBuff,
  status,
};
