<template lang="pug">
  .pa-4(v-if="!title")
    KeyValue(:k="$t('No Title')")
  div(v-else)
    .float-right.px-4.hidden-xs-only
      v-img(:width="$size()*4", :height="$size()", contain, :src="icon") 

    p.display.px-4.primary--text {{$name(title.m_DisplayName, true)}}
    p.px-4(v-show="$i18n.locale!='ja'") 
      span 日本語：
      span.primary--text {{title.m_DisplayName}}

    .px-4.hidden-sm-and-up
      v-img(:src="icon")
    .pb-4

    p.px-4(v-html="title.m_Descript.replace(/\\n/g, '<br>')", :class="{small: $vuetify.breakpoint.xsOnly}")

    v-list-item(:to="`/scenariolibrary/${5000+parseInt(id)}`")
      v-list-item-title.primary--text {{$t('Scenarios')}}
      v-list-item-action.ma-0: v-icon mdi-chevron-right

    v-list-item(:to="`/questlibrary/${5000+parseInt(id)}`")
      v-list-item-title.primary--text {{$t('Quest Library Categories.5')}}
      v-list-item-action.ma-0: v-icon mdi-chevron-right
    v-list-item(:to="`/questlibrary/${6000+parseInt(id)}`")
      v-list-item-title.primary--text {{$t('Quest Library Categories.6')}}
      v-list-item-action.ma-0: v-icon mdi-chevron-right

    v-divider
    Ad(:key="`title-ad-${id}`")

    template(v-if="id==22")
      v-divider.mb-4
      p.title.px-4.primary--text {{$t('Names')}}
      Scroller(:icon="$size(64)")
        .ml-4(v-for="character in $store.state.$db.OriginalCharaLibraryListArray", v-if="character.namedType"
          :key="`title-original-character-${character.m_ID}`",
          :style="{width: $size(64)+'px'}")
          router-link(:to="`/named/${character.namedType}`")
            CharaIcon(original, :id="character.m_ID", :size="$size(64)")
            .caption.text-center.two-lines {{$name(character.m_Title)}}
        .pl-4

      p.px-4.subtitle-1 {{$t('Non-Player Characters')}}
      Scroller(:icon="$size(64)")
        .ml-4(v-for="character in $store.state.$db.OriginalCharaLibraryListArray", v-if="!character.namedType && character.m_CondAdvID==-1"
          :key="`title-original-character-${character.m_ID}`",
          :style="{width: $size(64)+'px'}")
          router-link(:to="`/originalcharacter/${character.m_ID}`")
            CharaIcon(original, :id="character.m_ID", :size="$size(64)")
            .caption.text-center.two-lines {{$name(character.m_Title)}}
        .pl-4

      p.px-4.subtitle-1 {{$t('Event Characters')}}
      Scroller(:icon="$size(64)")
        .ml-4(v-for="character in $store.state.$db.OriginalCharaLibraryListArray", v-if="!character.namedType && character.m_CondAdvID!=-1"
          :key="`title-original-character-${character.m_ID}`",
          :style="{width: $size(64)+'px'}")
          router-link(:to="`/originalcharacter/${character.m_ID}`")
            CharaIcon(original, :id="character.m_ID", :size="$size(64)")
            .caption.text-center.two-lines {{$name(character.m_Title)}}
        .pl-4

    template(v-else)
      v-divider.mb-4
      p.title.px-4.primary--text {{$t('Names')}}
      Scroller(:icon="$size(64)")
        .ml-4(v-for="named in names",
          :key="`title-names-${named.m_NamedType}`",
          :style="{width: $size(64)+'px'}")
          router-link(:to="`/named/${named.m_NamedType}`")
            CharaIcon(named, :id="named.m_NamedType", :size="$size(64)")
            .caption.text-center.two-lines {{$name(named.fullName)}}
        .pl-4
    
    v-divider
    v-row(no-gutters)
      v-col
        v-list-item(:to="`/characters?title=${id}`")
          v-list-item-content
            v-list-item-subtitle.text-center {{$t('Number of Characters')}}
            v-list-item-title.text-center {{count(0)}}
      v-col
        v-list-item(:to="`/characters?title=${id}&rare=4`")
          v-list-item-content
            v-list-item-subtitle.text-center {{$t('Rares.4')}}
            v-list-item-title.text-center {{count(4)}}
      v-col
        v-list-item(:to="`/characters?title=${id}&rare=3`")
          v-list-item-content
            v-list-item-subtitle.text-center {{$t('Rares.3')}}
            v-list-item-title.text-center {{count(3)}}
      v-col
        v-list-item(:to="`/characters?title=${id}&rare=2`")
          v-list-item-content
            v-list-item-subtitle.text-center {{$t('Rares.2')}}
            v-list-item-title.text-center {{count(2)}}

    Achievements(:id="id")

    template(v-for="orb in orbs")
      v-divider
      Orb(:id="orb.m_ID", :key="`title-orb-${orb.m_ID}`")

    template(v-for="item in townObjects")
      v-divider
      TownObject(:id="item.m_ID", :key="`title-townobject-${item.m_ID}`")

</template>

<script>
import Orb from '@/views/Master/Orb';
import TownObject from '@/views/TownObjects/TownObject';
import Achievements from './Achievements';

export default {
  name: 'Title',
  props: ['id'],
  components: { Orb, TownObject, Achievements },
  computed: {
    title() {
      return this.$store.state.$db.TitleList[this.id];
    },
    icon() {
      return this.$asset.contentslogo.format(this.id) + '.png';
    },
    names() {
      return this.$store.state.$db.NamedListArray.filter(name =>
        name.m_TitleType == this.id);
    },
    orbs() {
      return this.$store.state.$db.MasterOrbListArray.filter(orb =>
        orb.m_TitleType == this.id);
    },
    townObjects() {
      return this.$store.state.$db.TownObjectListArray.filter(item =>
        item.m_TitleType == this.id);
    }
  },
  methods: {
    count(rare) {
      return this.$store.state.$db.CharacterListArray.filter(character =>
        character.m_CharaID % 10 == 0 &&
        (rare ? character.m_Rare == rare : true) &&
        this.$store.state.$db.NamedList[character.m_NamedType].m_TitleType == this.id &&
        true).length;
    }
  }
};
</script>