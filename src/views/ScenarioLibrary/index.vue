<template lang="pug">
  .pa-4(v-if="!name")
    KeyValue(:k="$t('No Scenario')")
  div(v-else)
    .float-right.px-4.hidden-xs-only
      v-img(:width="$size()*4", :height="$size()", contain, :src="icon") 

    p.display.px-4.primary--text {{$name(name, true)}}
    p.px-4(v-show="$i18n.locale!='ja'") 
      span 日本語：
      span.primary--text {{name}}

    .px-4.hidden-sm-and-up
      v-img(:src="icon")
    .pb-4

    v-list-item(:to="`/questlibrary/${id}`", v-if="category!=5")
      v-list-item-title.primary--text {{$t('Quests')}}
      v-list-item-action.ma-0: v-icon mdi-chevron-right
  
    v-list-item(:to="`/title/${id-5000}`", v-else)
      v-list-item-title.primary--text {{$t('Title')}}
      v-list-item-action.ma-0: v-icon mdi-chevron-right

    .pa-4(v-if="!scenarios.length")
      KeyValue(:k="$t('No Scenario')")

    template(v-for="scenario in scenarios")
      v-divider
      Scenario(:id="scenario.m_AdvID")
</template>

<script>
import Scenario from './Scenario';

export default {
  name: 'ScenarioLibrary',
  props: ['id'],
  components: { Scenario },
  computed: {
    category() {
      return Math.floor(this.id / 1000);
    },
    name() {
      return this.category == 5 ?
        this.$db.TitleList[this.id - 5000].m_DisplayName :
        this.$db.ADVLibraryList[this.id].m_ListName;
    },
    icon() {
      return this.category == 5 ?
        this.$asset.contentslogo.format(this.id - 5000) + '.png' :
        this.$asset.advlibraryicon.format(this.id) + '.png';
    },
    scenarios() {
      let scenarios = this.category == 5 ?
        this.$db.ADVListArray.filter(item =>
          item.m_NamedType[0] >= 0 && this.$db.NamedList[item.m_NamedType[0]].m_TitleType == this.id - 5000 ||
          item.m_NamedType[1] >= 0 && this.$db.NamedList[item.m_NamedType[1]].m_TitleType == this.id - 5000 ||
          !this.$isMoe() && item.m_CharaID >= 0 && this.$db.NamedList[this.$db.CharacterList[item.m_CharaID].m_NamedType].m_TitleType == this.id - 5000 ||
          false) :
        this.$db.ADVListArray.filter(item => item.m_LibraryID == this.id);
      for (let i = 0; i < scenarios.length; i++) {
        if (i > 0 && scenarios[i].m_ScriptTextName &&
          scenarios[i].m_ScriptTextName == scenarios[i - 1].m_ScriptTextName) {
          scenarios[i - 1].m_Title = scenarios[i - 1].m_Title
            .replace('（イントロ）', '')
            .replace('イントロ', '')
            .trim();
          scenarios.splice(i, 1);
          i -= 1;
        }
      }
      return scenarios;
    }
  }
};
</script>