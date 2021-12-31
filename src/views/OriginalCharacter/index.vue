<template lang="pug">
  .pa-4(v-if="!character")
    KeyValue(:k="$t('No Character')")

  div(v-else)
    div.float-right.px-4(:key="`original-character-icon-${id}`")
      a(:href="$asset.originalcharactericon.format(id)+'.png'", target="_blank")
        CharaIcon(original, :id="id", :size="$size(64)")
    p.display.px-4.primary--text {{$name(character.m_Title, true)}}
    p.px-4(v-show="$i18n.locale!='ja'") 
        span 日本語：
        span.primary--text {{character.m_Title}}

    .px-4.mb-4
      p(v-html="character.m_Descript.replace(/\\n/g, '<br>')", :class="{small: $vuetify.breakpoint.xsOnly}")
      KeyValue(:k="$t('Illustrator')", :v="(character.m_Illustrator)", width="33%")
      KeyValue(:k="$t('CV')", :v="character.m_CV", width="33%")
</template>

<script>
export default {
  name: 'OriginalCharacter',
  props: ['id'],
  computed: {
    character() {
      return this.$store.state.$db.OriginalCharaLibraryList[this.id];
    }
  }
};
</script>
