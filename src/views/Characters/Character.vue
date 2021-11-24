<template lang="pug">
  v-list-item(:to="`/character/${character.m_CharaID}`")
    template(v-if="collection")
      v-list-item-avatar(size=48)
        CharaIcon(:id="id", :size="48")
      v-list-item-content
        v-list-item-subtitle {{$name(character.m_Name)}}
        v-list-item-subtitle.d-flex.align-center(v-if="!$s.characterIconFramed")
          img.d-inline(v-for="i in character.m_Rare+1", :key="`rare-icon-${i}`", :width="48/4", :height="48/4",
            :src="$asset.commonuiatlas.format('RareIcon')+'.png'")
          span.pr-1
          img(:width="48/2.5", :height="48/2.5",
            :src="$asset.commonuiatlas.format(classIcon)+'.png'")
          span.pr-1
          img(:width="48/2.5", :height="48/2.5",
            :src="$asset.commonuiatlas.format(elementIcon)+'.png'")

    template(v-else)
      v-list-item-avatar.mx-auto.mr-2.mr-md-4(:size="$size()")
        CharaIcon(:id="id", :size="$size()")

      v-list-item-content.mr-auto.ml-0(style="max-width: 384px")
        v-list-item-title.d-flex.align-center
          template(v-if="!$s.characterIconFramed")
            img.d-inline(v-for="i in character.m_Rare+1", :key="`rare-icon-${i}`", :width="$size()/4", :height="$size()/4",
              :src="$asset.commonuiatlas.format('RareIcon')+'.png'")
            span.pr-1
            img(:width="$size()/2.5", :height="$size()/2.5",
              :src="$asset.commonuiatlas.format(classIcon)+'.png'")
            span.pr-1
            img(:width="$size()/2.5", :height="$size()/2.5",
              :src="$asset.commonuiatlas.format(elementIcon)+'.png'")
            span.pr-1
          | {{$name(character.m_Name)}}

        v-list-item-subtitle
          Status(:status="status", divide=3)
</template>

<script>
import functions from '../Character/functions';
import define from '../../define';

export default {
  name: 'Character',
  props: {
    id: {},
    maxStatus: Boolean,
    collection: Boolean,
  },
  computed: {
    character() { return this.$db.CharacterList[this.id]; },
    status() {
      if (this.$s.characterShowMaxStatus || this.maxStatus) {
        const status = functions.status(
          this.id, [50, 90, 100][this.character.m_Rare - 2], 0,
          define.maxFriendship || 5
          , 10, [10, 10, 10], 0);
        return {
          HP: status.HP,
          ATK: status.ATK,
          MAT: status.MAT,
          DEF: status.DEF,
          MDF: status.MDF,
          SPD: status.SPD,
        };
      } else {
        return {
          HP: this.character.m_InitHp,
          ATK: this.character.m_InitAtk,
          MAT: this.character.m_InitMgc,
          DEF: this.character.m_InitDef,
          MDF: this.character.m_InitMDef,
          SPD: this.character.m_InitSpd,
        };
      }
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