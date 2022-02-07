function filter(filter_string, filter_value) {
  const passive =
    window.vue.$store.state.$db.PassiveSkillList_WPN[
      filter_value.m_EquipableCharaID
    ];
  // eslint-disable-next-line no-unused-vars
  const { type, target, attribute, value } = JSON.parse(filter_string);

  if (!passive) {
    return false;
  }
  const passives = passive.m_Datas;
  if (type != undefined) {
    const _type = passives.some((passive) => passive.m_Type === type);
    if (!_type) {
      return false;
    }
  }
  // if (target) {
  // }
  // if (attribute) {
  // }
  // if (value) {
  // }
  return true;
}

export default {
  filter,
};
