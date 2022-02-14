<template lang="pug">
div
  v-row(style="max-width:100%;")
    v-col(cols=7)
      p.display.px-4.primary--text {{ $t('Quests') }}
    v-col.text-right(cols=5)
      v-badge(dot, overlap, offset-x="5", offset-y="5", :value="isFilter", v-show="isEvent")
        v-btn(outlined, @click="open")
          v-icon mdi-filter

  v-expansion-panels(
      v-model="panel"
      :class='panel === 0 ? "pb-5" : "mb-0" '
      v-if="isEvent"
    )
    v-expansion-panel
      v-expansion-panel-content 
        v-radio-group.mb-n4(v-model="filter")
          v-radio(
            :label="$t('QuestFilter.All')"
            :value="0"
          )
          v-radio(
            :label="$t('QuestFilter.Date')"
            :value="1"
          )
          span(v-if="filter === 1")
            v-row
              v-col
                v-select(
                  cols="6"
                  :items="years"
                  v-model="year"
                  :label="$t('year')"
                )
              v-col
                v-select(
                  cols="6"
                  :items="months"
                  v-model="month"
                  :label="$t('month')"
                )
        
          v-radio(
            :label="$t('QuestFilter.NonCategorized')"
            :value="2"
          )

  .px-4
    v-select(
      v-model="category",
      :label="$t('Category')",
      :items="categories",
      dense
    )

  template(v-for="questLibrary, i in questLibraries")
    template(v-if="$ad(i)")
      v-divider
      Ad(:key="`questlibraries-ad-${i}`")
    v-divider
    QuestLibrary(
      :id="questLibrary.id",
      :key="`questlibraries-questlibrary-${questLibrary.id}`"
    )
</template>

<script>
import QuestLibrary from "./QuestLibrary";

export default {
  name: "QuestLibraries",
  components: { QuestLibrary },
  data() {
    return {
      category: 1,
      year: null,
      month: null,
      panel: undefined,
      filter: 0,
    };
  },
  computed: {
    questLibraries() {
      const questLibraries = this.$store.state.$db.QuestLibraryListArray.filter(
        (questLibrary) => questLibrary.category == this.category
      );
      if (this.category == 1 || this.category == 4) {
        questLibraries.reverse();
      }
      return this.dateFilter(questLibraries);
    },
    categories() {
      return [0, 1, 2, 3, 4, 5, 6].map((i) => ({
        text: this.$t(`Quest Library Categories.${i}`),
        value: i,
      }));
    },
    isFilter() {
      return (
        (this.filter === 1 && (this.year || this.month)) || this.uncatecorized
      );
    },
    isEvent() {
      return this.category === 1;
    },
    uncatecorized() {
      return this.filter === 2;
    },
    years() {
      const output = [
        {
          text: this.$t("QuestDateFilter.NoSelect"),
          value: null,
        },
      ];
      for (let i = new Date().getFullYear(); i > 2017; i--) {
        output.push({
          text: String(i),
          value: i,
        });
      }
      return output;
    },
    months() {
      const output = [
        {
          text: this.$t("QuestDateFilter.NoSelect"),
          value: null,
        },
      ];
      for (let i = 1; i <= 12; i++) {
        output.push({
          text: String(i),
          value: i,
        });
      }
      return output;
    },
  },
  methods: {
    open() {
      this.panel = this.panel === 0 ? undefined : 0;
    },
    dateFilter(questLibraries) {
      if (this.isEvent && this.filter !== 0) {
        if (!this.year && !this.month && this.filter === 1) {
          return questLibraries;
        }
        questLibraries = questLibraries.filter((questLibrary) => {
          const event = this.$store.state.$db.Events[questLibrary.id];
          const hasEventDate = () =>
            Boolean(event.startTimes.length) && Boolean(event.endTimes.length);
          if (this.uncatecorized) {
            if (!event) {
              return true;
            }
            return !hasEventDate();
          }
          if (!event) {
            return false;
          }
          if (!hasEventDate()) {
            return false;
          }
          const startTime = event.startTimes
            .map((x) => new Date(x))
            .sort((a, b) => a - b)[0];
          const endTime = event.endTimes
            .map((x) => new Date(x))
            .sort((a, b) => a - b)[0];


          // 2021-01 , 2021-02 -> [[2021, 1], [2021, 2]]
          // 2021-12 , 2022-02 -> [[2021, 12], [2022, 1], [2022, 2]]
          function parseDuringDate(from,to) {
            const output = [];
            const fromYear = from.getFullYear();
            const toYear = to.getFullYear();
            const fromMonth = from.getMonth() + 1;
            const toMonth = to.getMonth() + 1;
            for (let i = fromYear; i <= toYear; i++) {
              for (let j = 1; j <= 12; j++) {
                if (i === fromYear && j < fromMonth) {
                  continue;
                }
                if (i === toYear && j > toMonth) {
                  continue;
                }
                output.push([i, j]);
              }
            }
            return output;
          }
          const date = parseDuringDate(startTime, endTime);

          let output = false;
          date.forEach((x) => {
            const year = this.year ? x[0] === this.year : true;
            const month = this.month ? x[1] === this.month : true;
            if (year && month) {
              output = true;
            }
          });
          return output;
        });
      }
      return questLibraries;
    },
  },
};
</script>
