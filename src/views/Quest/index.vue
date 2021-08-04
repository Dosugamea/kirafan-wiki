<template lang="pug">
  .pa-4(v-if="!quest")
    KeyValue(:k="$t('No Quest')")

  div(v-else)
    p.display.px-4.primary--text
      span(v-if="quest.name") {{quest.name}}
      span(v-else) {{$t('Quest')}} {{id}}

    .float-right.pr-4(v-if="quest.stamina && quest.stamina!=-1")
      v-avatar(:size="$size()/2.5", tile)
        v-img(:src="$asset.commonuiatlas.format('StaminaIcon')+'.png'", contain)
      small  {{quest.stamina}}
    .float-right.pr-4(v-if="quest.exId2 && quest.exId2!=-1")
      v-avatar(:size="$size()/2.5")
        v-img(:src="$asset.itemicon.format(quest.exId2)+'.jpg'")
      small(v-if="quest.ex2Amount!=1")  {{quest.ex2Amount}}

    p.px-4.primary--text
      span(v-if="questLibrary.category==5")
        | {{$name($db.CharacterList[quest.section].m_Name)}} — {{$t('Quest Library Categories.5')}}
      span(v-else-if="questLibrary.category==6")
        | {{$t('Section').format(quest.section)}} — {{$t('Quest Library Categories.6')}}
      span(v-else)
        | {{$t('Section').format(quest.section)}} — {{$name(questLibrary.name)}}

    ItemList(:items="items", :amounts="amounts", :gold="quest.rewardMoney")
    .px-4.mb-4
      KeyValue(:k="$t('User Exp')", :v="quest.rewardUserExp", v-if="quest.rewardUserExp")
      KeyValue(:k="$t('Character Exp')", :v="quest.rewardCharacterExp", v-if="quest.rewardCharacterExp")
      KeyValue(:k="$t('Friendship Exp')", :v="quest.rewardFriendshipExp", v-if="quest.rewardFriendshipExp")

    v-list-item(v-show="$i18n.locale=='ja'", target="_blank", v-if="questLibrary.category==4",
      :href="$const.wikiwiki.quest.format(`${questLibrary.badge.replace('.', '年')}月チャレンジクエスト`)")
      v-list-item-title.primary--text イベント攻略 - {{$t('Wikiwiki.Title')}}
      v-list-item-action.ma-0: v-icon mdi-open-in-new

    v-divider
    Ad(:key="`quest-ad-${id}`")

    template(v-if="!isOpen")
      v-divider.mb-8
      .text-center
        .px-4.mb-4: v-icon(size=64) mdi-lock
        .px-4.mb-4 {{openTime.toLocaleString()}}

    template(v-else)
      template(v-for="wave, i in quest.waveIDs")
        v-divider.mb-4
        p.title.px-4.primary--text {{$t('Wave')}} {{i+1}}
        Wave(:key="`quest-wave-${wave}`", :id="wave", :qid="id")

</template>

<script>
import Wave from './Wave';

export default {
  name: 'Quest',
  props: ['id'],
  components: { Wave },
  computed: {
    quest() {
      return this.$db.QuestList[this.id];
    },
    questLibrary() {
      return this.$db.QuestLibraryList[this.quest.questLibraryID];
    },
    event() {
      return this.$db.Events[this.quest.questLibraryID];
    },
    startTime() {
      if (this.questLibrary.category == 1) {
        let startTimes = [];
        for (let i in this.event.parts) {
          if (this.event.parts[i] == '極' || this.event.parts[i] == '超高難易度') {
            startTimes.push(this.event.startTimes[i]);
          }
        }
        let sections = Object.keys(this.questLibrary.quests);
        let index = sections.findIndex(x => x == this.quest.section);
        return startTimes[startTimes.length - sections.length + index];
      } else if (this.questLibrary.category == 4) {
        let badge = this.questLibrary.badge.split('.');
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
      if (!this.$questLock()) {
        return true;
      }
      return (this.$time || new Date(this.$db.date)) > this.openTime;
    },
    itemOrder() {
      return this.quest.itemIDs
        .slice()
        .sort(
          (itemID0, itemID1) =>
            this.$db.ItemList[itemID1].type - this.$db.ItemList[itemID0].type
        )
        .map((itemID) => this.quest.itemIDs.indexOf(itemID));
    },
    items() {
      return this.itemOrder.map((x) => this.quest.itemIDs[x]);
    },
    amounts() {
      return this.itemOrder.map(
        (x) =>
          [
            `${this.quest.itemNums[x]}`,
            `${this.quest.itemNums[x]} +<br>${this.quest.itemGroups[x]} B`, // bonus
            `${parseFloat(
              (this.quest.itemNums[x] / this.quest.itemGroups[x]).toFixed(2)
            )}×${this.quest.itemGroups[x]}`, // grouped
            `(${parseFloat(
              (this.quest.itemNums[x] / this.quest.itemGroups[x]).toFixed(2)
            )}+B)<br>×${this.quest.itemGroups[x]}`, // bonus grouped
          ][
            this.isEventBonus(this.quest.itemIDs[x]) +
          this.$s.questDropsGrouped * 2
          ]
      );
    },
  },
  methods: {
    isEventBonus(itemID) {
      return this.$db.ItemList[itemID].isEventBonus;
    },
  },
};
</script>