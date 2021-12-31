<template lang="pug">
  v-list-item(:to="`/quest/${id}`")
    v-list-item-avatar.mx-auto.mr-2.mr-md-4(:size="$size()", v-if="character")
      CharaIcon(:id="quest.section", :size="$size()")
    v-list-item-avatar.mx-auto.mr-2.mr-md-4(color="primary", :size="$size(32)", v-else)
      span.white--text {{quest.section}}
    
    v-list-item-content.mr-auto.ml-0
      v-list-item-title
        span(v-if="quest.name") {{quest.name}}
        span(v-else) {{$t('Quest')}} {{id}}
        .float-right(v-if="quest.stamina && quest.stamina!=-1")
          v-avatar(:size="$size()/2.5", tile)
            v-img(:src="$asset.commonuiatlas.format('StaminaIcon')+'.png'", contain)
          small  {{quest.stamina}}
        .float-right(v-if="quest.exId2 && quest.exId2!=-1")
          v-avatar(:size="$size()/2.5")
            v-img(:src="$asset.itemicon.format(quest.exId2)+'.jpg'")
          small(v-if="quest.ex2Amount!=1")  {{quest.ex2Amount}}
      v-list-item-subtitle.d-flex.align-center.pt-2
        span.hidden-xs-only.pr-2 {{$t('Enemies')}}
        .d-flex.flex-row(:icon="$size(32)")
          .mr-2(v-for="enemyResourceID in quest.enemyResourceIDs", :key="`questlibrary-quest-enemy-${enemyResourceID}`")
            v-avatar(:size="$size(32)")
              v-img(:src="$asset.ordericon.format(enemyResourceID)+'.jpg'")
      v-list-item-subtitle.d-flex.align-center.pt-2(v-if="quest.items.length")
        span.hidden-xs-only.pr-2 {{$t('Drops')}}
        .d-flex.flex-row.flex-wrap(:icon="$size(32)", style="")
          .mr-2.d-flex(v-for="x, i in itemOrder", :key="`questlibrary-quest-item-${i}`")
            v-avatar.mr-1(:size="$size(32)")
              v-img(:src="$asset.itemicon.format(items[i])+'.jpg'")
            .d-flex.justify-center.flex-column
              .caption(v-html="amounts[i]", style="line-height: 1rem")

      //- p {{quest}}

</template>

<script>
export default {
  name: 'Quest',
  props: ['id'],
  computed: {
    quest() {
      return this.$store.state.$db.QuestList[this.id];
    },
    character() {
      return this.$store.state.$db.CharacterList[this.quest.section];
    },
    itemOrder() {
      return this.quest.itemIDs.slice()
        .sort((itemID0, itemID1) => (this.$store.state.$db.ItemList[itemID1].type - this.$store.state.$db.ItemList[itemID0].type))
        .map(itemID => this.quest.itemIDs.indexOf(itemID));
    },
    items() {
      return this.itemOrder.map(x => this.quest.itemIDs[x]);
    },
    amounts() {
      return this.itemOrder.map(x => [
        `${this.quest.itemNums[x]}`,
        `${this.quest.itemNums[x]} +<br>${this.quest.itemGroups[x]} B`, // bonus
        `${parseFloat((this.quest.itemNums[x] / this.quest.itemGroups[x]).toFixed(2))}×${this.quest.itemGroups[x]}`, // grouped
        `(${parseFloat((this.quest.itemNums[x] / this.quest.itemGroups[x]).toFixed(2))}+B)<br>×${this.quest.itemGroups[x]}`, // bonus grouped
      ][this.isEventBonus(this.quest.itemIDs[x]) + this.$s.questDropsGrouped * 2]);
    },
  },
  methods: {
    isEventBonus(itemID) {
      return this.$store.state.$db.ItemList[itemID].isEventBonus;
    },
  }
};
</script>