<template lang="pug">
  div
    v-divider.mb-4
    p.px-4.title.primary--text {{$t('Scenarios')}}
    template(v-for="scenario in scenarios")
      Scenario(:id="scenario.m_AdvID")
</template>

<script>
import Scenario from '@/views/ScenarioLibrary/Scenario';

export default {
  name: 'Scenarios',
  props: ['id'],
  components: { Scenario },
  computed: {
    scenarios() {
      let scenarios = this.$store.state.$db.ADVListArray.filter(item =>
        item.m_NamedType[0] == this.id ||
        item.m_NamedType[1] == this.id ||
        !this.$pleaseUseYourEtoilium() && item.m_CharaID >= 0 && this.$store.state.$db.CharacterList[item.m_CharaID].m_NamedType == this.id ||
        false);
      for (let i = 0; i < scenarios.length; i++) {
        if (i > 0 && scenarios[i].m_ScriptTextName == scenarios[i - 1].m_ScriptTextName) {
          scenarios.splice(i, 1);
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