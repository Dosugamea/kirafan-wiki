<template lang="pug">
  div(style="margin-bottom: -80px")
    v-img.mx-auto(src="@/assets/claire.svg", aspect-ratio=1, max-width=384, contain, @click="onCleaClick")

    v-expand-transition
      div(v-show="show")
        .py-4.text-center
          v-btn.mx-2(color="primary", @click="summon(1)") {{$t('Summon')}}
          v-btn.mx-2(color="primary", @click="summon(10)") {{$t('Summon 10 Times')}}
        
        v-slide-y-transition(group)
          template(v-for="summon in summons.slice().reverse()")
            v-card.ma-4(:key="`home-summon-${summon.id}`")
              .pa-1
                .d-flex.justify-center
                  template(v-for="characterID in summon.characterIDs.slice(0, 5)")
                    router-link(:to="`/character/${characterID}`")
                      CharaIcon.ma-1(:id="characterID", :size="$size()", :frame="true")
                .d-flex.justify-center
                  template(v-for="characterID in summon.characterIDs.slice(5, 10)")
                    router-link(:to="`/character/${characterID}`")
                      CharaIcon.ma-1(:id="characterID", :size="$size()", :frame="true")
              .text-center.primary--text.pb-2(v-html="$t(`Summon Text.${summon.maxRare<4?'Failure':'Success'}`)")
        
        v-divider

    .my-6.text-center
      p.display-1.primary--text.mb-2 {{$t('KiraFan.Moe')}}
      p.title.primary--text {{$t('KiraFan Wiki')}}

    //- Characters
    //- Weapons
    //- QuestLibraries

    QuickJump

    Media

    v-divider.mb-4
    p.text-center(:class="$s.isHomePageFooterFixed? 'margin-footer' : ''") {{$t('Day Count').format(dayCount)}}

    v-bottom-navigation.hidden-sm-and-up(:fixed="$s.isHomePageFooterFixed")
      v-btn(to='/characters') {{$t('Character')}}
        v-icon mdi-cards
      v-btn(to='/weapons') {{$t('Weapons')}}
        v-icon mdi-sword
      v-btn(to='/questlibraries') {{$t('Quests')}}
        v-icon mdi-sword-cross
      v-btn(to='/settings') {{$t('Settings')}}
        v-icon mdi-cog
</template>

<style lang="scss">
@import "../../scss/variables";

@media screen and (max-width: map-get($grid-breakpoint,sm)) { 
  div > .margin-footer {
    margin-bottom: 80px;
  }
}
</style>

<script>
import Characters from './Characters';
import Weapons from './Weapons';
import QuestLibraries from './QuestLibraries';
import RandomCharacter from './RandomCharacter';
import Media from './Media';
import QuickJump from './QuickJump';

export default {
  name: 'Home',
  components: { Characters, Weapons, QuestLibraries, RandomCharacter, Media, QuickJump },
  data() {
    return {
      show: false,
      cleaClickTime: 0,
      summons: [],
    };
  },
  computed: {
    p() {
      let rare4 = (Math.random() * 0.03 + 0.01) * (1);
      let rare3 = (Math.random() * 0.05 + 0.10) * (1 - rare4);
      let rare2 = (Math.random() * 0.00 + 1.00) * (1 - rare4 - rare3);
      return [rare2, rare3, rare4];
    },
    dayCount() {
      return Math.floor((
        new Date().getTime() -
        new Date('2017/12/11 00:00:00 +0900').getTime()
      ) / 86400000);
    }
  },
  methods: {
    onCleaClick() {
      this.show = true;
      this.cleaClickTime++;
      // if(this.cleaClickTime==5){
      //   this.cleaClickTime = 0;
      //   window.vue.$emit('cleaVisibility', true);
      // }
    },
    summon(times) {
      let characterIDs = [];
      let maxRare = 0;
      for (let t = 0; t < times; t++) {
        let index = Math.random();
        let rare = 2;
        for (let i in this.p) {
          index -= this.p[i];
          if (index < 0) {
            rare = parseInt(i) + 2;
            break;
          }
        }
        maxRare = Math.max(maxRare, rare);
        if (t == 9 && maxRare == 2) {
          rare = 3;
        }
        let characterList = this.$store.state.$db.CharacterListArray.filter(character =>
          character.m_CharaID % 10 == 0 &&
          character.m_Rare == rare);

        let characterID = characterList[Math.floor(Math.random() * characterList.length)].m_CharaID;
        characterIDs.push(characterID);
      }
      this.summons.push({
        id: this.summons.length,
        maxRare: maxRare,
        characterIDs: characterIDs,
      });
    }
  }
};
</script>