<template lang="pug">
  .px-4(v-if="Object.keys(skill)==0")
    KeyValue(:k="$t('No Skill')")

  .px-4(v-else)
    v-row
      v-col.py-0(cols=12, xl=9)
        KeyValue(:k="$t('Skill Name')", :v="skill.m_SkillName", width="33%")

        v-row.primary--text.text-center.hidden-xl-only.small(no-gutters)
          v-col(v-show="showLoad") {{$t('Load')}}: {{load}}
          v-col(v-show="showRecast") {{$t('Recast')}}: {{recast}}
          v-col(v-show="showCharge") {{$t('Charge')}}: {{charge}}
          v-col(v-show="showRatio") {{$t('Probability')}}: {{ratio}}%

        .d-flex
          .mr-2.d-flex.justify-center.flex-column
            v-img(:width="$size()", contain
              :src="skillSpriteName+'.png'",
              :style="{filter: isSkillSpriteFilter ? skillSpriteFilter : undefined}")

          .d-flex.justify-center.flex-column.small(
            :style="{'width': `calc(100% - ${$size()}px)`, 'min-height': `${$size()}px`}")

            template(v-if="!from")
              slot(name="prepend")
              div.d-flex(v-for="content, j in contents", :key="`skill-${id}-content-${j}`")
                div.pr-1 ・
                div
                  div(v-for="item, k in content", :key="`skill-${id}-content-${j}-item-${k}`")
                    span(v-html="item")
              slot(name="append")
              //- div.primary--text {{skill.m_SkillDetail}}
              //- div.primary--text {{skill.m_Datas}}

            template(v-else-if="$vuetify.breakpoint.name=='xs'")
              div.d-flex.grey--text(v-for="content, j in fromContents", :key="`skill-${id}-from-content-${j}`")
                div.pr-1 ・
                div
                  div(v-for="item, k in content", :key="`skill-${id}-content-${j}-item-${k}`")
                    span(v-html="item")
              .text-center.my-n1
                v-icon mdi-chevron-down
              div.d-flex(v-for="content, j in contents", :key="`skill-${id}-content-${j}`")
                div.pr-1 ・
                div
                  div(v-for="item, k in content", :key="`skill-${id}-content-${j}-item-${k}`")
                    span(v-html="item")

            div.d-flex(v-else)
              div: div.d-flex.grey--text(v-for="content, j in fromContents", :key="`skill-${id}-from-content-${j}`")
                div.pr-1 ・
                div
                  div(v-for="item, k in content", :key="`skill-${id}-content-${j}-item-${k}`")
                    span(v-html="item")
              .text-center.mx-1.my-auto
                v-icon mdi-arrow-right
              div: div.d-flex(v-for="content, j in contents", :key="`skill-${id}-content-${j}`")
                div.pr-1 ・
                div
                  div(v-for="item, k in content", :key="`skill-${id}-content-${j}-item-${k}`")
                    span(v-html="item")

      v-col.py-0.hidden-lg-and-down(cols=3)
        KeyValue(:k="$t('Load')", :v="load")
        KeyValue(v-show="showRecast", :k="$t('Recast')", :v="recast")
        KeyValue(v-show="showCharge", :k="$t('Charge')", :v="`${charge}`")
        KeyValue(v-show="showRatio", :k="$t('Probability')", :v="`${ratio}%`")
    
    v-slider(v-model="level", ref="slider", :min="min", :max="max", v-if="min!=max")
      template(v-slot:label): span.d-inline-block.slider-label
        span {{$t('Level')}}:
        .float-right {{level}}
      template(v-slot:append): v-icon(@click="clickMax") mdi-chevron-double-up
      template(v-slot:thumb-label="props") {{exp}}
    .mb-4(v-else)
</template>

<script>
import parser from './parser';

