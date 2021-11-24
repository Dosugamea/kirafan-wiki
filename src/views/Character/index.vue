<template lang="pug">
  .pa-4(v-if="!character")
    KeyValue(:k="$t('No Character')")

  div(v-else)
    .hidden-sm-and-up
      KeyValue.pl-4.pr-2.pt-2.float-left(v-if="character.isWeaken", :k="$t('Distributed Weaken')")
      KeyValue.pl-4.pr-2.pt-2.float-left(v-else-if="character.isDistributed", :k="$t('Distributed')")
      KeyValue.pl-4.pr-2.pt-2.float-left(v-else-if="character.isPeriodLimited", :k="$t('Period Limited')")
      p.display.px-4.primary--text {{$name(character.m_Name, true)}}
      p.px-4(v-show="$i18n.locale!='ja'") 
        span 日本語：
        span.primary--text {{character.m_Name}}

    v-row(no-gutters)
      v-col(cols=8, xl=6)
        .hidden-xs-only
          KeyValue.pl-4.pr-2.pt-2.float-left(v-if="character.isWeaken", :k="$t('Distributed Weaken')")
          KeyValue.pl-4.pr-2.pt-2.float-left(v-else-if="character.isDistributed", :k="$t('Distributed')")
          KeyValue.pl-4.pr-2.pt-2.float-left(v-else-if="character.isPeriodLimited", :k="$t('Period Limited')")
          p.display.px-4.primary--text {{$name(character.m_Name, true)}}
          p.px-4(v-show="$i18n.locale!='ja'") 
            span 日本語：
            span.primary--text {{character.m_Name}}
        Status.pa-4.pb-8(:status="status", divide=2, style="max-width: 320px")

      v-col.hidden-xl-only(cols=4)
        .pr-4(align="right")
          a(:href="$asset.characard.format(evolvedID(evolution))+'.png'", target="_blank")
            v-img(min-width=100, max-width=187.5, :aspect-ratio="3/4",
              :src="$asset.characard.format(evolvedID(evolution))+'.jpg'")
      v-col.hidden-lg-and-down(cols=3)
        .pr-4(v-show="character.m_Rare!=2")
          a(:href="$asset.characard.format(evolvedID(0))+'.png'", target="_blank")
            v-img(min-width=100, max-width=187.5, :aspect-ratio="3/4",
              :src="$asset.characard.format(evolvedID(0))+'.jpg'")
      v-col.hidden-lg-and-down(cols=3)
        .pr-4
          a(:href="$asset.characard.format(evolvedID(maxEvolution))+'.png'", target="_blank")
            v-img(min-width=100, max-width=187.5, :aspect-ratio="3/4",
              :src="$asset.characard.format(evolvedID(maxEvolution))+'.jpg'")

    .px-4
      v-slider(v-model="level", min=1, :max="maxLevel")
        template(v-slot:label): span.d-inline-block.slider-label
          span {{$t('Level')}}:
          .float-right {{level}}
        template(v-slot:append): v-icon(@click="clickMax") mdi-chevron-double-up
        template(v-slot:thumb-label="props") {{exp}}
      v-slider(v-model="facilities", min=0, :max="maxFacilities")
        template(v-slot:label): span.d-inline-block.slider-label
          span {{$t('Facilities')}}:
          .float-right {{facilitiesManual?'…':facilities}}
        template(v-slot:append): v-icon(@click.stop="dialog=true") mdi-dots-horizontal
      v-slider(v-model="orb", min=0, max=10)
        template(v-slot:label): span.d-inline-block.slider-label
          span {{$t('Orb')}}:
          .float-right {{orb}}
        template(v-slot:append): v-icon(@click="orb=10") mdi-chevron-double-up
      v-slider(v-model="arousal", min=0, :max="maxArousal")
        template(v-slot:label): span.d-inline-block.slider-label
          span {{$t('Arousal')}}:
          .float-right {{arousal}}
        template(v-slot:append): v-icon(@click="clickMin") mdi-delete
        template(v-slot:thumb-label="props") {{arousalExp}}

    v-dialog(v-model="dialog", max-width=512)
      v-card
        v-card-title {{$t('Facilities')}}
        v-card-text
          v-slider(v-model="friendship", :max="maxFriendship")
            template(v-slot:label): span.d-inline-block.slider-label(style="width: 128px")
              span {{$t('Friendship')}}:
              .float-right {{friendship}}
          v-slider(v-model="titleFacility", max=10) 
            template(v-slot:label): span.d-inline-block.slider-label(style="width: 128px")
              span {{$t('Title Facility')}}:
              .float-right {{titleFacility}}
          v-slider(v-model="classFacilities[0]", max=10)
            template(v-slot:label): span.d-inline-block.slider-label(style="width: 128px")
              span {{$t('Class Facility')}}:
              .float-right {{classFacilities[0]}}
          v-slider(v-model="classFacilities[1]", max=10)
            template(v-slot:label): span.d-inline-block.slider-label(style="width: 128px")
              span {{$t('Class Facility')}}:
              .float-right {{classFacilities[1]}}
          v-slider(v-model="classFacilities[2]", max=10)
            template(v-slot:label): span.d-inline-block.slider-label(style="width: 128px")
              span {{$t('Class Facility')}}:
              .float-right {{classFacilities[2]}}

    v-list-item(:to="`/named/${this.character.m_NamedType}`")
      v-list-item-title.primary--text {{$t('Profile')}}
      v-list-item-action.ma-0: v-icon mdi-chevron-right

    v-list-item(v-show="$i18n.locale=='ja'", target="_blank",
      :href="$const.wikiwiki.character.format($db.NamedList[this.character.m_NamedType].m_FullName)")
      v-list-item-title.primary--text {{$db.NamedList[this.character.m_NamedType].m_FullName}} - {{$t('Wikiwiki.Title')}}
      v-list-item-action.ma-0: v-icon mdi-open-in-new

    v-list-item(v-show="$i18n.locale=='ja'", target="_blank", v-if="character.isDistributed"
      :href="$const.wikiwiki._.format('配布キャラについて')")
      v-list-item-title.primary--text {{'配布キャラについて'}} - {{$t('Wikiwiki.Title')}}
      v-list-item-action.ma-0: v-icon mdi-open-in-new

    v-divider
    Ad(:key="`character-ad-${id}`")

    Illust(:id="id")

    v-divider.mb-4
    p.title.px-4.primary--text {{$t('Skills')}}
    Skill(sp, key="character-unique-skill",
      :id="evolvedCharacter.m_CharaSkillID", owner="PL", :element="character.m_Element", :max="maxSkillLevel+arousalLevel.m_SkillLvLimit")
    Skill(v-for="classSkillID, j in evolvedCharacter.m_ClassSkillIDs", :key="`character-class-skill-${j}`", 
      :id="classSkillID", owner="PL", :element="character.m_Element" :max="maxSkillLevel")
    Skill(:id="character.m_Class+1", owner="PL", :element="character.m_Element", max=1)

    Weapons(:id="evolvedID(maxEvolution)")

    v-divider
    Ad(:key="`character-ad-${id}-1`")

    Achievements(:id="id")

    Flavor(:id="id")

    Related(:id="id")

    RelatedNamed(:id="character.m_NamedType", hideTitle)
