<template lang="pug">
  div(v-infinite-scroll="load", infinite-scroll-disabled="disabled", infinite-scroll-distance=128)
    p.display.px-4.primary--text {{$t('Characters')}} ({{characterList.length}})

    .px-4.mb-2
      v-chip.float-right(v-if="Object.values(query).flat().length", @click="$router.push({query: {}})")
        v-icon mdi-delete
      v-chip.mb-2.mr-2(key="characters-query-empty", v-if="Object.values(query).flat().length==0") {{$t('All')}}
      template(v-for="values, key in query")
        template(v-for="value in values")
          v-chip.mb-2.mr-2(:key="`characters-query-${key}-${value}`", @click="input=`${key} = ${value}`")
            span.pr-1.d-block(style="max-width: 256px; overflow: hidden")
              template(v-if="$s.advancedFilter")
                span.primary--text(style="font-weight: 550") {{key}} = 
                span {{value}}
              template(v-else-if="key=='rare'")
                span {{$t(`Rares.${value}`)}}
              template(v-else-if="key=='class'")
                span {{$t(`Classes.${value}`)}}
              template(v-else-if="key=='element'")
                span {{$t(`Elements.${value}`)}}
              template(v-else-if="key=='title'")
                span {{$name($store.state.$db.TitleList[value].m_DisplayName)}}
              template(v-else-if="key=='skill'")
                span.primary--text(style="font-weight: 550") skill
              template(v-else-if="key=='name'")
                span {{value}}
              template(v-else)
                span.primary--text(style="font-weight: 550") {{key}} = 
                span {{value}}
            v-icon(small, @click="q(key, value)") mdi-close
    v-divider

    v-row.my-2(no-gutters)
      v-col(cols=12, lg=6)
        v-list-item(dense)
          v-list-item-content
            v-list-item-title {{$t('Rare')}}
          v-list-item-action.ma-0.d-flex.flex-row.align-center
            v-chip.ml-1(v-for="rare in rares", :key="`characters-filters-rare-${rare}`",
              @click="q('rare', rare)") {{$t(`Rares.${rare}`)}}

        v-list-item(dense)
          v-list-item-content
            v-list-item-title {{$t('Class')}}
          v-list-item-action.ma-0.d-flex.flex-row.align-center
            v-avatar.ml-1(v-for="icon, i in classes", :key="`characters-filters-class-${i}`", size=32)
              v-img(:src="$asset.commonuiatlas.format(icon) + '.png'", @click="q('class', i)")

        v-list-item(dense)
          v-list-item-content
            v-list-item-title {{$t('Element')}}
          v-list-item-action.ma-0.d-flex.flex-row.align-center
            v-avatar.ml-1(v-for="icon, i in elements", :key="`characters-filters-element-${i}`", size=32)
              v-img(:src="$asset.commonuiatlas.format(icon) + '.png'", @click="q('element', i)")

      v-col(cols=12, lg=6)
        v-menu(offset-x, max-width=256)
          template(v-slot:activator="{on}")
            v-list-item(dense, v-on="on")
              v-list-item-content
                v-list-item-title {{$t('Title')}}
              v-list-item-action.ma-0
                v-icon mdi-chevron-right
          v-list.overflow-y-auto(dense, max-height="calc(100vh - 24px)")
            v-list-item(v-for="title in $store.state.$db.TitleListArray", :key="`characters-filter-title-${title.m_TitleType}`", @click="q('title', title.m_TitleType)")
              v-list-item-content
                v-list-item-title {{$name(title.m_DisplayName)}}
        
        v-dialog(max-width=512)
          template(v-slot:activator="{on}")
            v-list-item(dense, v-on="on")
              v-list-item-content
                v-list-item-title {{$t('Skill')}}
              v-list-item-action.ma-0
                v-icon mdi-dots-horizontal
          SkillSelector(:push="(x) => q('skill', x)")

        v-row(no-gutters)
          v-col(cols=6)
            v-menu(offset-x, max-width=256)
              template(v-slot:activator="{on}")
                v-list-item(dense, v-on="on")
                  v-list-item-content
                    v-list-item-title {{$t('Obtainability')}}
                  v-list-item-action.ma-0
                    v-icon mdi-chevron-right
              v-list.overflow-y-auto(dense, max-height="calc(100vh - 24px)")
                v-list-item(@click="q('eval', '!character.isPeriodLimited && !character.isDistributed')")
                  v-list-item-content: v-list-item-title {{$t('Normal')}}
                v-list-item(@click="q('eval', 'character.isPeriodLimited')")
                  v-list-item-content: v-list-item-title {{$t('Period Limited')}}
                v-list-item(@click="q('eval', 'character.isDistributed')")
                  v-list-item-content: v-list-item-title {{$t('Distributed')}}

          v-col(cols=6)
            v-menu(offset-x, max-width=256)
              template(v-slot:activator="{on}")
                v-list-item(dense, v-on="on")
                  v-list-item-content
                    v-list-item-title {{$t('Year')}}
                  v-list-item-action.ma-0
                    v-icon mdi-chevron-right
              v-list.overflow-y-auto(dense, max-height="calc(100vh - 24px)")
                v-list-item(@click="q('eval', 'character.year == 2017')")
                  v-list-item-content: v-list-item-title 2017
                v-list-item(@click="q('eval', 'character.year == 2018')")
                  v-list-item-content: v-list-item-title 2018
                v-list-item(@click="q('eval', 'character.year == 2019')")
                  v-list-item-content: v-list-item-title 2019
                v-list-item(@click="q('eval', 'character.year == 2020')")
                  v-list-item-content: v-list-item-title 2020
                v-list-item(@click="q('eval', 'character.year == 2021')")
                  v-list-item-content: v-list-item-title 2021


    v-chip.mr-4.float-right(@click="q('order', 'asc')") {{$t('Reverse')}}
    v-text-field.px-4(v-model="input", dense, :placeholder="$t('Input.Filter')", @keydown.enter="enter")
    
    v-divider
    .text-center(style="overflow: hidden")
      v-btn-toggle(v-model="sort", tile, group, color="primary")
        v-btn(small, value="m_InitHp") HP
        v-btn(small, value="m_InitAtk") ATK
        v-btn(small, value="m_InitMgc") MAT
        v-btn(small, value="m_InitDef") DEF
        v-btn(small, value="m_InitMDef") MDF
        v-btn(small, value="m_InitSpd") SPD

    template(v-for="character, i in characterList.slice(0, show)")
      template(v-if="$ad(i)")
        v-divider
        Ad(:key="`characters-ad-${i}`")
      v-divider
      Character(:id="character.m_CharaID", :key="`characters-character-${character.m_CharaID}`")
