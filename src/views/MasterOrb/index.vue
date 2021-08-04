<template lang="pug">
  .pa-4(v-if="!orb")
    KeyValue(:k="$t('No Orb')")
  div(v-else)
    .float-right.px-4
      a(:href="$asset.orbicon.format(id)+'.png'", target="_blank")
        v-avatar(:size="$size(64)", :key="`masterorb-icon-${id}`")
          v-img(:src="$asset.orbicon.format(id)+'.jpg'")
    p.display.px-4.primary--text {{orb.m_Name}}

    p.px-4.primary--text(v-if="orb.m_TitleType!=-1 && $i18n.locale!='ja'")
      | {{$name($db.TitleList[orb.m_TitleType].m_DisplayName)}} — {{$t('Master Orb')}}
    p.px-4.primary--text(v-if="orb.m_Class!=-1 && $i18n.locale!='ja'")
      | {{$t(`Classes.${orb.m_Class}`)}} — {{$t('Master Orb')}}

    v-list-item(v-show="$i18n.locale=='ja'", target="_blank",
      :href="$const.wikiwiki._.format('きらら装備')")
      v-list-item-title.primary--text {{'きらら装備'}} - {{$t('Wikiwiki.Title')}}
      v-list-item-action.ma-0: v-icon mdi-open-in-new

    v-divider
    Ad(:key="`master-orb-${id}`")

    v-divider.mb-4
    p.title.px-4.primary--text {{$t('Master Skills')}}
    Skill(v-for="id in orb.m_SkillIDs", :key="`masterorb-skill-${id}`" :id="id", owner="MST", max=1)

    
</template>

<script>
export default {
  name: 'MasterOrb',
  props: ['id'],
  computed: {
    orb() {
      return this.$db.MasterOrbList[this.id];
    }
  }
};
</script>