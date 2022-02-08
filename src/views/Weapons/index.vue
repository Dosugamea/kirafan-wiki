<template lang="pug">
  div(v-infinite-scroll="load", infinite-scroll-disabled="disabled", infinite-scroll-distance=128)
    p.display.px-4.primary--text {{$t('Weapons')}} ({{weaponList.length}})

    .px-4.mb-2
      v-chip.float-right(v-if="Object.values(query).flat().length", @click="$router.push({query: {}})")
        v-icon mdi-delete
      v-chip.mb-2.mr-2(key="weapons-query-empty", v-if="Object.values(query).flat().length==0") {{$t('All')}}
      template(v-for="values, key in query")
        template(v-for="value in values")
          v-chip.mb-2.mr-2(:key="`weapons-query-${key}-${value}`", @click="input=`${key} = ${value}`")
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
              template(v-else-if="key=='passive'")
                span.primary--text(style="font-weight: 550") passive: {{ $t( "Passive Types." + String(JSON.parse(value).type)) }}
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
            v-chip.ml-1(v-for="rare in rares", :key="`weapons-filters-rare-${rare}`",
              @click="q('rare', rare)") {{$t(`Rares.${rare}`)}}

        v-list-item(dense)
          v-list-item-content
            v-list-item-title {{$t('Class')}}
          v-list-item-action.ma-0.d-flex.flex-row.align-center
            v-avatar.ml-1(v-for="icon, i in classes", :key="`weapons-filters-class-${i}`", size=32)
              v-img(:src="$asset.commonuiatlas.format(icon) + '.png'", @click="q('class', i)")

        v-list-item(dense)
          v-list-item-content
            v-list-item-title {{$t('Evolution')}}
          v-list-item-action.ma-0.d-flex.flex-row.align-center
            v-chip.ml-1(@click="q('evolution', 0)") 0
            v-chip.ml-1(@click="q('evolution', 3)") 3
            v-chip.ml-1(@click="q('evolution', 4)") 4

      v-col(cols=12, lg=6)
        v-menu(offset-x, max-width=256)
          template(v-slot:activator="{on}")
            v-list-item(dense, v-on="on")
              v-list-item-content
                v-list-item-title {{$t('Title')}}
              v-list-item-action.ma-0
                v-icon mdi-chevron-right
          v-list.overflow-y-auto(dense, max-height="calc(100vh - 24px)")
            v-list-item(v-for="title in $store.state.$db.TitleListArray", :key="`weapons-filter-title-${title.m_TitleType}`", @click="q('title', title.m_TitleType)")
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
        
        v-dialog(max-width=512)
          template(v-slot:activator="{on}")
            v-list-item(dense, v-on="on")
              v-list-item-content
                v-list-item-title {{$t('Passive Skill')}}
              v-list-item-action.ma-0
                v-icon mdi-dots-horizontal
          PassiveSelector(:push="(x) => q('passive', x)")


    v-text-field.px-4(v-model="input", dense, :placeholder="$t('Input.Filter')", @keydown.enter="enter")

    template(v-for="weapon, i in weaponList.slice(0, show)")
      template(v-if="$ad(i)")
        v-divider
        Ad(:key="`weapons-ad-${i}`")
      v-divider
      Weapon(:id="weapon.m_ID", :key="`weapons-weapon-${weapon.m_ID}`")
</template>

<script>
import parser from '@/components/Skill/parser';
import Weapon from './Weapon';
import passiveFilter from '@/components/Selector/PassiveFilter';

export default {
  name: 'Weapons',
  components: { Weapon },
  data() {
    return {
      show: 20,
      input: '',
    };
  },
  computed: {
    _weaponList() {
      return this.$store.state.$db.WeaponListArray
        .filter(weapon => weapon.m_EvolvedCount == 0 && !weapon.default);
    },
    weaponList() {
      let weaponList = this._weaponList.filter(weapon => {
        try {
          let character = weapon.m_EquipableCharaID == -1 ? {} : this.$store.state.$db.CharacterList[weapon.m_EquipableCharaID - weapon.m_EquipableCharaID % 10];
          let named = character.m_NamedType == undefined ? {} : this.$store.state.$db.NamedList[character.m_NamedType];
          return true && (
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
                weapon.m_WeaponName,
                this.$name(weapon.m_WeaponName),
              ].some(name => r.test(name && name.replace(/\s/g, ''))))
          ) && (
            !this.query.title || !this.query.title.length || this.query.title
              .some(title => this.$store.state.$db.NamedList[character.m_NamedType].m_TitleType == title)
          ) && (
            !this.query.rare || !this.query.rare.length || this.query.rare
              .some(rare => weapon.m_Rare == rare)
          ) && (
            !this.query.class || !this.query.class.length || this.query.class
              .some(classType => weapon.m_ClassType == classType)
          ) && (
            !this.query.evolution || !this.query.evolution.length || this.query.evolution
              .some(evolution => weapon.maxEvolution == evolution)
          ) && (
            !this.query.skill || !this.query.skill.length || this.query.skill
              .some(skillEval => [
                weapon.m_SkillID,
                this.$store.state.$db.WeaponList[weapon.m_ID + weapon.maxEvolution].m_SkillID,
              ]
                .filter(id => id && id != -1)
                .some(skillID => this.$store.state.$db.SkillContentList_WPN[skillID].m_Datas
                  .some(data => {
                    const amount = parser.amount;
                    const amounts = parser.amounts;
                    const isTargetAll = parser.isTargetAll;
                    return eval(skillEval, data, amount, amounts, isTargetAll);
                  })))
          ) && (
            !this.query.eval || !this.query.eval.length || this.query.eval
              .some(e => eval(e))
          ) && (
            !this.query.passive || !this.query.passive.length || this.query.passive
              .some(passive => 
                passiveFilter.filter(passive,weapon)
              ) 
                
          
          )
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
          return false;
        }
      });
      return weaponList;
    },
    disabled() {
      return this.$route.name != 'Weapons' || this.show >= this.weaponList.length;
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
    rares: () => [2, 3, 4],
    classes: () => [
      'ClassIconFighter',
      'ClassIconMagician',
      'ClassIconPriest',
      'ClassIconKnight',
      'ClassIconAlchemist'
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
      let v = String(value);
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
    weaponList() {
      this.show = 20;
    },
  },
};
</script>
