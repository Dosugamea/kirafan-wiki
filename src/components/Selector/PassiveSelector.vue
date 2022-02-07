<template lang="pug">
v-card
  v-card-title {{ $t('Passive Selector') }}
  v-card-text
    v-row(no-gutters)
      v-col(cols=12)
        v-select(
          dense,
          v-model="type",
          :label="$t('Passive Type')",
          :items="types"
        )
      //- v-col(cols=12, sm=4)
      //-   v-select(dense, v-model="target", :label="$t('Skill Target')", :items="targets")
      //- v-col(cols=6, sm=4)
      //-   v-select(dense, v-model="attribute", :label="$t('Skill Detail')", :items="attributes")
      //- v-col(cols=6, sm=4)
      //-   v-select(dense, v-model="value", :label="$t('Skill Amount')", :items="values")
  v-card-actions
    v-spacer
    v-btn(text, color="primary", @click="push(output)") OK
</template>

<script>
export default {
  name: "PassiveSelector",
  props: ["push"],
  data() {
    return {
      type: 0,
      target: null,
      attribute: null,
      value: 0,
    };
  },
  computed: {
    types() {
      let types = this.$t("Passive Types");
      return Object.keys(types).map((i) => ({
        text: types[i],
        value: parseInt(i),
        // eval: `data.m_Type==${i}`,
      }));
    },
    output() {
      return JSON.stringify({
        type: this.type,
        target: this.target,
        attribute: this.attribute,
        value: this.value,
      });
    },
  },
};
</script>