export default {
  name: 'Skill',
  props: {
    'id': {},
    'from': {},
    'owner': {},
    'element': { default: () => undefined },
    'sp': Boolean,
    'exptable': { default: () => 0 },
    'min': { default: () => 1 },
    'max': { default: () => 1 },
    'ratio': { default: () => undefined },
  },
  data() {
    return {
      level: 1,
    };
  },
  computed: {
    showLoad() {
      return this.owner != 'MST';
    },
    showRecast() {
      return this.owner == 'PL' || this.owner == 'WPN' || this.owner == 'CARD';
    },
    showCharge() {
      return this.owner == 'PL' || this.owner == 'WPN' || this.owner == 'CARD';
    },
    showRatio() {
      return this.owner == 'EN' && this.ratio !== undefined && this.ratio != 100;
    },
    skill() {
      return Object.assign({},
        this.$db[`SkillList_${this.owner}`][this.id],
        this.$db[`SkillContentList_${this.owner}`][this.id]);
    },
    fromSkill() {
      return this.from ? Object.assign({},
        this.$db[`SkillList_${this.owner}`][this.from],
        this.$db[`SkillContentList_${this.owner}`][this.from]) : {};
    },
    skillSpriteFilter() {
      return {
        undefined: 'grayscale(100%) brightness(50%) saturate(1000%) contrast(100%)',
        0: 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-30deg) saturate(1000%) contrast(100%)',
        1: 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(195deg) saturate(1000%) contrast(100%)',
        2: 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(  0deg) saturate(1000%) contrast(100%)',
        3: 'grayscale(100%) brightness(45%) sepia(100%) hue-rotate( 45deg) saturate(1000%) contrast(100%)',
        4: 'grayscale(100%) brightness(25%) sepia(100%) hue-rotate(245deg) saturate(1000%) contrast(100%)',
        5: 'grayscale(100%) brightness(57%) sepia(100%) hue-rotate( 20deg) saturate(1000%) contrast(100%)',
      }[this.element];
    },
    isSkillSpriteFilter() {
      return !this.sp && this.owner != 'EN' && !this.skill.m_IsCharaCutIn && this.skill.m_SkillType < 5;
    },
    skillSpriteName() {
      if (this.sp) {
        return this.$asset.commonuiatlas.format('CMD_SkillSP');
      } else if (this.owner == 'EN') {
        return this.$asset.battleuiatlas.format('CMD_Blank');
      } else if (this.skill.m_IsCharaCutIn) {
        return {
          0: this.$asset.battleuiatlas.format('CMD_ActiveAttack'),
          1: this.$asset.battleuiatlas.format('CMD_ActiveAttack'),
          3: this.$asset.commonuiatlas.format('CMD_ActiveAttack'),
          4: this.$asset.commonuiatlas.format('CMD_ActiveAttack'),
          5: this.$asset.commonuiatlas.format('CMD_ActiveRecovery'),
          6: this.$asset.commonuiatlas.format('CMD_ActiveBuff'),
          7: this.$asset.commonuiatlas.format('CMD_ActiveBuff'),
        }[this.skill.m_SkillType];
      } else {
        return {
          0: this.$asset.battleuiatlas.format('CMD_NormalAttack'),
          1: this.$asset.battleuiatlas.format('CMD_NormalMagicAttack'),
          3: this.$asset.commonuiatlas.format('CMD_SkillAttack'),
          4: this.$asset.commonuiatlas.format('CMD_SkillMagic'),
          5: this.$asset.commonuiatlas.format('CMD_SkillRecovery'),
          6: this.$asset.commonuiatlas.format('CMD_SkillBuff'),
          7: this.$asset.commonuiatlas.format('CMD_SkillDeBuff'),
        }[this.skill.m_SkillType];
      }
    },
    charge() {
      if (this.owner == 'MST') return 0;
      let charge = (this.sp ? -1 :
        this.skill.m_Datas
          .map(data => this.$db.TogetherChargeDefine[data.m_Type].m_Value)
          .reduce((x, y) => (x > y ? x : y))) * 100;
      let fromCharge = this.from && (this.sp ? -1 :
        this.fromSkill.m_Datas
          .map(data => this.$db.TogetherChargeDefine[data.m_Type].m_Value)
          .reduce((x, y) => (x > y ? x : y))) * 100;
      let sign = { '-1': '↓', 0: '', 1: '↑' }[Math.sign(charge - fromCharge)];
      return `${charge}%${this.from ? sign : ''}`;
    },
    load() {
      let index = this.level < 15 ? 0 : this.level < 25 ? 1 : 2;
      let load = Math.fround(this.skill.m_LoadFactors[index] * 100);
      let fromLoad = this.from && Math.fround(this.fromSkill.m_LoadFactors[index] * 100);
      let sign = { '-1': '↓', 0: '', 1: '↑' }[Math.sign(load - fromLoad)];
      return `${load}%${this.from ? sign : ''}`;
    },
    recast() {
      if (this.sp) {
        return 0;
      }
      let index = this.level < 15 ? 0 : this.level < 25 ? 1 : 2;
      let recast = this.skill.m_Recasts[index];
      let fromRecast = this.from && this.fromSkill.m_Recasts[index];
      let sign = { '-1': '↓', 0: '', 1: '↑' }[Math.sign(recast - fromRecast)];
      return `${recast}${this.from ? sign : ''}`;
    },
    contents() {
      return parser.parse(this.id, this.owner, this.level, this.sp);
    },
    fromContents() {
      return this.from ? parser.parse(this.from, this.owner, this.level, this.sp) : [];
    },
    exp() {
      return this.$4(this.$db.SkillExp
        .filter(item =>
          item.m_ID == (this.exptable || 0) &&
          item.m_Lv < this.level)
        .reduce((s, item) => (s + item.m_NextExp), 0));
    },
  },
  methods: {
    clickMax() {
      this.level = this.max;
    }
  }
};
</script>
