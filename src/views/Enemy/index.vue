<template lang="pug">
  .pa-4(v-if="!enemy")
    KeyValue(:k="$t('No Enemy')")

  div(v-else)
    div.float-right.px-4(:key="`enemy-icon-${enemy.m_ID}`")
      a(:href="$asset.ordericon.format(enemy.m_ResourceID)+'.png'", target="_blank")
        v-avatar(:size="$size(64)")
          v-img(:src="$asset.ordericon.format(enemy.m_ResourceID)+'.jpg'")
    p.display.px-4.primary--text {{$name(enemy.m_CharaName, true)}}
    p.px-4(v-show="$i18n.locale!='ja'") 
      span 日本語：
      span.primary--text {{enemy.m_CharaName}}

    div.px-4.d-flex.align-center
      img.d-inline(width=32, height=32,
        :src="$asset.commonuiatlas.format(elementIcon)+'.png'")
      span.pl-2 {{$t('Level')}} {{level}}

    Status.pa-4(:status="status", divide=2, style="max-width: 320px")

    .mb-4
      KeyValue.px-4(:k="$t('Resist Abnormals')")
      v-row.px-3(no-gutters)
        v-col.px-1(v-for="i in 8", :key="`enemy-resist-abnormals-${i-1}`", cols=3)
          KeyValue(:disabled="!enemy.m_IsRegistAbnormals[i-1]", :v="$t(`Abnormals.${i-1}`)")
    .px-4.mb-4
      KeyValue(:k="$t('AI ID')", :v="aiID", width="33%")
      KeyValue(:k="$t('Charge Max')", :v="enemy.m_CharageMax", width="33%")
      KeyValue(:k="$t('Stun Coef')", :v="enemy.m_StunCoef", width="33%")
      KeyValue(v-if="enemy.m_StunerMag !== 1" :k="$t('Stuner Mag')", :v="enemy.m_StunerMag", width="33%")
      KeyValue(v-if="enemy.m_StunerAvoid !== 0" :k="$t('Stuner Avoid')", :v="enemy.m_StunerAvoid", width="33%")

    v-divider
    Ad(:key="`enemy-ad-${id}`")

    template(v-if="$s.enemyAIPattern")

      // default charge pattern
      template(v-if="battleAI.m_ChargeCommandDatas.length==0")
        v-divider.mb-4
        .px-4.mb-2
          v-chip.mr-2.mb-2(key="enemy-pattern-condition-full-charge") {{$t('Full Charge')}}
        Skill(:id="enemy.m_CharageSkillIDs[0]", owner="EN", sp
          :element="enemy.m_Element", max=1, :ratio="100")

      // charge pattern
      template(v-for="command, k in battleAI.m_ChargeCommandDatas")
        v-divider.mb-4
        .px-4.mb-2
          v-chip.mr-2.mb-2(:key="`enemy-pattern-condition-full-charge-${k}`") {{$t('Full Charge')}}
          v-chip.mr-2.mb-2(:key="`enemy-pattern-condition-full-charge-${k}-${item}`",
            v-for="item in parser.conditions(command.m_Conditions, command.m_ExecNum)") {{item}}
        template(v-for="exec in command.m_ExecDatas")
          // TODO:根本的な原因を調べる #/enemy/90129005?level=90&qid=1203900 暫定対処
          Skill(:id="enemy.m_CharageSkillIDs[exec.m_CommandIndex] === -1 ? enemy.m_CharageSkillIDs[0] : enemy.m_CharageSkillIDs[exec.m_CommandIndex]", owner="EN", sp
            :element="enemy.m_Element", max=1, :ratio="exec.m_Ratio")
            .d-flex.primary--text(slot="prepend", v-if="parser.singleConditions(exec.m_SingleConditions).length")
              .pr-1 ・
              div
                div(v-for="item in parser.singleConditions(exec.m_SingleConditions)") {{item}}
            .d-flex.primary--text(slot="append", v-if="parser.flags(exec.m_AIFlags).length")
              .pr-1 ・
              div
                div(v-for="item in parser.flags(exec.m_AIFlags)") {{item}}

      // confusion pattern
      template(v-if="!enemy.m_IsRegistAbnormals[0]")
        v-divider.mb-4
        .float-right.pr-4
          v-btn(icon, @click="showConfusion=!showConfusion")
            v-icon(v-if="showConfusion") mdi-chevron-up
            v-icon(v-else) mdi-chevron-down
        .px-4.mb-2(@click="showConfusion=true")
          v-chip.mr-2.mb-2(:key="`enemy-pattern-condition-confusion`") {{$t('Abnormals.0')}}
        v-expand-transition
          div(v-show="showConfusion")
            Skill(v-for="skillID, j in enemy.m_SkillIDs", v-if="skillID!=-1 && enemy.m_IsConfusionSkillIDs[j]", :key="`enemy-confusion-skill-${j}`",
              :id="skillID", owner="EN", :element="enemy.m_Element", max=1)

      // pattern
      template(v-for="command, k in battleAI.m_PatternDatas[0].m_CommandDatas")
        v-divider.mb-4
        .px-4.mb-2
          v-chip.mr-2.mb-2(:key="`enemy-pattern-condition-${k}-default`",
            v-if="parser.conditions(command.m_Conditions, command.m_ExecNum).length==0") {{$t('Default')}}
          v-chip.mr-2.mb-2(:key="`enemy-pattern-condition-${k}-${item}`",
            v-for="item in parser.conditions(command.m_Conditions, command.m_ExecNum)") {{item}}
        template(v-for="exec in command.m_ExecDatas")
          Skill(:id="enemy.m_SkillIDs[exec.m_CommandIndex]", owner="EN",
            :element="enemy.m_Element", max=1, :ratio="exec.m_Ratio")
            .d-flex.primary--text(slot="prepend", v-if="parser.singleConditions(exec.m_SingleConditions).length")
              .pr-1 ・
              div
                div(v-for="item in parser.singleConditions(exec.m_SingleConditions)") {{item}}
            .d-flex.primary--text(slot="append", v-if="parser.flags(exec.m_AIFlags).length")
              .pr-1 ・
              div
                div(v-for="item in parser.flags(exec.m_AIFlags)") {{item}}

      div(v-if="$i18n.locale=='zh'")
        v-divider.mb-4
        p.title.px-4.primary--text {{$t('Page Help')}}
        p.px-4(v-html="$t('Page Helps.Enemy AI Pattern')")

    template(v-else)

      v-divider.mb-4
      p.title.px-4.primary--text {{$t('Skills')}}

      Skill(v-for="skillID, j in enemy.m_CharageSkillIDs", v-if="skillID!=-1", :key="`enemy-charge-skill-${j}`", 
        :id="skillID", owner="EN", :element="enemy.m_Element", sp, max=1)
      Skill(v-for="skillID, j in enemy.m_SkillIDs", v-if="skillID!=-1", :key="`enemy-skill-${j}`", 
        :id="skillID", owner="EN", :element="enemy.m_Element", max=1)

    //- p {{id}} {{level}}
    //- p {{enemy}}
