<template lang="pug">
  div
    p.display.px-4.primary--text {{$t('Quests')}}
    .px-4
      v-select(v-model="category", :label="$t('Category')", :items="categories", dense)
    template(v-for="questLibrary, i in questLibraries")
      template(v-if="$ad(i)")
        v-divider
        Ad(:key="`questlibraries-ad-${i}`")
      v-divider
      QuestLibrary(:id="questLibrary.id", :key="`questlibraries-questlibrary-${questLibrary.id}`")
</template>

<script>
import QuestLibrary from './QuestLibrary';

export default {
  name: 'QuestLibraries',
  components: { QuestLibrary },
  data() {
    return {
      category: 1,
    };
  },
  computed: {
    questLibraries() {
      const questLibraries = this.$db.QuestLibraryListArray.filter(questLibrary =>
        questLibrary.category == this.category
      );
      if (this.category == 1 || this.category == 4) {
        questLibraries.reverse();
      }
      return questLibraries;
    },
    categories() {
      return [0, 1, 2, 3, 4, 5, 6].map(i => ({
        text: this.$t(`Quest Library Categories.${i}`),
        value: i,
      }));
    },
  }
};
</script>