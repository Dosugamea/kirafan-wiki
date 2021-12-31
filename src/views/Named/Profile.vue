<template lang="pug">
  div
    v-divider.mb-4
    .float-right.px-4
      v-img(:width="width", :src="$asset.contentslogo.format(named.m_TitleType)+'.png'") 
    p.title.px-4.primary--text {{$t('Profile')}}
    .px-4.mb-4
      p(v-html="named.m_ProfileText.replace(/\\n/g, '<br>')", :class="{small: $vuetify.breakpoint.xsOnly}")
      KeyValue(:k="$t('Nick Name')", :v="$name(named.m_NickName)", width="33%")
      KeyValue(:k="$t('Full Name')", :v="$name(named.fullName)", width="33%")
      KeyValue(:k="$t('Gift Type')", :v="$t(`Gift Types.${named.m_DropItemKey}`)", width="33%")
</template>

<script>
export default {
  name: 'Profile',
  props: ['id'],
  computed: {
    named() {
      return this.$store.state.$db.NamedList[this.id];
    },
    width() {
      return this.$vuetify.breakpoint.lgAndUp ? 192 : 128;
    }
  }
};
</script>