<template lang="pug">
  v-list-item(:to="`/scenario/${id}`")

    .ml-auto

    v-list-item-avatar.mr-2(:size="$size()", v-if="scenario.m_NamedType[1]>=0")
      CharaIcon(named, :id="scenario.m_NamedType[1]", :size="$size()")
    v-list-item-avatar.mr-2(:size="$size()", v-if="scenario.m_NamedType[0]>=0")
      CharaIcon(named, :id="scenario.m_NamedType[0]", :size="$size()")
    v-list-item-avatar.mr-2(:size="$size()", v-else-if="scenario.m_CharaID>=0")
      CharaIcon(:id="scenario.m_CharaID", :size="$size()")
    v-list-item-avatar.mr-2(:size="$size(32)", color="primary", v-else)
      span.white--text(v-show="scenario.m_ScriptTextName") {{parseInt(scenario.m_ScriptTextName.slice(-2))}}

    .mr-md-2

    v-list-item-content.ml-0(:style="{'max-width': scenario.m_NamedType[1]>=0 ? 384-$size()-8 + 'px' : '384px'}")
      
      v-list-item-subtitle(v-if="scenario.m_NamedType[1]>=0") {{$t('Cross Scenario')}}
      v-list-item-subtitle(v-else-if="scenario.m_NamedType[0]>=0") {{$t('Character Scenario')}}
      v-list-item-subtitle(v-else-if="scenario.m_CharaID>=0") {{$t('Memorial Scenario')}}
      
      v-list-item-title {{scenario.m_Title}}

    .mr-auto
</template>

<script>
export default {
  name: 'Scenario',
  props: ['id'],
  computed: {
    scenario() {
      return this.$db.ADVList[this.id];
    },
  }
};
</script>