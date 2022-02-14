<template lang="pug">
    span(v-if="isPassive")
        PassiveSkill(:id="id + '0'", owner="ABL", :characterSkillIDs="[]")

    div(v-else)
      .px-4.mb-4
        v-row
          v-col(cols=12)
            KeyValue(:k="$t('Fruit Name')", :v="name", width="33%")

            .d-flex
              .mr-2.d-flex.justify-center.flex-column
                v-img(:width="$size()", contain,
                :src="icon")
              .d-flex.justify-center.flex-column.small(
                :style="{'width': `calc(100% - ${$size()}px)`, 'min-height': `${$size()}px`}")
                div.d-flex
                  div.pr-1 ・
                  div
                    div {{ txt }}


</template>

<script>
import i18n from "@/i18n";

export default {
  name: "Fruit",
  props: {
    id: String,
  },
  computed: {
    fruit() {
      return this.$store.state.$db.AbilitySpheres[this.id];
    },
    itemId() {
      return this.fruit.m_ItemID;
    },
    fruitType() {
      return this.fruit.m_Type;
    },
    name() {
      return this.$store.state.$db.ItemList[this.itemId].m_Name;
    },
    icon() {
      return this.$asset.itemicon.format(this.id.replace(/0$/, "")) + ".png";
    },
    isPassive() {
      return this.fruitType === 5;
    },
    status() {
      return ["HP", "ATK", "MAT", "DEF", "MDF", ""][this.fruitType];
    },

    txt() {
      return i18n.t("Ability Tree Status Up", {
        status: this.status,
        amount: this.fruit.m_Value,
      });
    },
  },
};
</script>
