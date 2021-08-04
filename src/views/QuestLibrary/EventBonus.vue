<template lang="pug">
  div
    p.px-4.title.primary--text {{$t('Event Bonus')}}
    Scroller(:icon="$size(64)")
      .ml-4(v-for="character in characters", :key="`questlibrary-eventbonus-${character.m_CharaID}`")
        router-link(:to="`/character/${character.m_CharaID}`")
          CharaIcon(:id="character.m_CharaID", :size="$size(64)")
        .caption.text-center
          .d-flex.justify-center(v-for="item, i in character.m_ItemIDs", v-if="item!=-1", :key="`questlibrary-eventbonus-item-${character.m_CharaID}-${item}`")
            v-avatar.mr-1(:size="$size(32)")
              v-img(:src="$asset.itemicon.format(item)+'.jpg'")
            .d-flex.justify-center.flex-column +{{character.m_Pluses[i]}}
      .pl-4
</template>

<script>
export default {
  name: 'EventBonus',
  props: ['id'],
  computed: {
    characters() {
      return this.$db.EventQuestDropExt.filter(item =>
        item.m_EventType == this.id &&
        item.m_CharaID % 10 == 0);
    },
  }
};
</script>