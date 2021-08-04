<template lang="pug">
  v-btn(fab, outlined, color="primary", @click="play")
    v-icon(v-if="name!=voice.name || cue!=voice.cue") mdi-play
    v-progress-circular(v-else-if="voice.loading", indeterminate=true, color="primary")
    v-icon(v-else-if="voice.playing") mdi-volume-high
    v-icon(v-else) mdi-play
</template>

<script>
import voice from './voice';

export default {
  name: 'Voice',
  props: ['name', 'cue'],
  data() {
    return {
      voice: voice
    };
  },
  computed: {
    url() {
      return this.$asset.voice.format(this.name, this.cue) + '.mp3';
    }
  },
  methods: {
    play() {
      if (voice.audio) {
        voice.audio.pause();
      }
      if (voice.name == this.name && voice.cue == this.cue && (voice.loading || voice.playing)) {
        voice.loading = false;
        voice.playing = false;
        window.open(this.url, '_blank');
      }
      else {
        voice.name = this.name;
        voice.cue = this.cue;
        voice.audio = new Audio(this.url);
        voice.audio.oncanplay = () => {
          if (voice.loading) {
            voice.loading = false;
            voice.playing = true;
          }
        };
        voice.audio.onended = () => {
          voice.playing = false;
        };
        voice.loading = true;
        voice.playing = false;
        voice.audio.play();
      }
    },
  }
};
</script>