</template>

<script>
import parser from '@/components/Skill/parser';
import Character from './Character';

export default {
  name: 'Characters',
  components: { Character },
  data() {
    return {
      show: 20,
      sort: null,
      input: '',
    };
  },
  computed: {
    _characterList() {
      let characterList = this.$store.state.$db.CharacterListArray
        .filter(character => character.m_CharaID % 10 == 0);
      return characterList;
    },
    characterList() {
      let characterList = this._characterList.filter(character => {
        try {
          let named = this.$store.state.$db.NamedList[character.m_NamedType];
          return (
            !this.query.name || !this.query.name.length || this.query.name
              .map(name => RegExp(name.replace(/\s/g, ''), 'i'))
              .some(r => [
                character.m_Name,
                this.$name(character.m_Name),
                named.m_ResouceBaseName,
                named.m_NickName,
                named.m_FullName,
                named.fullName,
                this.$name(named.fullName),
              ].some(name => r.test(name && name.replace(/\s/g, ''))))
          ) && (
            !this.query.title || !this.query.title.length || this.query.title
              .some(title => this.$store.state.$db.NamedList[character.m_NamedType].m_TitleType == title)
          ) && (
            !this.query.rare || !this.query.rare.length || this.query.rare
              .some(rare => character.m_Rare == rare)
          ) && (
            !this.query.class || !this.query.class.length || this.query.class
              .some(classType => character.m_Class == classType)
          ) && (
            !this.query.element || !this.query.element.length || this.query.element
              .some(element => character.m_Element == element)
          ) && (
            !this.query.skill || !this.query.skill.length || this.query.skill
              .some(skillEval => Array(character.m_CharaSkillID, ...character.m_ClassSkillIDs)
                .some(skillID => {
                  const skill = Object.assign({},
                    this.$store.state.$db.SkillList_PL[skillID],
                    this.$store.state.$db.SkillContentList_PL[skillID]);
                  return skill.m_Datas
                    .some(data => {
                      const amount = parser.amount;
                      const amounts = parser.amounts;
                      const isTargetAll = parser.isTargetAll;
                      return eval(skillEval, skill, data, amount, amounts, isTargetAll);
                    });
                }))
          ) && (
            !this.query.eval || !this.query.eval.length || this.query.eval
              .every(e => eval(e))
          );
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
          return false;
        }
      });

      if (this.sort) {
        characterList.sort((character0, character1) => {
          return character0[this.sort] - character1[this.sort];
        });
      }
      if (this.query.order == 'asc') {
        return characterList;
      } else {
        return characterList.reverse();
      }
    },
    disabled() {
      return this.$route.name != 'Characters' || this.show >= this.characterList.length;
    },
    query() {
      const query = {};
      for (let key in this.$route.query) {
        if (Array.isArray(this.$route.query[key])) {
          query[key] = this.$route.query[key].slice();
        } else {
          query[key] = [this.$route.query[key]];
        }
      }
      return query;
    },
    sorts() {
      return [
        { text: this.$t('Default'), value: null },
        { text: 'HP', value: 'm_InitHp' },
        { text: 'ATK', value: 'm_InitAtk' },
        { text: 'MAT', value: 'm_InitMgc' },
        { text: 'DEF', value: 'm_InitDef' },
        { text: 'MDF', value: 'm_InitMDef' },
        { text: 'SPD', value: 'm_InitSpd' },
      ];
    },
    rares: () => [2, 3, 4],
    classes: () => [
      'ClassIconFighter',
      'ClassIconMagician',
      'ClassIconPriest',
      'ClassIconKnight',
      'ClassIconAlchemist'
    ],
    elements: () => [
      'ElementIconFire',
      'ElementIconWater',
      'ElementIconEarth',
      'ElementIconWind',
      'ElementIconMoon',
      'ElementIconSun',
    ],
  },
  methods: {
    enter() {
      if (this.input.trim().length == 0) {
        return;
      }
      let index = this.input.indexOf('=');
      if (index != -1) {
        let key = this.input.slice(0, index).trim();
        let value = this.input.slice(index + 1).trim();
        this.q(key, value);
      } else {
        let key = 'name';
        let value = this.input.trim();
        this.q(key, value);
      }
      this.input = '';
    },
    q(key, value) {
      let v = value.toString();
      let query = this.query;
      if (!query[key]) {
        query[key] = [v];
      } else {
        let index = query[key].indexOf(v);
        if (index != -1) {
          query[key].splice(index, 1);
        } else {
          query[key].push(v);
        }
      }
      this.$router.replace({ query: query });
    },
    load() {
      this.show += 10;
    },
  },
  watch: {
    characterList() {
      this.show = 20;
    },
  }
};
</script>
