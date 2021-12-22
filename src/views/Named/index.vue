<template lang="pug">
  .pa-4(v-if="!named")
    KeyValue(:k="$t('No Character')")

  div(v-else)
    div.float-right.px-4(:key="`original-character-icon-${id}`", v-if="character")
      a(:href="$asset.originalcharactericon.format(character.m_ID)+'.png'", target="_blank")
        CharaIcon(original, :id="character.m_ID", :size="$size(64)")
    
    p.display.px-4.primary--text {{$name(named.fullName, true)}}
    p.px-4(v-show="$i18n.locale!='ja'") 
      span 日本語：
      span.primary--text {{named.fullName}}

    .px-4.mb-4(v-if="character")
      p(v-html="character.m_Descript.replace(/\\n/g, '<br>')", :class="{small: $vuetify.breakpoint.xsOnly}")

    Scroller(:icon="$size(64)")
      .ml-4(v-for="character in characters", :key="`named-characters-${character.m_CharaID}`", :style="{width: $size(64)+'px'}")
        router-link(:to="`/character/${character.m_CharaID}`")
          CharaIcon(:id="character.m_CharaID", :size="$size(64)")
          .caption.text-center.two-lines {{$name(character.m_Name)}}
      .pl-4

    v-list-item(:to="`/standpic/${named.m_ResouceBaseName.replace(/^Kirara_/,'')}`")
      v-list-item-title.primary--text {{$t('Standpic')}}
      v-list-item-action.ma-0: v-icon mdi-chevron-right

    v-list-item(v-show="$i18n.locale=='ja'", target="_blank",
      :href="$const.wikiwiki.character.format(named.m_FullName)")
      v-list-item-title.primary--text {{named.m_FullName}} - {{$t('Wikiwiki.Title')}}
      v-list-item-action.ma-0: v-icon mdi-open-in-new

    v-divider
    Ad(:key="`named-ad-${id}`")

    Profile(:id="id")
    
    Voices(:id="id" :characterList="characters")
    
    Talent(:id="id")

    Scenarios(:id="id")

    RoomObject(:id="id")
    
    v-divider
    Ad(:key="`named-ad-${id}-1`")
    
    Related(:id="id")
</template>

<script>
import Profile from './Profile';
import Voices from './Voices';
import Talent from './Talent';
import Related from './Related';
import Scenarios from './Scenarios';
import RoomObject from "./RoomObject";

export default {
  name: 'Named',
  props: ['id'],
  components: { Profile, Voices, Talent, Related, Scenarios, RoomObject },
  computed: {
    named() { return this.$db.NamedList[this.id]; },
    characters() {
      return this.$db.CharacterListArray.filter(character =>
        character.m_CharaID % 10 == 0 &&
        character.m_NamedType == this.id);
    },
    character() {
      return this.named.originalCharaID && this.$db.OriginalCharaLibraryList[this.named.originalCharaID];
    },
  },
};
</script>
