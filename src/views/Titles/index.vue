<template lang="pug">
  div
    p.display.px-4.primary--text {{$t('Titles')}}
    
    v-divider
    .text-center(style="overflow: hidden")
      v-btn-toggle(v-model="sort", tile, group, color="primary")
        v-btn(small, value="rare") {{$t('Number of ★5')}}
        v-btn(small, value="characters") {{$t('Number of Characters')}}

    template(v-for="title in titleList")
      v-divider
      v-list-item(:to="`/title/${title.m_TitleType}`")
        v-list-item-avatar.mx-auto.mr-2.mr-md-4(:width="$size()*4", :height="$size()", tile)
          v-img.quest-library-icon(:src="$asset.contentslogo.format(title.m_TitleType)+'.png'", contain)

        v-list-item-content.ml-0(:style="{'max-width': '240px'}")
          v-list-item-subtitle {{$name(title.m_DisplayName)}}
          v-list-item-subtitle(v-if="sort=='rare'")
            span.primary--text {{count(title.m_TitleType, 4)}}
            span  + 
            span {{count(title.m_TitleType, 3)}}
            span  + 
            span {{count(title.m_TitleType, 2)}}
          v-list-item-subtitle(v-if="sort=='characters'")
            span.primary--text {{count(title.m_TitleType, 0)}}
            span  (
            span {{count(title.m_TitleType, 4)}}
            span  + 
            span {{count(title.m_TitleType, 3)}}
            span  + 
            span {{count(title.m_TitleType, 2)}}
            span ) 
        .mr-auto
</template>

<script>
export default {
  name: 'Titles',
  data() {
    return {
      sort: null,
    };
  },
  computed: {
    characterList() {
      return this.$store.state.$db.CharacterListArray
        .filter(character => character.m_CharaID % 10 == 0);
    },
    titleList() {
      let titleList = this.$store.state.$db.TitleListArray.slice();
      if (this.sort == 'rare') {
        titleList.sort((t2, t1) => (
          (this.count(t1.m_TitleType, 4) * 1 + this.count(t1.m_TitleType, 3) * 1e-3 + this.count(t1.m_TitleType, 2) * 1e-6) -
          (this.count(t2.m_TitleType, 4) * 1 + this.count(t2.m_TitleType, 3) * 1e-3 + this.count(t2.m_TitleType, 2) * 1e-6)
        ));
      } else if (this.sort == 'characters') {
        titleList.sort((t2, t1) => (
          (this.count(t1.m_TitleType, 0) * 1 + this.count(t1.m_TitleType, 4) * 1e-3 + this.count(t1.m_TitleType, 3) * 1e-6) -
          (this.count(t2.m_TitleType, 0) * 1 + this.count(t2.m_TitleType, 4) * 1e-3 + this.count(t2.m_TitleType, 3) * 1e-6)
        ));
      }
      return titleList;
    }
  },
  methods: {
    count(title, rare) {
      return this.characterList.filter(character =>
        (rare ? character.m_Rare == rare : true) &&
        this.$store.state.$db.NamedList[character.m_NamedType].m_TitleType == title &&
        true).length;
    }
  }
};
</script>