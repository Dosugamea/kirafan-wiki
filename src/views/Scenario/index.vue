<template lang="pug">
  .pa-4(v-if="!adv")
    KeyValue(:k="$t('No Scenario')")

  div(v-else)
    p.display.px-4.primary--text {{adv.m_Title}}
    template(v-if="adv.m_LibraryID!=-1")
      p.px-4.primary--text
        template(v-if="adv.m_ScriptTextName")
          span {{$t('Section').format(parseInt(adv.m_ScriptTextName.slice(-2)))}}
          span  — 
        span {{$name($store.state.$db.ADVLibraryList[adv.m_LibraryID].m_ListName)}}
      .px-4.mb-4
        .float-right
          v-btn(icon, :disabled="!scenarios[index+1]",
            @click="$router.replace(`/scenario/${scenarios[index+1].m_AdvID}`)")
            v-icon mdi-chevron-right
        div
          v-btn(icon, :disabled="!scenarios[index-1]",
            @click="$router.replace(`/scenario/${scenarios[index-1].m_AdvID}`)")
            v-icon mdi-chevron-left

    v-divider

    .pa-4(v-if="!adv.m_ScriptTextName")
      KeyValue(:k="$t('No Scenario')")
    .py-4.text-center(v-else-if="loading")
      v-progress-circular(indeterminate=true, color="primary")
    template(v-else)
      div(v-for="item in text", :key="`scenario-text-${item.m_id}`")
        Item(:item="get_voice_injected_item(item)")

      v-divider
      Ad(:key="`scenario-ad-${id}`")

      template(v-if="adv.m_LibraryID!=-1")
        v-divider.mb-4
        .px-4
          .float-right
            v-btn(icon, :disabled="!scenarios[index+1]",
              @click="$router.replace(`/scenario/${scenarios[index+1].m_AdvID}`)")
              v-icon mdi-chevron-right
          div
            v-btn(icon, :disabled="!scenarios[index-1]",
              @click="$router.replace(`/scenario/${scenarios[index-1].m_AdvID}`)")
              v-icon mdi-chevron-left
</template>

<script>
import axios from 'axios';
import Item from './Item';
import cri from "../../components/cri/acb";
import define from "../../define";
const fs = window.require("fs");
const Buffer = window.require("buffer").Buffer;

export default {
  name: 'Scenario',
  props: ['id'],
  components: { Item },
  data() {
    return {
      loading: 0,
      text: null,
      cue_list: {}
    };
  },
  computed: {
    adv() {
      return this.$store.state.$db.ADVList[this.id];
    },
    cue () {
      return this.adv.m_CueSheet;
    },
    categories() {
      return {
        1: { name: 'story', path: 'Story' },
        2: { name: 'event', path: 'Event' },
        3: { name: 'chara', path: 'CharaEvent' },
        4: { name: 'chara', path: 'CrossEvent' },
        5: { name: 'weapon', path: 'WeaponEvent' },
        6: { name: 'other', path: 'Other' },
        7: { name: 'writer', path: 'Writer' },
      };
    },
    scenarios() {
      let scenarios = this.adv.m_LibraryID == -1 ? [] :
        this.$store.state.$db.ADVListArray.filter(item => item.m_LibraryID == this.adv.m_LibraryID);
      for (let i = 0; i < scenarios.length; i++) {
        if (i > 0 && scenarios[i].m_ScriptTextName &&
          scenarios[i].m_ScriptTextName == scenarios[i - 1].m_ScriptTextName) {
          scenarios[i - 1].m_Title = scenarios[i - 1].m_Title
            .replace('（イントロ）', '')
            .replace('イントロ', '')
            .trim();
          scenarios.splice(i, 1);
          i -= 1;
        }
      }
      return scenarios;
    },
    index() {
      for (let i in this.scenarios) {
        if (this.scenarios[i].m_AdvID == this.id) {
          return parseInt(i);
        }
      }
      return undefined;
    }
  },
  methods: {
    get_voice_injected_item (item) {
      item.voice_url = this.cue_list[`${item.m_voiceLabel}_0.wav`];
      return item;
    },
    async get_audiobuffer_then_write(file_name, file_save_name) {
      const proxy_url =
        "https://krr-proxy.herokuapp.com/cri/?name=";
      // const rvh = await this.$lazy.rvh;

      await fetch(`${proxy_url}${file_name}`)
        .then((res) => res.arrayBuffer())
        .then((data) => {
          fs.writeFileSync(file_save_name, Buffer(data));
        });
    },
    get_event_seq(file_base_name) {
      return ( '00' + String(parseInt(file_base_name.slice(-2))-1)).slice(-2)
    },
    async get_acb_awb(file_base_name, file_save_name) {
      const cri_audio_acb = this.get_audiobuffer_then_write(
        `${file_base_name}.acb`, `${file_base_name}.acb`
      );
      const cri_audio_awb = this.get_audiobuffer_then_write(
        `${file_base_name}.awb`, `${file_save_name}.awb`
      );
      await Promise.all([cri_audio_acb, cri_audio_awb]);
    },
    async unpack_to_cue_list(file_base_name, file_save_name) {
      const key = define.cri_key;
      const namels_n_prom = await cri.acbParse(`${file_base_name}.acb`, key);
      namels_n_prom.map(([Name, prom]) => {
        const url = async () => {
          await prom().catch(() => {});
          const audio = fs.readFileSync(
            `./${file_save_name}/${Name}`
          );
          const blob = new Blob([audio], { type: "audio/wav" });
          return URL.createObjectURL(blob);
        };
        this.cue_list[Name] = { url: url, promise: true };
      });
    },
    async load() {
      if (!this.adv || !this.adv.m_ScriptTextName) {
        return;
      }
      this.loading += 1;
      const loading = this.loading;
      if (this.cue) {
        let file_save_name = this.cue;
        if (this.cue.includes('event')) {
          file_save_name = `event_000000000${this.get_event_seq(file_save_name)}`;
        }
        await this.get_acb_awb(this.cue, file_save_name);
        await this.unpack_to_cue_list(this.cue, file_save_name);
      }
      axios
        .get(this.$asset.advscript.format(
          this.categories[this.adv.m_Category].name,
          this.categories[this.adv.m_Category].path,
          this.adv.m_ScriptTextName) + '.json')
        .then(response => {
          if (loading != this.loading) {
            return;
          }
          this.text = response.data;
          this.loading = 0;
        });
    }
  },
  watch: {
    id() {
      this.load();
    }
  },
  mounted() {
    this.load();
  },
};
</script>

<style scoped>
.line {
  font-size: 80%;
  line-height: 1.5;
}
</style>