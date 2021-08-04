<template lang="pug">
  .px-4(v-if="!skill")
    KeyValue(:k="$t('No Passive Skill')")

  div(v-else)
    .px-4.mb-4
      v-row
        v-col.py-0(cols=12, xl=9)
          KeyValue(:k="$t('Skill Name')", :v="skill.m_SkillName||$t('Passive Skill')", width="33%")

          .d-flex
            .mr-2.d-flex.justify-center.flex-column
              v-img(:width="$size()", contain,
                :src="icon")
            .d-flex.justify-center.flex-column.small(
              :style="{'width': `calc(100% - ${$size()}px)`, 'min-height': `${$size()}px`}")
              div.d-flex(v-for="content, j in contents", :key="`passive-skill-${id}-content-${j}`")
                div.pr-1 ・
                div
                  div(v-for="item, k in content", :key="`passive-skill-${id}-content-${j}-item-${k}`", v-html="item")
              //- div.primary--text {{skill.m_SkillDetail}}
              //- div.primary--text {{skill.m_Datas}}

        v-col.py-0.hidden-lg-and-down(cols=3)
          KeyValue(:k="$t('Load')", v="-")
          KeyValue(:k="$t('Recast')", v="-")
          KeyValue(:k="$t('Charge')", v="-")

    Skill(:key="`passive-skill-${id}-skill-change-${1}`", v-if="skillChangeIDs[1]!=-1",
      :id="skillChangeIDs[1]", :from="characterSkillIDs[1]", owner="PL", max=25)
    Skill(:key="`passive-skill-${id}-skill-change-${2}`", v-if="skillChangeIDs[2]!=-1",
      :id="skillChangeIDs[2]", :from="characterSkillIDs[2]", owner="PL", max=25)
    Skill(:key="`passive-skill-${id}-skill-change-${0}`", v-if="skillChangeIDs[0]!=-1",
      :id="skillChangeIDs[0]", :from="characterSkillIDs[0]", owner="PL")
</template>

<script>
import parser from './parser';

export default {
  name: 'PassiveSkill',
  props: ['id', 'owner', 'characterSkillIDs'],
  computed: {
    skill() {
      return this.$db[`PassiveSkillList_${this.owner}`][this.id];
    },
    contents() {
      return parser.parse(this.id, this.owner);
    },
    skillChangeIDs() {
      return parser.skillChangeIDs(this.id, this.owner);
    },
    icon(){
      if (this.owner === "ABL"){
        return this.$asset.itemicon.format(this.id.replace(/00$/,"")) + ".png"
      }else{
        return this.$asset.commonuiatlas.format('CMD_SkillPassive')+'.png'
      }
    }
  },
};
</script>
