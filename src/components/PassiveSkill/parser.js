import database from '@/database';
import skillParser from '@/components/Skill/parser';
import i18n from '@/i18n';

function parse(id, owner) {
  const skill = database[`PassiveSkillList_${owner}`][id];
  const contents = [];
  function push(content) {
    if (content && content.constructor == Object) {
      contents[contents.length - 1].push(i18n.t(`Passive Details.${content.type}`).format(content));
    } else {
      contents[contents.length - 1].push(content);
    }
  }

  for (let data of skill.m_Datas) {
    contents.push([]);
    let content;

    switch (data.m_Trigger) {
      case 0: // On Start
        break;
      case 1: // On Damage
      case 2: // On Killed Enemy
      default:
        content = i18n.t(`Passive Triggers.${data.m_Trigger}`);
        content = `<span class="">${content}</span>`;
        push(content);
    }

    content = {
      type: data.m_Type,
    };

    switch (data.m_Type) {
      case 0: // Status Change
        for (let i = 0; i < 6; i++) {
          if (data.m_Args[i] == 0) {
            continue;
          }
          content = {
            type: data.m_Type,
          };
          content.amount = skillParser.amount(data.m_Args[i], skillParser.amounts[2][i]);
          content.amount = i18n.t(`Skill Amounts.${2}.${content.amount}`);
          if (i == 4) { // SPD
            content.power = ((1 - data.m_Args[i]) * 100).toFixed(1) + '%';
            content.sign = Math.sign(1 - data.m_Args[i]);
          }
          else {
            content.power = data.m_Args[i].toFixed(1) + '%';
            content.sign = Math.sign(data.m_Args[i]);
          }
          content.sign = i18n.t(`Skill Signs.${content.sign}`);
          content.status = i18n.t(`Statuses.${i}`);

          push(content);
        }
        continue;

      case 1: // Hate Change
        content.amount = skillParser.amount(data.m_Args[0], skillParser.amounts[18]);
        content.amount = i18n.t(`Skill Amounts.${18}.${content.amount}`);
        content.power = data.m_Args[0].toFixed(1) + '%';
        content.sign = i18n.t(`Skill Signs.${Math.sign(data.m_Args[0])}`);
        break;

      case 2: // Abnormal Disable
        break;

      case 3: // Stun Disable
        break;

      case 4: // Stun Coef
        content.power = (data.m_Args[0] * 100).toFixed(1) + '%';
        break;

      case 5: // Kirara Jump Gauge Change
        content.power = (data.m_Args[0] * 100).toFixed(0) + '%';
        content.verb = i18n.t(`Skill Verbs.${Math.sign(data.m_Args[0])}`);
        break;

      case 6: // Kirara Jump Gauge Coef
        content.power = (data.m_Args[0] * 100).toFixed(0) + '%';
        content.sign = i18n.t(`Skill Signs.${Math.sign(data.m_Args[0])}`);
        break;

      case 7: // Critical Damage Change
        content.amount = skillParser.amount(data.m_Args[0] * 100, skillParser.amounts[26]);
        content.amount = i18n.t(`Skill Amounts.${26}.${content.amount}`);
        content.power = (data.m_Args[0] * 100).toFixed(0) + '%';
        content.sign = i18n.t(`Skill Signs.${Math.sign(data.m_Args[0])}`);
        break;

      case 8: // Skill Change
        break;

      case 9: // Over Recover
        content.power = data.m_Args[0].toFixed(0) + '%';
        break;

      case 10: // Absorb Attack
        push(content);
        for (let i = 0; i < 4; i++) {
          let condition = i18n.t(`Passive Powers.${10}.${i}`);
          let power = data.m_Args[i].toFixed(2) + '%';
          push(`${condition}: ${power}`);
        }
        continue;

      case 11: // Revive
        content.power = i18n.t(`Passive Powers.${11}.${data.m_Args[0]}`).format(data.m_Args[1].toFixed(0));
        break;

      case 12: // Card Turn Change
        content.power = data.m_Args[0].toFixed(0);
        content.verb = i18n.t(`Skill Verbs.${Math.sign(data.m_Args[0])}`);
        break;

      case 13: // Status Ratio By HP
        content.status = i18n.t(`Statuses.${data.m_Args[0]}`);
        push(content);
        content.args = database.BattleStatusRatioByHp[data.m_Args[1]].m_Datas;
        for (let i in content.args) {
          let condition = i != content.args.length - 1 ?
            `${content.args[i].m_HPThreshold}% ≤ HP < ${content.args[parseInt(i) + 1].m_HPThreshold}%` :
            `HP = ${content.args[i].m_HPThreshold}%`;

          let power = {};
          power.amount = skillParser.amount(content.args[i].m_Ratio, skillParser.amounts[2][data.m_Args[0]]);
          power.amount = i18n.t(`Skill Amounts.${2}.${power.amount}`);
          if (data.m_Args[0] == 4) { // SPD
            power.power = ((1 - content.args[i].m_Ratio) * 100).toFixed(1) + '%';
            power.sign = Math.sign(1 - content.args[i].m_Ratio);
          }
          else {
            power.power = content.args[i].m_Ratio.toFixed(1) + '%';
            power.sign = Math.sign(content.args[i].m_Ratio);
          }
          power.sign = i18n.t(`Skill Signs.${power.sign}`);
          power.status = content.status;

          power = i18n.t(`Passive Powers.${13}.Status Change`).format(power);
          push(`${condition}: ${power.upper()}`);
        }
        continue;

      case 14: // Counter Status Change
        for (let i = 0; i < 6; i++) {
          if (data.m_Args[i + 3] == 0) {
            continue;
          }
          content = {
            type: data.m_Type,
            target: i18n.t(`Skill Targets.${data.m_Args[0]}`),
            turnType: i18n.t(`Skill Turn Types.${data.m_Args[1]}`),
            turn: data.m_Args[2],
          };
          content.amount = skillParser.amount(data.m_Args[i + 3], skillParser.amounts[2][i]);
          content.amount = i18n.t(`Skill Amounts.${2}.${content.amount}`);
          if (i == 4) { // SPD
            content.power = ((1 - data.m_Args[i + 3]) * 100).toFixed(1) + '%';
            content.sign = Math.sign(1 - data.m_Args[i + 3]);
          }
          else {
            content.power = data.m_Args[i + 3].toFixed(1) + '%';
            content.sign = Math.sign(data.m_Args[i + 3]);
          }
          content.sign = i18n.t(`Skill Signs.${content.sign}`);
          content.status = i18n.t(`Statuses.${i}`);

          push(content);
        }
        continue;

      default:
        push(skill.m_SkillDetail);
        // push("m_Trigger:" + data.m_Trigger);
        // push("m_Type:" + data.m_Type);
        push("m_Args:" + JSON.stringify(data.m_Args));
        continue;
    }
    push(content);
  }

  return contents.map(content => content.map(item => item.upper()));
}

function skillChangeIDs(id, owner) {
  const skill = database[`PassiveSkillList_${owner}`][id];
  for (let data of skill.m_Datas) {
    if (data.m_Type == 8) {
      return data.m_Args;
    }
  }
  return [-1, -1, -1];
}

export default {
  parse,
  skillChangeIDs,
};
