<template lang="pug">
  v-btn(fab, outlined, color="primary", @click="play")
    v-icon(v-if="name!=voice.name || cue!=voice.cue") mdi-play
    v-progress-circular(v-else-if="voice.loading", indeterminate=true, color="primary")
    v-icon(v-else-if="voice.playing") mdi-volume-high
    v-icon(v-else) mdi-play
</template>

<script>
import voice from "./voice";
export default {
  name: "Voice",
  props: ["name", "cue", "override_url"],
  data() {
    return {
      voice: voice,
    };
  },
  methods: {
    async url() {
      if (this.override_url) {
        if("promise" in this.override_url && this.override_url.promise) {
          return await this.override_url.url();
        } else {
          return await this.override_url.url;
        }
      }
      return (
        this.$asset.voice.format(this.name, this.cue) + ".mp3"
      );
    },
    async play() {
      const url = await this.url();
      if (voice.audio) {
        voice.audio.pause();
      }
      if (
        voice.name == this.name &&
        voice.cue == this.cue &&
        (voice.loading || voice.playing)
      ) {
        voice.loading = false;
        voice.playing = false;
        this.fileDownload(
          url,
          `${this.name}_${this.cue}.${
            this.override_url ? "wav" : url.split(".").pop()
          }`
        );
        // window.open(this.url, '_blank');
      } else {
        voice.name = this.name;
        voice.cue = this.cue;
        voice.audio = new Audio(url);
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
    fileDownload(url, fileName = "download.wav") {
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
    },
  },
};
</script>