</template>

<script>
import RelatedNamed from '@/views/Named/Related';
import Illust from './Illust';
import Achievements from './Achievements';
import Flavor from './Flavor';
import Related from './Related';
import Weapons from './Weapons';

import functions from './functions';

// eslint-disable-next-line no-unused-vars
import define from '@/define';

export default {
  name: 'Character',
  props: ['id'],
  components: { Flavor, Related, Illust, Weapons, RelatedNamed, Achievements },
  data() {
    return {
      level: 1,
      arousal: 0,
      facilities: 0,
      friendship: 0,
      titleFacility: 0,
      classFacilities: [0, 0, 0],
      orb: 0,
      dialog: false,
      maxFriendship: define.maxFriendship,
    };
  },
  computed: {
    character() { return this.$db.CharacterList[this.id]; },
    evolvedCharacter() {
      return this.$db.CharacterList[this.evolvedID(this.evolution)];
    },
    evolution() {
      return this.level >= [undefined, 60, 70][this.character.m_Rare - 2];
    },
    arousalLevel() {
      return this.$db.ArousalLevels.filter(item =>
        item.m_Rare == this.character.m_Rare &&
        item.m_Lv == this.arousal)[0] || {};
    },
    arousalExp() {
      return this.$db.ArousalLevels
        .filter(item =>
          item.m_Rare == this.character.m_Rare &&
          item.m_Lv < this.arousal)
        .reduce((sum, item) => sum + item.m_DuplicatedCountForNextLv, 0);
    },
    status() {
      const status = functions.status(
        this.id, this.level, this.arousal,
        this.friendship, this.titleFacility, this.classFacilities,
        this.orb);
      return {
        HP: status.HP,
        '-': null,
        ATK: status.ATK,
        MAT: status.MAT,
        DEF: status.DEF,
        MDF: status.MDF,
        SPD: status.SPD,
        LUK: status.LUK,
      };
    },
    maxLevel() {
      return [50, 90, 100][this.character.m_Rare - 2];
    },
    maxSkillLevel() {
      return [15, 25, 25][this.character.m_Rare - 2];
    },
    maxEvolution() {
      return this.character.m_Rare == 2 ? 0 : 1;
    },
    maxArousal() {
      return this.character.m_Rare + 1;
    },
    maxFacilities() {
      return 10;
    },
    exp() {
      return this.$4(this.$db.CharacterExp
        .slice(0, this.level - 1)
        .reduce((s, item) => (s + item.m_NextExp), 0));
    },
    facilitiesManual() {
      return !(this.friendship == Math.ceil(this.maxFriendship / 10 * this.facilities) &&
        this.titleFacility == this.facilities &&
        this.classFacilities[0] == this.facilities &&
        this.classFacilities[1] == this.facilities &&
        this.classFacilities[2] == this.facilities);
    }
  },
  methods: {
    evolvedID(evolution) {
      return this.id - this.id % 10 + evolution;
    },
    clickMax() {
      this.level = this.maxLevel;
      this.facilities = this.maxFacilities;
    },
    clickMin() {
      this.level = 1;
      this.facilities = 0;
      this.orb = 0;
      this.arousal = 0;
    },
  },
  mounted() {
    if (this.$route.name == 'Character') {
      this.$root.$emit('theme', this.character.m_Element);
    }
  },
  watch: {
    $route(to) {
      if (to.name == 'Character') {
        this.$root.$emit('theme', this.character.m_Element);
      }
    },
    facilities(to) {
      this.friendship = Math.ceil(this.maxFriendship / 10 * to);
      this.titleFacility = to;
      this.classFacilities[0] = to;
      this.classFacilities[1] = to;
      this.classFacilities[2] = to;
    }
  }
};
</script>
