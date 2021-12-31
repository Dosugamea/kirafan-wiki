<template lang="pug">
  div
    v-divider.mb-4
    template(v-if="!hideTitle")
      p.px-4.title.primary--text {{$t('Related Names')}}
    div(v-for="item in related", v-if="item.items.length", :key="`named-related-${id}-${item.name}`")
      p.px-4.subtitle-1 {{item.name}}
      Scroller(:icon="$size(64)")
        .ml-4(v-for="named in item.items", :key="`named-related-${id}-${item.name}-${named.m_NamedType}`", :style="{width: $size(64)+'px'}")
          router-link(:to="`/named/${named.m_NamedType}`")
            CharaIcon(named, :id="named.m_NamedType", :size="$size(64)")
            .caption.text-center.two-lines {{$name(named.fullName)}}
        .pl-4
</template>

<script>
export default {
  name: 'Related',
  props: {
    id: {},
    hideTitle: Boolean,
  },
  computed: {
    named() { return this.$store.state.$db.NamedList[this.id]; },
    sameTitle() {
      return this.$store.state.$db.NamedListArray
        .filter(named =>
          named.m_NamedType != this.named.m_NamedType &&
          named.m_TitleType == this.named.m_TitleType);
    },
    sameCV() {
      return this.$store.state.$db.NamedListArray
        .filter(named =>
          named.m_NamedType != this.named.m_NamedType &&
          named.m_CVText.replace(/\s/g, '') == this.named.m_CVText.replace(/\s/g, ''));
    },
    crossAdv() {
      return this.named.crossAdvList
        .map(crossAdv => this.$store.state.$db.NamedList[crossAdv.m_NamedType]);
    },
    related() {
      return [
        {
          name: this.$t('Same Title').format({
            title: this.$name(this.$store.state.$db.TitleList[this.named.m_TitleType].m_DisplayName),
          }),
          items: this.sameTitle
        },
        {
          name: this.$t('Same CV').format({
            name: this.named.m_CVText,
          }),
          items: this.sameCV
        },
        {
          name: this.$t('Cross Adv').format({
            event: this.event,
          }),
          items: this.crossAdv
        },
      ];
    }
  },
};
</script>
