<template lang="pug">
  div
    v-divider.mb-4
    p.title.px-4.primary--text {{$t('Flavor Text')}}
    v-list-item
      Voice.mx-auto.mr-2.mr-md-4(:name="name", cue="voice_flavor_0")
      v-list-item-content.mr-auto.ml-0(style="max-width: 384px")
        div(v-html="text(flavor.m_FlavorText)", :style="{'line-height': 1.5, 'font-size': $vuetify.breakpoint.xsOnly ? '70%': null}")

    template(v-if="flavors.length")
      v-divider.mb-4

      .float-right.pr-4
        v-btn(icon, @click="show=!show")
          v-icon(v-if="show") mdi-chevron-up
          v-icon(v-else) mdi-chevron-down
      p.title.px-4.primary--text(@click="show=true") {{$t('Creamate Commu Text')}}

      v-expand-transition
        div(v-show="show")
          v-list-item(v-for="flavor, i in flavors", :key="`character-flavor-${i}`")
            v-list-item-avatar.mx-auto.mr-0(:size="$size(32)", color="primary")
              span.white--text {{flavor.m_ConditionId%10}}
            v-list-item-avatar.mx-2.mr-md-4(:size="$size(32)")
              span.primary--text {{$t(`Flavor Condition Types.${flavor.m_ConditionType}`)}}
            v-list-item-content.mr-auto.ml-0(style="max-width: 384px")
              div(v-html="text(flavor.m_Body)", :style="{'line-height': 1.5, 'font-size': $vuetify.breakpoint.xsOnly ? '70%': null}")

</template>

<script>
export default {
  name: 'Flavor',
  props: ['id'],
  data() {
    return {
      show: false,
    };
  },
  methods: {
    text(str) {
      return str
        .replace(/<wait=.*?>/g, '')
        .replace(/<page>/g, '')
        .replace(/\n/g, '<br>');
    },
  },
  computed: {
    flavor() {
      return this.$store.state.$db.CharacterFlavorText[this.id];
    },
    flavors() {
      return this.$store.state.$db.FlavorsArray.filter(flavor => flavor.m_CharaID == this.id);
    },
    character() { return this.$store.state.$db.CharacterList[this.id]; },
    index() {
      return 'ABCDEFG'[this.$store.state.$db.CharacterListArray
        .filter(character =>
          character.m_CharaID % 10 == 0 &&
          character.m_NamedType == this.character.m_NamedType &&
          character.m_Rare == this.character.m_Rare &&
          character.m_Class == this.character.m_Class)
        .map(character => character.m_CharaID).indexOf(this.character.m_CharaID)];
    },
    class() {
      return ['Fighter', 'Magician', 'Priest', 'Knight', 'Alchemist'][this.character.m_Class];
    },
    name() {
      return `${this.$store.state.$db.NamedList[this.character.m_NamedType].m_ResouceBaseName}_${this.class}${this.character.m_Rare + 1}_${this.index}`;
    },
  }
};
</script>