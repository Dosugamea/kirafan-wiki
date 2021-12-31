<template lang="pug">
  div(v-if="!enemy")
  div(v-else)
    v-list-item(:to="`/enemy/${id}?level=${level}&qid=${qid}`")
      template(v-if="collection")
        v-list-item-avatar(:size="48")
          v-img(:src="$asset.ordericon.format(enemy.m_ResourceID)+'.jpg'")
        v-list-item-content
          v-list-item-subtitle {{$name(enemy.m_CharaName)}}

      template(v-else)
        v-list-item-avatar.mr-2(:size="$size(48)")
          v-img(:src="$asset.ordericon.format(enemy.m_ResourceID)+'.jpg'")

        v-list-item-content.hidden-md-and-up
          v-list-item-title.d-flex.align-center
            img.d-inline(:width="$size()/3", :height="$size()/3",
              :src="$asset.commonuiatlas.format(elementIcon)+'.png'")
            span.pl-1 {{$name(enemy.m_CharaName)}}
            v-list-item-subtitle.pl-1 {{$t('Level')}} {{level}}
          v-list-item-subtitle
            Status(:status="status6", divide=3, format)

        v-list-item-content.hidden-sm-and-down
          v-list-item-title {{$name(enemy.m_CharaName)}}
          v-list-item-subtitle.d-flex.align-center
            img.d-inline(:width="$size()/3", :height="$size()/3",
              :src="$asset.commonuiatlas.format(elementIcon)+'.png'")
            span.pl-1 {{$t('Level')}} {{level}}

    .px-2.mb-4.hidden-sm-and-down.small(v-if="!collection")
      Status(:status="status7", divide=2, format)
</template>

<script>
export default {
  name: 'Enemy',
  props: {
    id: {},
    qid: {},
    level: Number,
    collection: Boolean,
  },
  computed: {
    enemy() {
      return this.$store.state.$db.QuestEnemyList[this.id];
    },
    elementIcon() {
      return {
        0: 'ElementIconFire',
        1: 'ElementIconWater',
        2: 'ElementIconEarth',
        3: 'ElementIconWind',
        4: 'ElementIconMoon',
        5: 'ElementIconSun',
      }[this.enemy.m_Element];
    },
    status7() {
      return {
        'HP': this.f(this.enemy.m_InitHp, this.enemy.m_MaxHp),
        '': null,
        'ATK': this.f(this.enemy.m_InitAtk, this.enemy.m_MaxAtk),
        'MAT': this.f(this.enemy.m_InitMgc, this.enemy.m_MaxMgc),
        'DEF': this.f(this.enemy.m_InitDef, this.enemy.m_MaxDef),
        'MDF': this.f(this.enemy.m_InitMDef, this.enemy.m_MaxMDef),
        'SPD': this.f(this.enemy.m_InitSpd, this.enemy.m_MaxSpd),
        'LUK': this.f(this.enemy.m_InitLuck, this.enemy.m_MaxLuck),
      };
    },
    status6() {
      return {
        'HP': this.f(this.enemy.m_InitHp, this.enemy.m_MaxHp),
        'ATK': this.f(this.enemy.m_InitAtk, this.enemy.m_MaxAtk),
        'MAT': this.f(this.enemy.m_InitMgc, this.enemy.m_MaxMgc),
        'DEF': this.f(this.enemy.m_InitDef, this.enemy.m_MaxDef),
        'MDF': this.f(this.enemy.m_InitMDef, this.enemy.m_MaxMDef),
        'SPD': this.f(this.enemy.m_InitSpd, this.enemy.m_MaxSpd),
      };
    },
  },
  methods: {
    f(initStatus, maxStatus) {
      if (initStatus == maxStatus) {
        return initStatus;
      }
      const coef = (maxStatus - initStatus) / (this.enemy.m_MaxLv - this.enemy.m_InitLv);
      return Math.ceil(initStatus + coef * (this.level - this.enemy.m_InitLv));
    },
  }
};
</script>