<template lang="pug">
span.mb-3
  //- v-divider

  .text-h6.mx-3.my-2 {{ $t('QuickJump.QuickJump') }}

  span(v-if="!($s.QuickJump_ShowChangedWeapons || $s.QuickJump_ShowEvent)")
    v-divider
    v-list-item(@click="")
      v-list-item-content
        v-list-item-subtitle(v-html="$t('No Item : Check Config')") 

  span(v-if="$s.QuickJump_ShowEvent")
    v-divider
    .text-subtitle-1.mx-5.my-2 {{ $t('Quest') }}
    span(v-if="quests.length > 0 || _challengeQuest != undefined")
      span(v-for="id in quests")
        v-divider
        Quest(:key="`home-quest-${id}`", :id="id")
      span(v-if="_challengeQuest != undefined")
        v-divider
        ChallengeQuest(:id="_challengeQuest" )
    span(v-else)
      NoItem

  span(v-if="$s.QuickJump_ShowChangedWeapons")
    v-divider
    .text-subtitle-1.mx-5.my-2 {{ $t('Weapon') }}

    .text-center(v-if="loading")
      v-divider
      v-progress-circular.my-4(indeterminate, color="primary")

    span(v-else)
      span(v-if="weapons.length > 0")
        span(v-for="id in weapons")
          v-divider
          Weapon(:key="`home-weapon-${id}`", :id="id")
      span(v-else)
        NoItem

  .mb-10
</template>

<script>
import Weapon from "@/views/Weapons/Weapon";
import Quest from "@/views/QuestLibrary/Quest";
import ChallengeQuest from "@/views/QuestLibraries/QuestLibrary";
import NoItem from "./NoItem";

export default {
  components: { Weapon, Quest, NoItem, ChallengeQuest },

  data() {
    return {
      loading: false,
      weapons: [],
    };
  },
  computed: {
    quests() {
      if (!this.$s.QuickJump_ShowEvent) return [];
      const output = [];
      const eventlist = this.$store.state.$db.EventsArray.filter((event) => {
        if (!event.startTimes.length || !event.endTimes.length) return;

        const startTime = event.startTimes
          .map((x) => new Date(x))
          .sort((a, b) => a - b)[0];
        const endTime = event.endTimes
          .map((x) => new Date(x))
          .sort((a, b) => a - b)[0];

        return startTime <= new Date() && new Date() <= endTime;
      });
      eventlist.forEach((event) => {
        const questLibrary =
          this.$store.state.$db.QuestLibraryList[event.m_EventType];
        Object.keys(questLibrary.quests).forEach((questID) => {
          if (questID > 90) output.push(questLibrary.quests[questID]);
        });
      });
      return output;
    },
    _challengeQuest() {
      return this.$store.state.$db.QuestLibraryListArray.filter(
        (questLibrary) => questLibrary.category == 4
      ).sort((a, b) => b.id - a.id)?.[0]?.id;
    },
  },

  async mounted() {
    if (!this.$s.QuickJump_ShowChangedWeapons) return [];
    this.loading = true;
    const db = await fetch(
      "https://y52en.github.io/test/diff_weapon.json"
    ).then((res) => res.json());
    if (db.keyLength !== this.$store.state.$db.WeaponList.length) {
      this.loading = false;
      return [];
    }

    this.weapons = db.keys;
    this.loading = false;
  },
};
</script>
