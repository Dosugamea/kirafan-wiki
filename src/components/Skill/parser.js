import database from '@/database';
import i18n from '@/i18n';
import BigNumber from 'bignumber.js';

function coef(level, index) {
  return database.SkillLvCoef[level].m_Coefs[index] || 1.0;
}

function gcd(a, b) {
  if (a < b) return gcd(b, a);
  if (Math.abs(b) <= 1) return a;
  return gcd(b, a % b);
}

function mergeSign(x, y) {
  if (x == undefined) return undefined;
  if (x == 1 && y == -1) return undefined;
  if (x == -1 && y == 1) return undefined;
  return x || y;
}

const amounts = {
  0: [
    [ // single
      { // skill
        1: 950,
        2: 1280,
        3: 1510,
        4: 1740,
        5: 2910
      },
      { // ttk
        '3-': 2380,
        3: 2800,
        4: 3010,
        5: 4250
      },
    ],
    [ // all
      { // skill
        1: 670,
        2: 900,
        3: 1060,
        4: 1220,
        5: 3000
      },
      { // ttk 
        '3-': 1900,
        3: 2240,
        4: 2410
      },
    ],
  ],
  1: [
    { // single
      1: 27,
      2: 44,
      3: 60,
      4: 75,
    },
    { // all
      1: 16,
      2: 33,
      3: 49,
    },
  ],
  2: [
    { // ATK
      '-3': -20,
      '-2': -15,
      '-1': -10,
      1: 15,
      2: 23,
      3: 30,
      4: 50,
    },
    { // MAT
      '-3': -20,
      '-2': -15,
      '-1': -10,
      1: 15,
      2: 23,
      3: 30,
      4: 50,
    },
    { // DEF
      '-3': -20,
      '-2': -17,
      '-1': -10,
      1: 20,
      2: 29,
      3: 35,
    },
    { // MDF
      '-3': -20,
      '-2': -17,
      '-1': -10,
      1: 20,
      2: 29,
      3: 35,
    },
    { // SPD
      '-3': 1.40,
      '-2': 1.30,
      '-1': 1.18,
      1: 0.85,
      2: 0.70,
      3: 0.62,
      4: 0.56,
    },
    { // LUK
      '-3': -20,
      '-2': -10,
      '-1': -5,
      1: 50,
      2: 110,
      3: 200,
    },
  ],
  4: [
    { // single
      1: 40,
      2: 70,
      3: 90,
      4: 110,
    },
    { // all
      1: 30,
      2: 50,
      3: 70,
      4: 130,
    },
  ],
  8: {
    '-3': -30,
    '-2': -20,
    '-1': -10,
    1: 10,
    2: 20,
    3: 30,
  },
  11: {
    1: 35,
    2: 50,
    3: 60,
    4: 90,
  },
  13: {
    1: 33,
    2: 50,
    3: 66,
    4: 134,
  },
  14: {
    '-3': -0.35,
    '-2': -0.25,
    '-1': -0.15,
    1: 0.15,
    2: 0.25,
    3: 0.35,
  },
  15: {
    '-3': -0.66,
    '-2': -0.50,
    '-1': -0.33,
    1: 0.33,
    2: 0.50,
    3: 0.66,
  },
  18: {
    '-3': -60,
    '-2': -40,
    '-1': -20,
    1: 20,
    2: 40,
    3: 60,
  },
  26: {
    1: 17,
    2: 33,
    3: 50,
  }
};

function amount(value, ruler, sign) {
  let index = undefined;
  for (let i in ruler) {
    if (index == undefined || Math.abs(ruler[i] - value) <= Math.abs(ruler[index] - value)) {
      index = i;
    }
  }
  if (sign) {
    return index;
  } else {
    return Math.abs(index) || index;
  }
}

function isTargetAll(target) {
  return target == 2 || target == 4;
}

