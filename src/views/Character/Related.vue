<template lang="pug">
  div
    v-divider.mb-4
    p.px-4.title.primary--text {{$t('Related Characters')}}
    div(v-for="item in related", v-if="item.items.length", :key="`characters-related-${id}-${item.name}`")
      p.px-4.subtitle-1 {{item.name}}
      Scroller(:icon="$size(64)")
        .ml-4(v-for="character in item.items", :key="`characters-related-${id}-${item.name}-${character.m_CharaID}`", :style="{width: $size(64)+'px'}")
          router-link(:to="`/character/${character.m_CharaID}#app`")
            CharaIcon(:id="character.m_CharaID", :size="$size(64)")
            .caption.text-center.two-lines {{$name(character.m_Name)}}
        .pl-4
</template>

<script>
export default {
  name: 'Related',
  props: ['id'],
  computed: {
    character() { return this.$store.state.$db.CharacterList[this.id]; },
    named() { return this.$store.state.$db.NamedList[this.character.m_NamedType]; },
    event() { return this.character.m_Name.match(/【.*】/); },
    characterList() {
      return this.$store.state.$db.CharacterListArray
        .filter(character => character.m_CharaID % 10 == 0);
    },
    sameRareClassElement() {
      return this.characterList
        .filter(character =>
          character.m_CharaID != this.character.m_CharaID &&
          character.m_Rare == this.character.m_Rare &&
          character.m_Class == this.character.m_Class &&
          character.m_Element == this.character.m_Element);
    },
    sameEvent() {
      if (!this.event) return [];
      return this.characterList
        .filter(character =>
          character.m_CharaID != this.character.m_CharaID &&
          character.m_Name.match(new RegExp(this.event)));
    },
    sameNamed() {
      return this.characterList
        .filter(character =>
          character.m_CharaID != this.character.m_CharaID &&
          character.m_NamedType == this.character.m_NamedType);
    },
    sameTitle() {
      return this.$store.state.$db.NamedListArray
        .filter(named =>
          named.m_NamedType != this.named.m_NamedType &&
          named.m_TitleType == this.named.m_TitleType)
        .map(named => this.$store.state.$db.CharacterList[named.primaryCharacterID]);
    },
    sameCV() {
      return this.$store.state.$db.NamedListArray
        .filter(named =>
          named.m_NamedType != this.named.m_NamedType &&
          named.m_CVText == this.named.m_CVText)
        .map(named => this.$store.state.$db.CharacterList[named.primaryCharacterID]);
    },
    related() {
      return [
        {
          name: this.$t('Same Rare Class Element').format({
            rare: this.$t(`Rares.${this.character.m_Rare}`),
            class: this.$t(`Classes.${this.character.m_Class}`),
            element: this.$t(`Elements.${this.character.m_Element}`),
          }),
          items: this.sameRareClassElement
        },
        {
          name: this.$t('Same Event').format({
            event: this.event,
          }),
          items: this.sameEvent
        },
        {
          name: this.$t('Same Named').format({
            name: this.$name(this.named.fullName),
          }),
          items: this.sameNamed
        },
      ];
    }
  },
};
</script>
