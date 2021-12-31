<template lang="pug">
  div
    v-divider.mb-4
    .float-right.pr-4
      v-btn(icon, @click="show=!show")
        v-icon(v-if="show") mdi-chevron-up
        v-icon(v-else) mdi-chevron-down

    p.title.px-4.primary--text(@click="show=true") {{$t('Illust')}}

    v-expand-transition
      v-row.px-2.mt-n2.mb-2(no-gutters, v-show="show")
        template(v-if="character.m_Rare==2")
          v-col(cols=6).pa-2
            a(:href="$asset.characard.format(evolutionID(0))+'.png'", target="_blank")
              v-img(:aspect-ratio="3/4", :src="$asset.characard.format(evolutionID(0))+'.jpg'")
          v-col(cols=6).pa-2
            a(:href="$asset.charaillustchara.format(evolutionID(0))+'.png'", target="_blank")
              v-img(:aspect-ratio="3/4", :src="$asset.charaillustchara.format(evolutionID(0))+'.jpg'")

          v-col(cols=3, sm=4).pa-2
          v-col(cols=3, sm=2).pa-2
            a(:href="$asset.mergedcharaicon.format(evolutionID(0))+'.png'", target="_blank")
              v-img(:aspect-ratio="1", :src="$asset.mergedcharaicon.format(evolutionID(0))+'.png'")
          v-col(cols=3, sm=2).pa-2
            a(:href="$asset.charaicon.format(evolutionID(0))+'.png'", target="_blank")
              v-img(:aspect-ratio="1", :src="$asset.charaicon.format(evolutionID(0))+'.png'")
          v-col(cols=3, sm=4).pa-2

        template(v-else-if="character.m_Rare==3")
          v-col(cols=6).pa-2
            a(:href="$asset.characard.format(evolutionID(0))+'.png'", target="_blank")
              v-img(:aspect-ratio="3/4", :src="$asset.characard.format(evolutionID(0))+'.jpg'")
          v-col(cols=6).pa-2
            a(:href="$asset.characard.format(evolutionID(1))+'.png'", target="_blank")
              v-img(:aspect-ratio="3/4", :src="$asset.characard.format(evolutionID(1))+'.jpg'")
          v-col(cols=6).pa-2
            a(:href="$asset.charaillustchara.format(evolutionID(0))+'.png'", target="_blank")
              v-img(:aspect-ratio="3/4", :src="$asset.charaillustchara.format(evolutionID(0))+'.jpg'")
          v-col(cols=6).pa-2
            a(:href="$asset.charaillustchara.format(evolutionID(1))+'.png'", target="_blank")
              v-img(:aspect-ratio="3/4", :src="$asset.charaillustchara.format(evolutionID(1))+'.jpg'")

          v-col(cols=0, sm=2)
          v-col(cols=3, sm=2).pa-2
            a(:href="$asset.mergedcharaicon.format(evolutionID(0))+'.png'", target="_blank")
              v-img(:aspect-ratio="1", :src="$asset.mergedcharaicon.format(evolutionID(0))+'.png'")
          v-col(cols=3, sm=2).pa-2
            a(:href="$asset.charaicon.format(evolutionID(0))+'.png'", target="_blank")
              v-img(:aspect-ratio="1", :src="$asset.charaicon.format(evolutionID(0))+'.png'")
          v-col(cols=3, sm=2).pa-2
            a(:href="$asset.mergedcharaicon.format(evolutionID(1))+'.png'", target="_blank")
              v-img(:aspect-ratio="1", :src="$asset.mergedcharaicon.format(evolutionID(1))+'.png'")
          v-col(cols=3, sm=2).pa-2
            a(:href="$asset.charaicon.format(evolutionID(1))+'.png'", target="_blank")
              v-img(:aspect-ratio="1", :src="$asset.charaicon.format(evolutionID(1))+'.png'")
          v-col(cols=0, sm=2)
        
        template(v-else-if="character.m_Rare==4")
          v-col(cols=6).pa-2
            a(:href="$asset.characard.format(evolutionID(0))+'.png'", target="_blank")
              v-img(:aspect-ratio="3/4", :src="$asset.characard.format(evolutionID(0))+'.jpg'")
          v-col(cols=6).pa-2
            a(:href="$asset.characard.format(evolutionID(1))+'.png'", target="_blank")
              v-img(:aspect-ratio="3/4", :src="$asset.characard.format(evolutionID(1))+'.jpg'")
          v-col(cols=6).pa-2
            a(:href="$asset.charaillustfull.format(evolutionID(0))+'.png'", target="_blank")
              v-img(:aspect-ratio="3/4", :src="$asset.charaillustfull.format(evolutionID(0))+'.jpg'")
          v-col(cols=6).pa-2
            a(:href="$asset.charaillustfull.format(evolutionID(1))+'.png'", target="_blank")
              v-img(:aspect-ratio="3/4", :src="$asset.charaillustfull.format(evolutionID(1))+'.jpg'")
          v-col(cols=6).pa-2
            a(:href="$asset.charaillustchara.format(evolutionID(0))+'.png'", target="_blank")
              v-img(:aspect-ratio="3/4", :src="$asset.charaillustchara.format(evolutionID(0))+'.jpg'")
          v-col(cols=6).pa-2
            a(:href="$asset.charaillustchara.format(evolutionID(1))+'.png'", target="_blank")
              v-img(:aspect-ratio="3/4", :src="$asset.charaillustchara.format(evolutionID(1))+'.jpg'")

          v-col(cols=0, sm=2)
          v-col(cols=3, sm=2).pa-2
            a(:href="$asset.mergedcharaicon.format(evolutionID(0))+'.png'", target="_blank")
              v-img(:aspect-ratio="1", :src="$asset.mergedcharaicon.format(evolutionID(0))+'.png'")
          v-col(cols=3, sm=2).pa-2
            a(:href="$asset.charaicon.format(evolutionID(0))+'.png'", target="_blank")
              v-img(:aspect-ratio="1", :src="$asset.charaicon.format(evolutionID(0))+'.png'")
          v-col(cols=3, sm=2).pa-2
            a(:href="$asset.mergedcharaicon.format(evolutionID(1))+'.png'", target="_blank")
              v-img(:aspect-ratio="1", :src="$asset.mergedcharaicon.format(evolutionID(1))+'.png'")
          v-col(cols=3, sm=2).pa-2
            a(:href="$asset.charaicon.format(evolutionID(1))+'.png'", target="_blank")
              v-img(:aspect-ratio="1", :src="$asset.charaicon.format(evolutionID(1))+'.png'")
          v-col(cols=0, sm=2)
</template>

<script>
export default {
  name: 'Illust',
  props: ['id'],
  data() {
    return {
      show: false,
    };
  },
  computed: {
    character() {
      return this.$store.state.$db.CharacterList[this.id];
    },
  },
  methods: {
    evolutionID(evolution) {
      return this.id - this.id % 10 + evolution;
    },
  },
};
</script>