function parse(id, owner, level, sp) {
  const skill = Object.assign({}, database[`SkillList_${owner}`][id], database[`SkillContentList_${owner}`][id]);
  const contents = [];
  function push(content) {
    if (content && content.constructor == Object) {
      contents[contents.length - 1].push(i18n.t(`Skill Details.${content.type}`).format(content));
    } else {
      contents[contents.length - 1].push(content);
    }
  }

  if (!skill.sap) {
    skill.sap = skill.m_Datas.map((data, i) => ({
      index: i,
    }));
  }

  for (let sap of skill.sap) {
    let data = skill.m_Datas[sap.index];
    if (!data) {
      console.log(`not found `, id, owner, level, sp, sap.index);
      continue;
    }
    let content = {
      type: data.m_Type,
      target: i18n.t(`Skill Targets.${data.m_Target}`),
    };
    contents.push([]);
    switch (data.m_Type) {
      case 0: // Attack
        content.damageType = i18n.t(`Skill Damage Types.${data.m_Args[1]}`);
        content.option = data.m_Args[9] || 0;

        content.sap = sap.option || [100];
        if (content.option == 3) {
          content.sapN = [content.sap[0]];
          content.sapSum = content.sap.reduce((sum, x) => {
            content.sapN.push((100 - sum) * x / 100);
            return 100 - (100 - sum) * (100 - x) / 100;
          }) / 100;
          content.sap = [content.sapN];
        } else {
          content.sapSum = content.sap.reduce((x, y) => (x + y)) / 100;
        }
        content.gcd = content.sap.reduce((x, y) => gcd(x, y));
        content.sap = content.sap.map(x => Math.round(x / content.gcd));

        content.amount = content.option ? 0 : amount(data.m_Args[0], amounts[data.m_Type][isTargetAll(data.m_Target) ? 1 : 0][sp ? 1 : 0]);
        content.amount = i18n.t(`Skill Amounts.${data.m_Type}.${content.amount}`);

        content.power = {};
        if (content.option == 0) {
          content.power.power = Math.floor(content.sapSum * data.m_Args[0] * coef(level, data.m_SkillLvCoef));
        } else if (content.option == 1) {
          content.power.power = Math.floor(content.sapSum * data.m_Args[0] * coef(level, data.m_SkillLvCoef));
          content.power.power2 = Math.floor(content.sapSum * data.m_Args[10] * coef(level, data.m_SkillLvCoef));
        } else if (content.option == 2 || content.option == 3) {
          content.power.power = Math.floor(content.sapSum * data.m_Args[10]).toFixed(1);
        } else if (content.option == 4) {
          content.power.power = Math.floor(content.sapSum * data.m_Args[10]).toFixed(0);
        } else if (content.option == 5) {
          content.power.powerA = Math.floor(content.sapSum * data.m_Args[10] * coef(level, data.m_SkillLvCoef));
          content.power.powerB = Math.floor(content.sapSum * data.m_Args[11] * coef(level, data.m_SkillLvCoef));
          content.power.powerC = Math.floor(content.sapSum * data.m_Args[12] * coef(level, data.m_SkillLvCoef));
        } else if (content.option >= 100) {
          content.power.power = Math.floor(content.sapSum * data.m_Args[0] * coef(level, data.m_SkillLvCoef));
          content.power.power2 = Math.floor(content.sapSum * data.m_Args[10] * coef(level, data.m_SkillLvCoef));
          content.power.abnormal = i18n.t(`Abnormals.${content.option - 100}`);
          content.option = 100;
        }
        content.power = i18n.t(`Skill Powers.0.${content.option}`).format(content.power);
        if (content.sap.length > 1) {
          content.power += i18n.t('comma') + content.sap.join(' : ');
        }
        content.elements = data.m_Args
          .slice(2, 8)
          .map((x, i) => x ? i18n.t(`Elements.${i}`) : null)
          .filter(x => x)
          .join(i18n.t('divider'));
        if (content.elements) {
          content.power = content.elements + i18n.t('Element') + i18n.t('comma') + content.power;
        }
        if (data.m_Args[8]) {
          content.power += i18n.t('comma') + i18n.t('Stun Gauge') + ': ' + data.m_Args[8] + '%';
        }
        break;

      case 1: // Recover
        content.amount = amount(data.m_Args[0], amounts[data.m_Type][isTargetAll(data.m_Target) ? 1 : 0]);
        content.amount = i18n.t(`Skill Amounts.${data.m_Type}.${content.amount}`);
        content.power = Math.floor(new BigNumber(data.m_Args[0]).times(coef(level, data.m_SkillLvCoef)));
        content.power = content.power.toFixed(1) + '%';
        break;

      case 2: // Status Change
        for (let i = 0; i < 6; i++) {
          if (data.m_Args[i + 2] == 0) {
            continue;
          }
          // 2 - 7
          // eslint-disable-next-line no-var
          var mArgs_index = i + 2;
          content = {
            type: data.m_Type,
            target: i18n.t(`Skill Targets.${data.m_Target}`),
            turnType: i18n.t(`Skill Turn Types.${data.m_Args[0]}`),
            turn: data.m_Args[1],
          };
          content.amount = amount(data.m_Args[mArgs_index], amounts[data.m_Type][i]);
          content.amount = i18n.t(`Skill Amounts.${data.m_Type}.${content.amount}`);
          if (i == 4) { // SPD
            content.coef = data.m_SkillLvCoef == 0 ?
              data.m_Args[mArgs_index] < 1 ? 1 : 2 :
              data.m_SkillLvCoef;
            content.power = new BigNumber(data.m_Args[i + 2]).times(coef(level, content.coef));
            content.power = new BigNumber(new BigNumber(1).minus(content.power)).times(100) + '%';
            content.sign = Math.sign(1 - data.m_Args[mArgs_index]);
          }
          else {
            content.power = new BigNumber(data.m_Args[mArgs_index]).times(coef(level, data.m_SkillLvCoef));
            content.power = content.power + '%';
            content.sign = Math.sign(data.m_Args[mArgs_index]);
          }
          content.sign = i18n.t(`Skill Signs.${content.sign}`);
          content.status = i18n.t(`Statuses.${i}`);

          push(content);
        }
        continue;

      case 3: // Status Change Reset
        if (data.m_Args.slice(0, 6).every(x => x)) {
          push({
            type: data.m_Type,
            target: i18n.t(`Skill Targets.${data.m_Target}`),
            status: i18n.t('Statuses.All'),
            sign: i18n.t(`Skill Signs.${{ undefined: 0, 0: -1, 1: 1 }[data.m_Args[6]]}`),
          });
        } else for (let i = 0; i < 6; i++) {
          if (data.m_Args[i]) {
            push({
              type: data.m_Type,
              target: i18n.t(`Skill Targets.${data.m_Target}`),
              status: i18n.t(`Statuses.${i}`),
              sign: i18n.t(`Skill Signs.${{ undefined: 0, 0: -1, 1: 1 }[data.m_Args[6]]}`),
            });
          }
        }
        continue;

      case 4: // Abnormal
        for (let i = 0; i < 8; i++) {
          if (data.m_Args[i]) {
            push({
              type: data.m_Type,
              target: i18n.t(`Skill Targets.${data.m_Target}`),
              power: new BigNumber(data.m_Args[i]) + '%',
              abnormal: i18n.t(`Abnormals.${i}`),
              amount: i18n.t(`Skill Amounts.${data.m_Type}.${amount(data.m_Args[i], amounts[data.m_Type][isTargetAll(data.m_Target) ? 1 : 0])}`),
            });
          }
        }
        continue;

      case 5: // Abnormal Recover
        if (data.m_Args.slice(0, 8).every(x => x)) {
          push({
            type: data.m_Type,
            target: i18n.t(`Skill Targets.${data.m_Target}`),
            abnormal: i18n.t('Abnormals.All'),
          });
        } else for (let i = 0; i < 8; i++) {
          if (data.m_Args[i]) {
            push({
              type: data.m_Type,
              target: i18n.t(`Skill Targets.${data.m_Target}`),
              abnormal: i18n.t(`Abnormals.${i}`),
            });
          }
        }
        continue;

      case 6: // Abnormal Disable
        content.turnType = i18n.t(`Skill Turn Types.${data.m_Args[0]}`);
        content.turn = data.m_Args[1];
        break;

      case 7: // Abnormal Additional Probability
        content.turnType = i18n.t(`Skill Turn Types.${data.m_Args[0]}`);
        content.turn = data.m_Args[1];
        content.power = -data.m_Args[2];
        content.power = new BigNumber(content.power) + '%';
        content.sign = i18n.t(`Skill Signs.${Math.sign(-data.m_Args[2])}`);
        break;

      case 8: // Element Resist
        for (let i = 0; i < 6; i++) {
          if (data.m_Args[i + 2] == 0) {
            continue;
          }
          content = {
            type: data.m_Type,
            target: i18n.t(`Skill Targets.${data.m_Target}`),
            turnType: i18n.t(`Skill Turn Types.${data.m_Args[0]}`),
            turn: data.m_Args[1],
          };
          content.amount = amount(data.m_Args[i + 2], amounts[data.m_Type]);
          content.amount = i18n.t(`Skill Amounts.${data.m_Type}.${content.amount}`);
          content.power = new BigNumber(data.m_Args[i + 2] ).times(coef(level, data.m_SkillLvCoef));
          content.power = content.power + '%';
          content.sign = i18n.t(`Skill Signs.${Math.sign(data.m_Args[i + 2])}`);
          content.element = i18n.t(`Elements.${i}`);
          push(content);
        }
        continue;

      case 9: // Element Change
        content.element = i18n.t(`Elements.${data.m_Args[0]}`);
        break;

      case 10: // Weak Element Bonus
        content.turnType = i18n.t(`Skill Turn Types.${data.m_Args[0]}`);
        content.turn = data.m_Args[1];
        content.power = new BigNumber(data.m_Args[2]) + '%';
        break;

      case 11: // Next Attack Up
        content.damageType = i18n.t(`Skill Damage Types.${data.m_Args[0]}`);
        content.amount = amount(data.m_Args[1], amounts[data.m_Type]);
        content.amount = i18n.t(`Skill Amounts.${data.m_Type}.${content.amount}`);
        content.power = new BigNumber(data.m_Args[1]).times(coef(level, data.m_SkillLvCoef));
        content.power = content.power + '%';
        break;

      case 12: // Next Attack Critical
        break;

      case 13: // Barrier
        content.amount = amount(data.m_Args[0], amounts[data.m_Type]);
        content.amount = i18n.t(`Skill Amounts.${data.m_Type}.${content.amount}`);
        content.power = new BigNumber(data.m_Args[0]).times(coef(level, data.m_SkillLvCoef));
        content.power = content.power + '%';
        content.turn = data.m_Args[1];
        break;

      case 14: // Recast Change
        content.amount = amount(data.m_Args[0], amounts[data.m_Type]);
        content.amount = i18n.t(`Skill Amounts.${data.m_Type}.${content.amount}`);
        content.power = new BigNumber(data.m_Args[0]).times(100);
        content.power = content.power + '%';
        content.verb = i18n.t(`Skill Verbs.${Math.sign(data.m_Args[0])}`);
        break;

      case 15: // Kirara Jump Gauge Change
        content.amount = amount(data.m_Args[0], amounts[data.m_Type]);
        content.amount = i18n.t(`Skill Amounts.${data.m_Type}.${content.amount}`);
        content.power = new BigNumber(data.m_Args[0]).times(100);
        content.power = content.power + '%';
        content.verb = i18n.t(`Skill Verbs.${Math.sign(data.m_Args[0])}`);
        break;

      case 16: // Kirara Jump Gauge Coef
        break;

      case 17: // Order Change
        break;

      case 18: // Hate Change
        content.turnType = i18n.t(`Skill Turn Types.${data.m_Args[0]}`);
        content.turn = data.m_Args[1];
        content.amount = amount(data.m_Args[2], amounts[data.m_Type]);
        content.amount = i18n.t(`Skill Amounts.${data.m_Type}.${content.amount}`);
        content.power = new BigNumber(data.m_Args[2]);
        content.power = content.power + '%';
        content.sign = i18n.t(`Skill Signs.${Math.sign(data.m_Args[2])}`);
        break;

      case 19: // Charge Change
        content.power = data.m_Args[0];
        if (data.m_Args.length >= 2 && data.m_Args[1] !== 100) { 
          content.power += `, m_Args[1] : ${data.m_Args[1]}`;
        }
        content.verb = i18n.t(`Skill Verbs.${Math.sign(data.m_Args[0])}`);
        break;

      case 20: // Chain Coef Change
        break;

      case 21: // Card
        content.turn = data.m_Args[0];
        content.extra = parse(data.m_Args[1], 'CARD', level).join(i18n.t('comma'));
        break;

      case 22: // Stun Recover
        break;

      case 23: // Regene
        content.turn = data.m_Args[0];
        content.power = Math.floor(new BigNumber(data.m_Args[1]).times(coef(level, data.m_SkillLvCoef)));
        content.power = content.power.toFixed(1) + '%';
        break;

      case 24: // No Operation
        contents.pop();
        continue;

      case 25: // Load Factor Reduce
        content.turnType = i18n.t(`Skill Turn Types.${data.m_Args[0]}`);
        content.turn = data.m_Args[1];
        content.power = new BigNumber(data.m_Args[2]).times(coef(level, data.m_SkillLvCoef));
        content.power = content.power + '%';
        break;

      case 26: // Critical Damage Change
        content.turnType = i18n.t(`Skill Turn Types.${data.m_Args[0]}`);
        content.turn = data.m_Args[1];
        content.amount = amount(data.m_Args[2], amounts[data.m_Type]);
        content.amount = i18n.t(`Skill Amounts.${data.m_Type}.${content.amount}`);
        content.power = new BigNumber(data.m_Args[2]).times(coef(level, data.m_SkillLvCoef));
        content.power = content.power + '%';
        content.sign = i18n.t(`Skill Signs.${Math.sign(data.m_Args[2])}`);
        break;

      case 27: // Attack Self
        content.option = data.m_Args[3];
        content.power = {
          power: data.m_Args[0],
        };
        content.power = i18n.t(`Skill Powers.27.${content.option}`).format(content.power);
        break;

      case 28: // Random Status Change
        content.turnType = i18n.t(`Skill Turn Types.${data.m_Args[0]}`);
        content.turn = data.m_Args[1];
        content.args = database.BattleRandomStatusChange[data.m_Args[2]].m_Datas;
        content.sign = content.args
          .map(item => (item.m_Args
            .map((item, i) => item && (i == 4 ? Math.sign(1 - item) : Math.sign(item)))
            .reduce(mergeSign) || 0))
          .reduce(mergeSign) || 0;
        content.sign = i18n.t(`Skill Signs.${content.sign}`);
        push(content);

        content.sum = content.args.map(x => x.m_Prob).reduce((x, y) => (x + y));
        content.args.forEach(item => {
          push(i18n.t('Skill Powers.28.Power').format({
            prob: (item.m_Prob / content.sum * 100).toFixed(1),
            power: item.m_Args.map((x, i) => {
              if (x == 0) {
                return null;
              }
              let content = {};
              content.amount = amount(x, amounts[2][i]);
              content.amount = i18n.t(`Skill Amounts.${2}.${content.amount}`);
              if (i == 4) { // SPD
                content.coef = data.m_SkillLvCoef == 0 ?
                  x < 1 ? 1 : 2 :
                  data.m_SkillLvCoef;
                content.power = new BigNumber(x).times(coef(level, content.coef));
                content.power =
                  new BigNumber(
                    new BigNumber(1).minus(content.power)
                  ).times(100) + "%";
                content.sign = Math.sign(1 - x);
              }
              else {
                content.power = new BigNumber(x).times(coef(level, data.m_SkillLvCoef));
                content.power = content.power + '%';
                content.sign = Math.sign(x);
              }
              content.sign = i18n.t(`Skill Signs.${content.sign}`);
              content.status = i18n.t(`Statuses.${i}`);
              return i18n.t('Skill Powers.28.Status Change').format(content);
            }).filter(x => x).join(i18n.t('divider')),
          }));
        });
        continue;

      case 29: // Kirara Jump Gauge Up On Damage
        content.turnType = i18n.t(`Skill Turn Types.${data.m_Args[0]}`);
        content.turn = data.m_Args[1];
        content.power = new BigNumber(data.m_Args[2]).times(100) + '%';
        break;

      case 30: // Status Change Disable
        content.turnType = i18n.t(`Skill Turn Types.${data.m_Args[0]}`);
        content.turn = data.m_Args[1];
        content.sign = i18n.t(`Skill Signs2.${data.m_Args[2]}`);
        break;

      default:
    }
    push(content);
  }

  if (contents.length == 0) {
    contents.push([i18n.t('Skill Details.24')]);
  }

  if (owner == 'CARD') {
    let load = skill.m_LoadFactors[0] * 100;
    contents.push([`${i18n.t('Load')}: ${load.toFixed(0)}%`]);
  }

  return contents.map(content => content.map(item => item.upper()));
}

export default {
  parse,
  amount, amounts, isTargetAll,
};
