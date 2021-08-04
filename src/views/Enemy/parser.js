import i18n from '@/i18n';

function abnormal(index) {
  if (index < 2) {
    return i18n.t('Abnormal');
  } else {
    return i18n.t(`Abnormals.${index - 2}`);
  }
}

function conditions(conditions, execNums) {
  const contents = [];
  for (let condition of conditions) {
    let content = {
      type: condition.m_Type,
    };
    switch (condition.m_Type) {
      case 0: // Self Hp Range
        if (condition.m_Args[0] == 0 && condition.m_Args[1] == 100) {
          continue;
        }
        content.min = condition.m_Args[0];
        content.max = condition.m_Args[1];
        break;

      case 1: // Self State Abnormal
        content.abnormal = abnormal(condition.m_Args[0]);
        content.positive = !condition.m_Args[0] ^ condition.m_Args[1];
        content.solo = 2;
        if (condition.m_Args.length > 2) {
          content.solo = condition.m_Args[2];
          content.num = condition.m_Args[3];
          content.op = i18n.t(`AI Condition Ops.${condition.m_Args[4]}`);
        }
        content.type = `${content.type}.${content.solo}.${content.positive}`;
        break;

      case 2: // Self Status Change
        content.statusChange = i18n.t(`AI Condition Status Changes.${condition.m_Args[0]}`);
        content.positive = condition.m_Args[1];
        content.solo = 2;
        if (condition.m_Args.length > 2) {
          content.solo = condition.m_Args[2];
          content.num = condition.m_Args[3];
          content.op = i18n.t(`AI Condition Ops.${condition.m_Args[4]}`);
        }
        content.type = `${content.type}.${content.solo}.${content.positive}`;
        break;

      case 3: // Self Charge Count
      case 21: // My Party Alive Num
      case 42: // Tgt Party Alive Num
        content.num = condition.m_Args[0];
        content.op = i18n.t(`AI Condition Ops.${condition.m_Args[1]}`);
        break;

      case 43: // Tgt Party State Abnormal Count
        content.abnormal = abnormal(condition.m_Args[0]);
        content.positive = condition.m_Args[0] ? 0 : 1;
        content.num = condition.m_Args[1];
        content.op = i18n.t(`AI Condition Ops.${condition.m_Args[2]}`);
        content.type = `${content.type}.${content.positive}`;
        break;

      case 44: // Tgt Party Normal Attack Use Count
      case 45: // Tgt Party Skill Use Count
      case 46: // Tgt Party Together Attack Use Count
      case 47: // Tgt Party Member Change Count
        content.num = condition.m_Args[0];
        break;

      case 48: // Tgt Party Class Count
        content.class = i18n.t(`Classes.${condition.m_Args[0]}`);
        content.num = condition.m_Args[1];
        content.op = i18n.t(`AI Condition Ops.${condition.m_Args[2]}`);
        if (condition.m_Args[3] !== undefined && condition.m_Args[3] != -1) {
          content.extra = i18n.t(`Elements.${condition.m_Args[3]}`) + i18n.t('Element');
        }
        break;

      case 49: // Tgt Party Status Change
        content.statusChange = i18n.t(`AI Condition Status Changes.${condition.m_Args[0]}`);
        content.num = condition.m_Args[1];
        content.op = i18n.t(`AI Condition Ops.${condition.m_Args[2]}`);
        break;

      case 68: // Flag
        content.ons = [];
        content.offs = [];
        for (let i = 0; i < condition.m_Args.length; i += 2) {
          content[condition.m_Args[i + 1] ? 'ons' : 'offs'].push(condition.m_Args[i]);
        }
        if (content.ons.length) {
          contents.push(i18n.t('AI Conditions.68.1').format(content.ons.join(i18n.t('divider'))));
        }
        if (content.offs.length) {
          contents.push(i18n.t('AI Conditions.68.0').format(content.offs.join(i18n.t('divider'))));
        }
        continue;

    }
    let content_text = i18n.t(`AI Conditions.${content.type}`).format(content)

    // TODO:原因調査
    let unknown_flag = condition.m_Args[5];
    if (unknown_flag !== 0 && unknown_flag !== undefined) {
      content_text += " & m_Args[5]:" + unknown_flag + " (unknown flag)";
    }
    contents.push(content_text);
  }
  if (execNums) {
    contents.push(i18n.t('AI Conditions.num').format(execNums));
  }
  return contents;
}

function flags(flags) {
  let contents = [];
  let ons = flags.filter(flag => flag.m_IsFlag == 1).map(flag => flag.m_ID);
  let offs = flags.filter(flag => flag.m_IsFlag == 0).map(flag => flag.m_ID);
  if (ons.length) {
    contents.push(i18n.t('AI Flags.1').format(ons.join(i18n.t('divider'))));
  }
  if (offs.length) {
    contents.push(i18n.t('AI Flags.0').format(offs.join(i18n.t('divider'))));
  }
  return contents;
}

function singleConditions(singleConditions) {
  let contents = {};
  for (let singleCondition of singleConditions) {
    let content = {
      type: singleCondition.m_Type,
      sign: singleCondition.isFalse ? -1 : 1,
    };
    switch (singleCondition.m_Type) {
      case 0: // Dying
        break;

      case 1: // Element
        content.element = i18n.t(`Elements.${singleCondition.m_Args[0]}`);
        break;

      case 2: // Class
        content.class = i18n.t(`Classes.${singleCondition.m_Args[0]}`);
        break;

      case 3: // State Abnormal
        content.abnormal = abnormal(singleCondition.m_Args[0]);
        content.positive = singleCondition.m_Args[0] ? 0 : 1;
        content.type = `${content.type}.${content.positive}`;
        break;

      case 4: // Weak Element
        break;

      case 5: // Status Change
        content.statusChange = i18n.t(`AI Condition Status Changes.${singleCondition.m_Args[0]}`);
        break;

      case 6: // Self
        break;
    }
    let text = i18n.t(`AI Single Conditions.${content.type}`).format(content);
    if (contents[text]) {
      contents[text] += content.sign;
    } else {
      contents[text] = content.sign;
    }
  }
  return Object.keys(contents).map(text => i18n.t('AI Single Condition').format({
    target: text,
    sign: i18n.t(`AI Single Condition Signs.${Math.sign(contents[text])}`),
    power: contents[text] * 4,
  }));
}

export default {
  conditions,
  flags,
  singleConditions,
};
