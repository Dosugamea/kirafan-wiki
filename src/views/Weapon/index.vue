<template lang="pug">
  .pa-4(v-if="!weapon")
    KeyValue(:k="$t('No Weapon')")

  div(v-else)
    .hidden-sm-and-up
      p.display.px-4.primary--text {{$name(evolvedWeapon.m_WeaponName, true)}}
      p.px-4(v-show="$i18n.locale!='ja'") 
        span 日本語：
        span.primary--text  {{evolvedWeapon.m_WeaponName}}

    v-row(no-gutters)
      v-col(cols=9)
        .hidden-xs-only
          p.display.px-4.primary--text {{$name(evolvedWeapon.m_WeaponName, true)}}
          p.px-4(v-show="$i18n.locale!='ja'") 
            span 日本語：
            span.primary--text  {{evolvedWeapon.m_WeaponName}}
        Status.pa-4.pb-8(:status="status", divide=2, style="max-width: 320px")
      v-col(cols=3)
        .pr-4.pb-4(align="right")
          a(:href="$asset.weaponicon.format(evolvedWeapon.m_ResourceID_R)+'.png'", target="_blank")
            v-avatar(:size="$size(64)", :key="`weapon-icon-${id}`", tile)
              v-img(:src="$asset.weaponicon.format(evolvedWeapon.m_ResourceID_R)+'.jpg'")

    .px-4
      v-slider(v-model="level", :min="evolvedWeapon.m_InitLv", :max="evolvedWeapon.m_LimitLv")
        template(v-slot:label): span.d-inline-block.slider-label
          span {{$t('Level')}}:
          .float-right {{level}}
        template(v-slot:append): v-icon(@click="clickMax") mdi-chevron-double-up
        template(v-slot:thumb-label="props") {{exp}}
      v-slider(v-model="evolution", min=0, :max="weapon.maxEvolution")
        template(v-slot:label): span.d-inline-block.slider-label
          span {{$t('Evolution')}}:
          .float-right {{evolution}}/{{weapon.maxEvolution}}
        template(v-slot:append): v-icon(@click="clickMin") mdi-delete

    .px-4.mb-4
      KeyValue(:k="$t('Sale Amount')", :v="evolvedWeapon.m_SaleAmount", width="33%", v-if="evolvedWeapon.m_CanSell")

    v-list-item(v-show="$i18n.locale=='ja'", target="_blank", v-if="equipableCharaID",
      :href="$const.wikiwiki.character.format($db.NamedList[$db.CharacterList[equipableCharaID].m_NamedType].m_FullName)")
      v-list-item-title.primary--text {{$db.NamedList[$db.CharacterList[equipableCharaID].m_NamedType].m_FullName}} - {{$t('Wikiwiki.Title')}}
      v-list-item-action.ma-0: v-icon mdi-open-in-new

    v-divider
    Ad(:key="`weapon-ad-${id}`")

    v-divider.mb-4
    p.title.px-4.primary--text {{$t('Skills')}}
    .my-4
      Skill(:id="evolvedWeapon.m_SkillID", owner="WPN", :exptable="evolvedWeapon.m_SkillExpTableID", :min="skillInitLv", :max="skillLimitLv")
      PassiveSkill(:id="evolvedWeapon.m_PassiveSkillID", owner="WPN", :characterSkillIDs="characterSkillIDs")

    v-divider.mb-4
    p.title.px-4.primary--text {{$t('Upgrade Bonus Material Items')}}
    ItemList(:items="evolvedWeapon.m_UpgradeBonusMaterialItemIDs.filter(id => id != -1)")

    template(v-if="recipe")
      v-divider.mb-4
      p.title.px-4.primary--text {{$t('Recipe')}}
      ItemList(:items="recipe.m_ItemIDs.filter(id => id != -1)", :amounts="recipe.m_ItemNums", :gold="recipe.m_Amount")

    template(v-if="evolutionRecipe")
      v-divider.mb-4
      p.title.px-4.primary--text {{$t('Evolution Recipe')}}
      ItemList(:items="evolutionRecipe.m_ItemIDs.filter(id => id != -1)", :amounts="evolutionRecipe.m_ItemNums", :gold="evolutionRecipe.m_AmountGold")

    v-divider
    Ad(:key="`weapon-ad-${id}-1`")

    template(v-if="equipableCharaID")
      v-divider.mb-4
      p.title.px-4.primary--text {{$t('Equipable Character')}}
      Character(:id="equipableCharaID", maxStatus)

    template(v-if="weapon.maxEvolution==4")
      v-divider.mb-4
      p.title.px-4.primary--text {{$t('Quest Library Categories.5')}}
      Quest(:id="40000000 + Math.floor(weapon.m_EquipableCharaID/10)", :index="weapon.m_EquipableCharaID")
