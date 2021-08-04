<template lang="pug">
  div(v-if="named")
    v-avatar(:size="size", v-if="namedCharacter.originalCharaID", tile)
      v-img(:src="$asset.originalcharactericon.format(namedCharacter.originalCharaID)+'.jpg'")
    v-avatar(:size="size", v-else)
      v-img(:src="$asset.charaicon.format(namedCharacter.primaryCharacterID)+'.jpg'")
  div(v-else-if="original")
    v-avatar(:size="size", tile)
      v-img(:src="$asset.originalcharactericon.format(id)+'.jpg'")
  div(v-else)
    div(v-if="frame||$s.characterIconFramed", :style="style")
    v-avatar(v-else, :size="size")
      v-img(:src="$asset.charaicon.format(this.id)+'.jpg'")
</template>

<script>
export default {
  name: 'CharaIcon',
  props: {
    id: {},
    size: {},
    named: Boolean,
    original: Boolean,
    frame: Boolean,
  },
  computed: {
    style() {
      return {
        width: this.size + 'px',
        height: this.size + 'px',
        'background-image': `
          url(${this.$asset.commonuiatlas.format(this.elementIcon)}.png),
          url(${this.$asset.commonuiatlas.format(this.classIcon)}.png),
          url(${this.$asset.commonuiatlas.format(this.frameIcon)}.png),
          url(${this.$asset.charaicon.format(this.id)}.jpg)
        `,
        'background-size': `
          25%,
          25%,
          100%,
          100%
        `,
        'background-position': `
          3% 3%,
          97% 97%,
          0%,
          0%
        `,
      };
    },
    character() {
      return this.$db.CharacterList[this.id];
    },
    namedCharacter() {
      return this.$db.NamedList[this.id];
    },
    frameIcon() {
      return {
        2: 'CharaIconFrame03',
        3: 'CharaIconFrame04',
        4: 'CharaIconFrame05',
      }[this.character.m_Rare];
    },
    classIcon() {
      return {
        0: 'ClassIconFighter',
        1: 'ClassIconMagician',
        2: 'ClassIconPriest',
        3: 'ClassIconKnight',
        4: 'ClassIconAlchemist',
      }[this.character.m_Class];
    },
    elementIcon() {
      return {
        0: 'ElementIconFire',
        1: 'ElementIconWater',
        2: 'ElementIconEarth',
        3: 'ElementIconWind',
        4: 'ElementIconMoon',
        5: 'ElementIconSun',
      }[this.character.m_Element];
    },
  }
};
</script>