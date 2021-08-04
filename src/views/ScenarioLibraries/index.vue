<template lang="pug">
  div
    p.display.px-4.primary--text {{$t('Scenarios')}}
    .px-4
      v-select(v-model="category", :label="$t('Category')", :items="categories", dense)
    template(v-for="scenarioLibrary in scenarioLibraries.filter(item => item.category == category)")
      v-divider
      ScenarioLibrary(:item="scenarioLibrary")
      //- p {{scenarioLibrary}}
</template>

<script>
import ScenarioLibrary from './ScenarioLibrary';

export default {
  name: 'ScenarioLibraries',
  components: { ScenarioLibrary },
  data() {
    return {
      category: 1,
    };
  },
  computed: {
    scenarioLibraries() {
      const scenarioLibraries = [];
      this.$db.ADVLibraryListArray.forEach(item => {
        scenarioLibraries.push({
          id: item.m_LibraryListID,
          category: item.m_Category,
          name: this.$name(item.m_ListName),
          icon: this.$asset.advlibraryicon.format(item.m_LibraryListID) + '.png',
        });
      });
      this.$db.TitleListArray.forEach(item => {
        scenarioLibraries.push({
          id: 5000 + item.m_TitleType,
          category: 5,
          name: this.$name(item.m_DisplayName),
          icon: this.$asset.contentslogo.format(item.m_TitleType) + '.png',
        });
      });
      return scenarioLibraries;
    },
    categories() {
      return [1, 2, 3, 5].map(i => ({
        text: this.$t(`Scenario Library Categories.${i}`),
        value: i,
      }));
    },
  }
};
</script>
