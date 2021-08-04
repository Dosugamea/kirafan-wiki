<template lang="pug">
  div
    v-divider.mb-4

    .float-right.pr-4
      v-btn(icon, @click="draw")
        v-icon mdi-refresh

    p.title.px-4.primary--text(@click="draw") {{$t('Talent')}}

    div(ref="talent", style="height: 320px")

    v-list-item(v-show="$i18n.locale=='ja'", target="_blank",
      :href="$const.wikiwiki._.format('システム/評価値')")
      v-list-item-title.primary--text {{'評価値'}} - {{$t('Wikiwiki.Title')}}
      v-list-item-action.ma-0: v-icon mdi-open-in-new

</template>

<script>
import echarts from 'echarts';

const sqrt = function (x) {
  if (x < 0) return -Math.sqrt(-x);
  return Math.sqrt(x);
};

export default {
  name: 'Talent',
  props: ['id'],
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    named() {
      return this.$db.NamedList[this.id];
    },
    formalStatus() {
      return this.$s.characterTalentShowLuck
        ? [
          this.named.formalStatus[0] / 20, // HP
          this.named.formalStatus[1] / 20, // ATK
          this.named.formalStatus[3] / 20, // DEF
          this.named.formalStatus[5], // SPD
          sqrt(this.named.formalStatus[6]), // LUK
          this.named.formalStatus[4] / 20, // MDF
          this.named.formalStatus[2] / 20, // MAT
        ] : [
          this.named.formalStatus[0] / 20, // HP
          this.named.formalStatus[1] / 20, // ATK
          this.named.formalStatus[3] / 20, // DEF
          this.named.formalStatus[5], // SPD
          this.named.formalStatus[4] / 20, // MDF
          this.named.formalStatus[2] / 20, // MAT
        ];
    },
    primary() {
      return this.$vuetify.theme.isDark ?
        this.$vuetify.theme.themes.dark.primary :
        this.$vuetify.theme.themes.light.primary;
    },
    options() {
      return {
        radar: {
          name: {
            textStyle: {
              color: this.primary,
              fontWeight: 'bold',
            }
          },
          splitNumber: 4,
          radius: '75%',
          startAngle: 90,
          indicator: this.$s.characterTalentShowLuck
            ? [
              { name: 'HP', min: -2, max: 2 },
              { name: 'ATK', min: -2, max: 2 },
              { name: 'DEF', min: -2, max: 2 },
              { name: 'SPD', min: -2, max: 2 },
              { name: 'LUK', min: -2, max: 2 },
              { name: 'MDF', min: -2, max: 2 },
              { name: 'MAT', min: -2, max: 2 },
            ] : [
              { name: 'HP', min: -2, max: 2 },
              { name: 'ATK', min: -2, max: 2 },
              { name: 'DEF', min: -2, max: 2 },
              { name: 'SPD', min: -2, max: 2 },
              { name: 'MDF', min: -2, max: 2 },
              { name: 'MAT', min: -2, max: 2 },
            ],
        },
        series: [{
          type: 'radar',
          areaStyle: {
            normal: {
              opacity: 0.2,
            },
          },
          data: [{
            value: this.formalStatus,
            itemStyle: {
              normal: {
                color: this.primary,
                lineStyle: { color: this.primary },
              },
            },
          }]
        }]
      };
    }
  },
  methods: {
    draw() {
      this.chart = echarts.init(this.$refs.talent);
      this.chart.setOption(this.options);
      this.chart.resize();
      window.onresize = this.chart.resize;
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.draw();
    });
  },
  watch: {
    options() {
      this.draw();
    }
  }
};
</script>