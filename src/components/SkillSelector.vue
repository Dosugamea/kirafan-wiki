<template lang="pug">
  v-card
    v-card-title {{$t('Skill Selector')}}
    v-card-text
      v-row(no-gutters)
        v-col(cols=12)
          v-select(dense, v-model="type", :label="$t('Skill Type')", :items="types")
        v-col(cols=12, sm=4)
          v-select(dense, v-model="target", :label="$t('Skill Target')", :items="targets")
        v-col(cols=6, sm=4)
          v-select(dense, v-model="attribute", :label="$t('Skill Detail')", :items="attributes")
        v-col(cols=6, sm=4)
          v-select(dense, v-model="value", :label="$t('Skill Amount')", :items="values")
    v-card-actions
      v-spacer
      v-btn(text, color="primary", @click="push(evals)") OK
</template>

<script>
export default {
  name: 'SkillSelector',
  props: ['push'],
  data() {
    return {
      type: 2,
      target: null,
      attribute: null,
      value: 0,
    };
  },
  computed: {
    types() {
      let types = this.$t('Skill Types');
      return Object.keys(types).map(i => ({
        text: types[i],
        value: parseInt(i),
        eval: `data.m_Type==${i}`,
      }));
    },
    targets() {
      let targets = this.$t('Skill Targets');
      return Object.keys(targets).map(i => ({
        text: targets[i],
        value: parseInt(i),
        eval: `data.m_Target==${i}`,
      })).concat({
        text: this.$t('All'),
        value: null,
        eval: null,
      });
    },
    attributes() {
      switch (this.type) {
        case 2:
          return Object.keys(this.$t('Statuses')).filter(x => !isNaN(parseInt(x))).map(i => ({
            text: this.$t('Statuses')[i],
            value: parseInt(i),
            eval: `data.m_Args[${parseInt(i) + 2}]`,
          })).concat({
            text: this.$t('All'),
            value: null,
            eval: null,
          });
        case 4:
        case 5:
          return Object.keys(this.$t('Abnormals')).filter(x => !isNaN(parseInt(x))).map(i => ({
            text: this.$t('Abnormals')[i],
            value: parseInt(i),
            eval: `data.m_Args[${parseInt(i) + 0}]`,
          })).concat({
            text: this.$t('All'),
            value: null,
            eval: null,
          });
        case 8:
          return Object.keys(this.$t('Elements')).filter(x => x >= 0).map(i => ({
            text: this.$t('Elements')[i],
            value: parseInt(i),
            eval: `data.m_Args[${parseInt(i) + 2}]`,
          })).concat({
            text: this.$t('All'),
            value: null,
            eval: null,
          });
        case 11:
          return Object.keys(this.$t('Skill Damage Types')).map(i => ({
            text: this.$t('Skill Damage Types')[i],
            value: parseInt(i),
            eval: `data.m_Args[0]==${i}`,
          })).concat({
            text: this.$t('All'),
            value: null,
            eval: null,
          });
        default:
          return [];
      }
    },
    values() {
      const attribute = this.attributes.find(attribute => attribute.value == this.attribute);
      switch (this.type) {
        case 1:
          return [0, 1, 2, 3, 4].map(i => ({
            text: i == 0 ? this.$t('All') : this.$t(`Skill Amounts.1.${i}`),
            value: i,
            eval: i && `amount(data.m_Args[0], amounts[1][isTargetAll(data.m_Target)?1:0], true)==${i}`,
          }));
        case 2:
          return !attribute || !attribute.eval ? [] : [0, 1, 2, 3, 4, -1, -2, -3].map(i => ({
            text: i == 0 ? this.$t('All') : this.$t('Skill Amount Sign').format({
              amount: this.$t(`Skill Amounts.2.${Math.abs(i)}`),
              sign: this.$t(`Skill Signs.${Math.sign(i)}`),
            }),
            value: i,
            eval: i && `amount(${attribute.eval}, amounts[2][${this.attribute}], true)==${i}`,
          }));
        case 8:
          return [0, 1, 2, 3, -1, -2, -3].map(i => ({
            text: i == 0 ? this.$t('All') : this.$t('Skill Amount Sign').format({
              amount: this.$t(`Skill Amounts.8.${Math.abs(i)}`),
              sign: this.$t(`Skill Signs.${Math.sign(i)}`),
            }),
            value: i,
            eval: i && `[${ this.attribute ?? "0,1,2,3,4,5" }].some(i => amount(data.m_Args[i + 2], amounts[8], true) == ${i} );`,
          }));
        case 11:
          return [0, 1, 2, 3, 4].map(i => ({
            text: i == 0 ? this.$t('All') : this.$t(`Skill Amounts.11.${i}`),
            value: i,
            eval: i && `amount(data.m_Args[1], amounts[11], true)==${i}`,
          }));
        case 18:
          return [0, 1, 2, 3, -1, -2, -3].map(i => ({
            text: i == 0 ? this.$t('All') : this.$t('Skill Amount Sign').format({
              amount: this.$t(`Skill Amounts.18.${Math.abs(i)}`),
              sign: this.$t(`Skill Signs.${Math.sign(i)}`),
            }),
            value: i,
            eval: i && `amount(data.m_Args[2], amounts[18], true)==${i}`,
          }));
        default:
          return [];
      }
    },
    evals() {
      return [
        (this.types.find(type => type.value == this.type) || {}).eval,
        (this.targets.find(target => target.value == this.target) || {}).eval,
        (this.attributes.find(attribute => attribute.value == this.attribute) || {}).eval,
        (this.values.find(value => value.value == this.value) || {}).eval,
      ].filter(x => x).join(' && ');
    }
  }
};
</script>