</template>

<script>
import Character from '@/views/Characters/Character';
import Quest from '@/views/QuestLibrary/Quest';

export default {
  name: 'Weapon',
  props: ['id'],
  components: { Character, Quest },
  data() {
    return {
      level: 1,
      evolution: 0,
    };
  },
  methods: {
    clickMin() {
      this.evolution = 0;
      this.level = 1;
    },
    clickMax() {
      if (this.level == this.evolvedWeapon.m_LimitLv) {
        if (this.evolution == this.weapon.maxEvolution) {
          return;
        }
        this.evolution += 1;
      }
      this.level = this.evolvedWeapon.m_LimitLv;
    },
    f(initStatus, maxStatus) {
      const num = this.evolvedWeapon.m_LimitLv <= this.evolvedWeapon.m_InitLv ? 1.0 :
        Math.fround(1 -
          (this.evolvedWeapon.m_LimitLv - this.level) /
          (this.evolvedWeapon.m_LimitLv - this.evolvedWeapon.m_InitLv)
        );
      return initStatus + Math.ceil(Math.fround(
        (maxStatus - initStatus) * num
      ));
    }
  },
  computed: {
    weapon() {
      return this.$db.WeaponList[this.id];
    },
    characterSkillIDs() {
      let character = this.$db.CharacterList[this.weapon.m_EquipableCharaID];
      return character ? [
        character.m_Class + 1,
        character.m_ClassSkillIDs[0],
        character.m_ClassSkillIDs[1],
      ] : [-1, -1, -1];
    },
    skillInitLv() {
      if (!this.weapon.maxEvolution || this.evolution == 0) {
        return 1;
      }
      return this.$db.WeaponList[this.id - this.id % 10 + this.evolution - 1].m_SkillLimitLv;
    },
    skillLimitLv() {
      return this.evolvedWeapon.m_SkillLimitLv;
    },
    evolvedWeapon() {
      if (this.weapon.maxEvolution && this.evolution <= this.weapon.maxEvolution) {
        return this.$db.WeaponList[this.id - this.id % 10 + this.evolution];
      } else {
        return this.weapon;
      }
    },
    evolutionRecipe() {
      return this.$db.WeaponEvolutionList[this.evolvedWeapon.m_ID];
    },
    recipe() {
      return this.$db.WeaponRecipeList[this.id];
    },
    status() {
      const status = {};
      if (this.weapon.m_InitAtk) status.ATK = this.f(this.evolvedWeapon.m_InitAtk, this.evolvedWeapon.m_MaxAtk);
      if (this.weapon.m_InitMgc) status.MAT = this.f(this.evolvedWeapon.m_InitMgc, this.evolvedWeapon.m_MaxMgc);
      if (this.weapon.m_InitDef) status.DEF = this.f(this.evolvedWeapon.m_InitDef, this.evolvedWeapon.m_MaxDef);
      if (this.weapon.m_InitMDef) status.MDF = this.f(this.evolvedWeapon.m_InitMDef, this.evolvedWeapon.m_MaxMDef);
      return status;
    },
    exp() {
      return this.$4(this.$db.WeaponExp
        .filter(item =>
          item.m_ID == this.weapon.m_ExpTableID &&
          item.m_Lv < this.level)
        .reduce((s, item) => (s + item.m_NextExp), 0));
    },
    equipableCharaID() {
      if (this.weapon.m_EquipableCharaID == -1) {
        return null;
      }
      return this.weapon.m_EquipableCharaID - this.weapon.m_EquipableCharaID % 10;
    },
  },
  mounted() {
    if (this.$route.name == 'Weapon') {
      this.$root.$emit('theme');
    }
  },
  watch: {
    $route(to) {
      if (to.name == 'Weapon') {
        this.$root.$emit('theme');
      }
    },
  }
};
</script>