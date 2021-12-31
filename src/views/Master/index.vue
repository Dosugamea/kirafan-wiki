<template lang="pug">
  div
    p.display.px-4.primary--text {{$t('Master')}}

    v-row(no-gutters).py-4
      v-col(cols=12, sm=6): KeyValue.px-4(:k="$t('Stamina')", :v="master.m_Stamina")
      v-col(cols=12, sm=6): KeyValue.px-4(:k="$t('Battle Party Cost')", :v="master.m_BattlePartyCost")
      v-col(cols=12, sm=6): KeyValue.px-4(:k="$t('Friend Limit')", :v="master.m_FriendLimit")
      v-col(cols=12, sm=6): KeyValue.px-4(:k="$t('Support Limit')", :v="master.m_SupportLimit")
      v-col(cols=12, sm=6): KeyValue.px-4(:k="$t('Weapon Limit')", :v="master.m_WeaponLimit")
      v-col(cols=12, sm=6): KeyValue.px-4(:k="$t('Training Slot Num')", :v="master.m_TrainingSlotNum")

    v-slider.px-4(v-model="level", min=1, max=120)
      template(v-slot:label): span.d-inline-block.slider-label
        span {{$t('Level')}}:
        .float-right {{level}}
      template(v-slot:append): v-icon(@click="level=120") mdi-chevron-double-up
      template(v-slot:thumb-label="props") {{exp}}

    v-list-item(v-show="$i18n.locale=='ja'", target="_blank",
      :href="$const.wikiwiki._.format('おすすめランク上げ')")
      v-list-item-title.primary--text {{'おすすめランク上げ'}} - {{$t('Wikiwiki.Title')}}
      v-list-item-action.ma-0: v-icon mdi-open-in-new

    v-list-item(v-show="$i18n.locale=='ja'", target="_blank",
      :href="$const.wikiwiki._.format('きらら装備')")
      v-list-item-title.primary--text {{'きらら装備'}} - {{$t('Wikiwiki.Title')}}
      v-list-item-action.ma-0: v-icon mdi-open-in-new

    v-divider
    Ad(:key="`master-ad-${id}`")

    template(v-for="orb in $store.state.$db.MasterOrbListArray")
      v-divider
      Orb(:id="orb.m_ID", :key="`master-orb-${orb.m_ID}`")
    
</template>

<script>
import Orb from './Orb';

export default {
  name: 'MasterSkill',
  components: { Orb },
  data() {
    return {
      level: 100,
    };
  },
  computed: {
    master() {
      return this.$store.state.$db.MasterRank[this.level];
    },
    exp() {
      return this.$4(this.$store.state.$db.MasterRankArray
        .filter(item => item.m_Rank < this.level)
        .reduce((sum, item) => (sum + item.m_NextExp), 0));
    },
  }
};
</script>