</template>

<script>
import parser from "./parser";

export default {
  name: "Enemy",
  props: ["id"],
  data() {
    return {
      showConfusion: false,
    };
  },
  computed: {
    parser: () => parser,
    battleAI() {
      return this.$store.state.$db.BattleAIDataList[this.enemy.m_AIID];
    },
    enemy() {
      return this.$store.state.$db.QuestEnemyList[this.id];
    },
    level() {
      return this.$route.query.level || 1;
    },
    elementIcon() {
      return {
        0: "ElementIconFire",
        1: "ElementIconWater",
        2: "ElementIconEarth",
        3: "ElementIconWind",
        4: "ElementIconMoon",
        5: "ElementIconSun",
      }[this.enemy.m_Element];
    },
    status() {
      return {
        HP: this.f(this.enemy.m_InitHp, this.enemy.m_MaxHp),
        "": null,
        ATK: this.f(this.enemy.m_InitAtk, this.enemy.m_MaxAtk),
        MAT: this.f(this.enemy.m_InitMgc, this.enemy.m_MaxMgc),
        DEF: this.f(this.enemy.m_InitDef, this.enemy.m_MaxDef),
        MDF: this.f(this.enemy.m_InitMDef, this.enemy.m_MaxMDef),
        SPD: this.f(this.enemy.m_InitSpd, this.enemy.m_MaxSpd),
        LUK: this.f(this.enemy.m_InitLuck, this.enemy.m_MaxLuck),
      };
    },
    aiID() {
      return `<a href="${this.$asset.battleai.format(
        this.enemy.m_AIID
      )}.json" target="_blank">
        ${this.enemy.m_AIID}
      </a>`;
    },
    startTime() {
      if (this.questLibrary.category == 1) {
        let startTimes = [];
        for (let i in this.event.parts) {
          if (
            this.event.parts[i] == "極" ||
            this.event.parts[i] == "超高難易度"
          ) {
            startTimes.push(this.event.startTimes[i]);
          }
        }
        let sections = Object.keys(this.questLibrary.quests);
        let index = sections.findIndex((x) => x == this.quest.section);
        return startTimes[startTimes.length - sections.length + index];
      } else if (this.questLibrary.category == 4) {
        let badge = this.questLibrary.badge.split(".");
        let t = new Date(Date.UTC(badge[0], badge[1] - 1));
        while (t.getUTCDay() != 6) {
          t.setHours(t.getHours() + 24);
        }
        t.setHours(t.getHours() - 9);
        return t;
      }
      return null;
    },
    openTime() {
      let t = new Date(this.startTime || 0);
      t.setHours(t.getHours() + 24);
      return t;
    },
    isOpen() {
      return true;
    },
  },
  methods: {
    f(initStatus, maxStatus) {
      const num =
        this.enemy.m_MaxLv <= this.enemy.m_InitLv
          ? 1.0
          : Math.fround(
              1 -
                (this.enemy.m_MaxLv - this.level) /
                  (this.enemy.m_MaxLv - this.enemy.m_InitLv)
            );
      return (
        initStatus + Math.ceil(Math.fround((maxStatus - initStatus) * num))
      );
    },
  },
  mounted() {
    if (this.$route.name == "Enemy") {
      this.$root.$emit("theme", this.enemy.m_Element);
    }
  },
  watch: {
    $route(to) {
      if (to.name == "Enemy") {
        this.$root.$emit("theme", this.enemy.m_Element);
      }
    },
  },
};
</script>
