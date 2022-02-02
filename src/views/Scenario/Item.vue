<template lang="pug">
  v-list-item
    v-list-item-avatar.mx-auto.mr-2.mr-md-4(:size="$size()", tile, 
      v-if="character", @click="$router.push(`/standpic/${character.m_ResourceBaseName}`)")

      v-img(v-if="character.m_Datas[0].m_FaceReferenceImageType==0 && character.m_Datas[0].m_FacePattern!=-1",
        :src="$asset.standpic.format(base, `${base}_face_0_default`) + '.png'")
      div(v-else-if="character.m_Datas[0].m_FaceReferenceImageType==0 && character.m_Datas[0].m_FacePattern==-1",
        :style="style('standpic_0')")
      div(v-else-if="character.m_Datas[0].m_FaceReferenceImageType==1",
        :style="style('face_0_default')")

    v-list-item-avatar.mx-auto.mr-2.mr-md-4(:size="$size()", tile, v-else)
    .mr-3(v-if="show_voice()")
      voice(
        v-if="voice_url"
        :name="name",
        :cue="text.replace('br', '').replace(/\s+/g, '')",
        :override_url="voice_url"
      )
      //- XXX:サイズがわからないので、実体を非表示としておいておく
      Voice(
        v-else
        style="visibility: hidden;"
      )

    v-list-item-content.mr-auto.ml-0.py-1(style="max-width: 384px")
      v-list-item-subtitle.primary--text(v-html="name")
      div(v-html="text", :style="{'line-height': 1.5, 'font-size': $vuetify.breakpoint.xsOnly ? '70%': null}")
        //- p {{item}}
        //- p {{character}}
</template>

<script>
export default {
  name: 'Item',
  props:["item", "show_voice"],
  data() {
    return {
      voice_url: undefined,
    };
  },
  computed: {
    id() {
      return this.item.m_charaName.split('$')[1] || this.item.m_charaName;
    },
    voice () {
      return this.$store.state.$db.VoiceList[this.item.m_VoiceID];
    },
    character() {
      return this.$store.state.$db.ADVCharacterList[this.id];
    },
    name() {
      return this.item.m_charaName.indexOf('$') == -1 ?
        (this.character ? this.character.m_DisplayName : this.item.m_charaName) :
        this.item.m_charaName.split('$')[0];
    },
    position() {
      let x = this.character.m_Datas[0].m_FaceX;
      let y = this.character.m_Datas[0].m_FaceY;
      let base = this.$size() * this.scale / 2;
      return `${base - x}px ${base - y}px`;
    },
    scale() {
      return 200 / this.$size();
    },
    base() {
      return this.character.m_ResourceBaseName.toLowerCase();
    },
    text() {
      return this.item.m_text
        .replace(/\n/g, '<br>')
        .replace(/<color=(.*?)>(.*?)<\/color>/g, function (_, color, text) {
          return `<span style="color: ${color}">${text}</span>`;
        });
    },
  },
  methods: {
    style(face) {
      return {
        'min-height': `${this.$size() * this.scale}px`,
        'min-width': `${this.$size() * this.scale}px`,
        'transform': `scale(${1 / this.scale})`,
        'background-image': `url(${this.$asset.standpic.format(
          this.base,
          `${this.base}_${face}`
        )}.png)`,
        'background-position': this.position,
        // 'background-size': '100%',
      };
    },
  },
  async mounted(){
    if(this.item.voice_url){
      this.voice_url = await this.item.voice_url;
    }
  }
};
</script>