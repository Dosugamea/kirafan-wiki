<template lang="pug">
div
  v-divider.mb-4

  .float-right.pr-4
    v-btn(icon, @click="show = !show")
      v-icon(v-if="show") mdi-chevron-up
      v-icon(v-else) mdi-chevron-down

  .px-4.my-4(@click="show = true")
    p.title.primary--text {{ $t('Voice') }}
    KeyValue(:k="$t('CV')", :v="named.m_CVText", width="33%")

  v-expand-transition
    div(v-show="show")
      .py-4.text-center(v-if="loading")
        v-progress-circular(indeterminate, color="primary")
        div(v-if="config" v-html="$t('Hint:Download audio files directly')") 
        div(v-if="dl_error") {{ $t("failed download audio data") }}

      template(v-else)
        v-tabs(v-model="type", background-color="transparent", grow)
          v-tab(v-for="t in types", :key="`character-voice-tab-${t}`") {{ $t(`Character Voice Type.${t}`) }}

        v-tabs-items(v-model="type", touchless)
          v-tab-item.py-4(
            v-for="t in types",
            :key="`character-voice-tab-item-${t}`",
            touchless
           )
            template(v-if="t === 0 || t === 3")
              div(
                v-for="n, cueID in cues[t]",
                :key="`character-voice-cue-${cueID}`"
              )
                p.px-4.subtitle-1 {{ $t(`Character Voice Category.${cueID}`) }}
                Scroller(icon=56)
                  .ml-4.d-flex(
                    v-for="i in n",
                    :key="`character-voice-cue-${cueID}-${i}`"
                  )
                    Voice.mr-2(
                      :name="named.m_ResouceBaseName",
                      :cue="`voice_${cueID}_${i - 1}`"
                      :override_url="cue_url[`voice_${cueID}_${i - 1}.wav`]"
                    )
                    .d-flex.justify-center.flex-column
                      .line(
                        v-if="i == 1 && tweets[`voice_${cueID}`]",
                        v-html="tweets[`voice_${cueID}`].replace(/\\n/g, '<br>')"
                      )
                      .line(v-else) {{ `voice_${cueID}_${i - 1}` }}
                  .pl-4

            template(v-else-if="t === 4")
              .py-4.text-center(v-if="dl_error")
                div {{ $t("failed download audio data") }}
              .py-4.text-center(v-if="!isCardVoiceLoaded") 
                v-progress-circular(indeterminate, color="primary")
                div(v-if="config" v-html="$t('Hint:Download audio files directly')") 
                //- div(v-if="dl_error") {{ $t("failed download audio data") }}

              div(
                v-else
                v-for="chara, index in cues[t]",
                :key="`character-voice-cue-${chara.charaname + index}`"
              )
                p.px-4.subtitle-1 {{ getCharaName(chara.charaname) }}
                Scroller(icon=56)
                  .ml-4.d-flex(
                    v-for="data in chara.data",
                    :key="`character-voice-cue-${data.fileName}`"
                  )
                    Voice.mr-2(
                      :name="chara.charaname",
                      :cue="data.fileName.replace('.wav','')"
                      :override_url="data.url"
                    )
                    .d-flex.justify-center.flex-column
                      .line {{ data.fileName.replace(".wav","") }}
                  .pl-4

            template(v-else-if="t === 1 || t === 2")
              div(
                v-for="item, cat in cues[t]",
                :key="`character-voice-cue-${cat}`"
              )
                p.px-4.subtitle-1 {{ $t(`Character Voice Category.${cat}`) }}
                Scroller(icon=56)
                  template(v-for="n, cueID in item")
                    .ml-4.d-flex(
                      v-for="i in n",
                      :key="`character-voice-cue-${cueID}-${i}`"
                    )
                      Voice.mr-2(
                        :name="named.m_ResouceBaseName",
                        :cue="`voice_${cueID}_${i - 1}`"
                        :override_url="cue_url[`voice_${cueID}_${i - 1}.wav`]"
                      )

                      .d-flex.justify-center.flex-column
                        div(v-if="i === 1 && tweets[`voice_${cueID}`]")
                          .line(
                            v-html="tweets[`voice_${cueID}`].replace(/\\n/g, `<br>`)"
                          )
                        div(v-else)
                          .line {{ `voice_${cueID}_${i - 1}` }}
                  .pl-4
</template>

<script>
import axios from "axios";
import cri from "../../components/cri/acb";
import * as b64toArr from "base64-arraybuffer";
const fs = window.require("fs");
import define from "../../define";
const Buffer = window.require("buffer").Buffer;

export default {
  name: "Voices",
  props: ["id", "characterList"],
  data() {
    return {
      show: false,
      loading: 1,
      cues: {
        0: {},
        1: {
          Default: {},
        },
        2: {
          Room1: {},
          Room2: {},
          RoomAction: {},
          Town1: {},
          Town2: {},
          TownAction: {},
          Home: {},
        },
        3: {},
        4: {},
      },
      type: 0,
      cue_url: {},
      config: this.$s.downloadAudioFilesDirectly,
      dl_error: false,
      isCardVoiceLoaded: false,
      isCardVoiceLoading: false,
    };
  },
  computed: {
    named() {
      return this.$store.state.$db.NamedList[this.id];
    },
    types() {
      return [0, 1, 2, 3, 4];
    },
    tweets() {
      const tweets = {};
      const tweetList = this.$store.state.$db.TweetList.filter(
        (tweet) => tweet.m_NamedType == this.id
      );
      for (let tweet of tweetList) {
        tweets[tweet.m_VoiceCueName] = tweet.m_Text;
      }
      return tweets;
    },
  },
  methods: {
    getCharaName(charaname) {
      // Gochiusa_Syaro _  Alchemist4   _  A
      // {named}        _ {Class}{rare} _ {voice_number}
      const named = this.named.m_ResouceBaseName;
      const id = charaname.slice(-1);
      const rare = charaname.slice(-3, -2);
      const Class = charaname.replace(named + "_", "").slice(0, -3);
      return this.$t(`Star ${rare}`) + " " + this.$t(Class) + " " + id;
    },
    async get_audiobuffer_then_write(file_name) {
      const proxy_url =
        "https://script.google.com/macros/s/AKfycbybmAUWjnNpeHGJQVAaP5iz9t4Tmw1VJHmnyOPqNc9oDrvQ3dCAX_qgnB0l58RF4Btdyw/exec?raw_test=0&url=https://asset-krr-prd.star-api.com/";
      const rvh = await this.$lazy.rvh;

      await axios
        .get(`${proxy_url}${rvh}/CRI/${file_name}`)
        .then((res) => res.data)
        .then((data) => {
          fs.writeFileSync(file_name, Buffer(b64toArr.decode(data)));
        });
    },
    async get_acb_awb(file_base_name) {
      const cri_audio_acb = this.get_audiobuffer_then_write(
        `${file_base_name}.acb`
      );
      const cri_audio_awb = this.get_audiobuffer_then_write(
        `${file_base_name}.awb`
      );
      await Promise.all([cri_audio_acb, cri_audio_awb]);
    },
    async unpack_then_return_url(file_base_name) {
      const key = define.cri_key;
      const namels_n_prom = await cri.acbParse(`${file_base_name}.acb`, key);

      const output = namels_n_prom.map(([Name, prom]) => {
        const url = async () => {
          await prom().catch(() => {});
          const audio = fs.readFileSync(`./${file_base_name}/${Name}`);
          const blob = new Blob([audio], { type: "audio/wav" });
          return URL.createObjectURL(blob);
        };
        this.cue_url[Name] = { url, promise: true };
        return { name: Name, type: "wav", new: false, link: url };
      });
      return output;
    },
    async get_response(url) {
      // const proxy =
      //   "https://script.google.com/macros/s/AKfycbxhB1lvbXgYT_Od06RFNwsRBXMY1-SI9wm4reim2s2KX-B4mstwrs_SEISV_C6k7a5M/exec?url=";
      const target_url = url;
      return (await fetch(target_url)).status;
    },
    async isLatestVersion(chara_name) {
      const file_base_name = `Voice_${chara_name}`;
      const version = this.$store.state.$db.CRIFileVersion[file_base_name]
        .m_Version;
      const response = await this.get_response(
        this.$asset.voice.format(chara_name, String(version))
      );
      return response === 200;
    },
    async get_index() {
      const chara_name = this.named.m_ResouceBaseName;

      if (this.config) {
        const file_base_name = `Voice_${chara_name}`;

        const isLatestVersion = await this.isLatestVersion(chara_name);
        if (!isLatestVersion) {
          await this.get_acb_awb(file_base_name);
          return await this.unpack_then_return_url(file_base_name);
        }
      }
      return await axios
        .get(
          this.$asset.voice.format(this.named.m_ResouceBaseName, "index.json")
        )
        .then((res) => res.data)
        .catch(async () => {
          const isLatestVersion = await this.isLatestVersion(chara_name);
          if (!isLatestVersion) {
            this.dl_error = true;
          }
        });
    },
    load() {
      this.loading += 1;
      const loading = this.loading;
      this.get_index().then((response) => {
        if (loading != this.loading) {
          return;
        }
        const cues = {};
        response.forEach((item) => {
          let cueID = item.name.split("_")[1];
          if (cues[cueID]) {
            cues[cueID] += 1;
          } else {
            cues[cueID] = 1;
          }
        });
        const cueCategory = this.cues;
        for (let cueID in cues) {
          if (cueID[0] == "0") {
            if (cueID >= 14) {
              cueCategory[2].Home[cueID] = cues[cueID];
            } else {
              cueCategory[0][cueID] = cues[cueID];
            }
          } else if (cueID[0] == "1") {
            cueCategory[1].Default[cueID] = cues[cueID];
          } else if (cueID[0] == "2") {
            cueCategory[2].TownAction[cueID] = cues[cueID];
          } else if (cueID[0] == "3") {
            if (cueID.length == 3) {
              if (cueID < 304) {
                cueCategory[2].Room1[cueID] = cues[cueID];
              } else if (cueID < 308) {
                cueCategory[2].Town1[cueID] = cues[cueID];
              } else if (cueID < 312) {
                cueCategory[2].Town2[cueID] = cues[cueID];
              } else if (cueID < 316) {
                cueCategory[2].Room2[cueID] = cues[cueID];
              } else {
                cueCategory[2].RoomAction[cueID] = cues[cueID];
              }
            } else {
              if (cueID[1] == 0) {
                cueCategory[2].Room1[cueID] = cues[cueID];
              } else if (cueID[1] == 1) {
                cueCategory[2].Town1[cueID] = cues[cueID];
              } else if (cueID[1] == 2) {
                cueCategory[2].Town2[cueID] = cues[cueID];
              } else if (cueID[1] == 3) {
                cueCategory[2].Room2[cueID] = cues[cueID];
              }
            }
          } else if (cueID[0] == "4") {
            cueCategory[3][cueID] = cues[cueID];
          }
        }
        const tmp = this.cues[4];
        this.cues = cueCategory;
        this.cues[4] = tmp;
        this.loading = 0;
      });
    },
    reset() {
      this.show = false;
      this.config = this.$s.downloadAudioFilesDirectly;
      this.loading = 1;
      this.cues = {
        0: {},
        1: {
          Default: {},
        },
        2: {
          Room1: {},
          Room2: {},
          RoomAction: {},
          Town1: {},
          Town2: {},
          TownAction: {},
          Home: {},
        },
        3: {},
        4: {},
      };
      this.type = 0;
      this.cue_url = {};
      this.dl_error = false;
      this.isCardVoiceLoaded = false;
      this.isCardVoiceLoading = false;
    },
    async loadCardVoice() {
      // this.isCardVoiceLoaded = true;
      // this.load();
      if (this.isCardVoiceLoaded || this.isCardVoiceLoading) return;
      this.isCardVoiceLoading = true;
      const charas = this.$store.state.$db.CRIFileVersionArray.filter((x) =>
        x.m_FileName.startsWith("Voice_" + this.named.m_ResouceBaseName + "_")
      ).map((x) => x.m_FileName);
      const db = (
        await Promise.allSettled(
          charas.map(async (file_base_name) => {
            const name = file_base_name.replace("Voice_", "");

            if (this.config) {
              const isLatestVersion = await this.isLatestVersion(name);
              if (!isLatestVersion) {
                return this.get_acb_awb(file_base_name)
                  .then(() => this.unpack_then_return_url(file_base_name))
                  .then((res) => {
                    return { name, data: res };
                  });
              }
            }
            return axios
              .get(this.$asset.voice.format(name, "index.json"))
              .then((res) => {
                return { name, data: res.data };
              })
              .catch(async () => {
                const isLatestVersion = await this.isLatestVersion(name);
                if (!isLatestVersion) {
                  this.dl_error = true;
                }

                throw new Error(`failed download`);
              });
          })
        )
      )
        .filter((x) => {
          const output = x.status === "fulfilled";
          // if (!output) {
          //   this.dl_error = true;
          // }
          return output;
        })
        .map((x) => x.value);
      // } else {
      //   db = await Promise.all(
      //     charas.map(async (x) => {
      //       const name = x.replace("Voice_", "");
      //       return axios
      //         .get(this.$asset.voice.format(name, "index.json"))
      //         .then((res) => {
      //           return { name, data: res.data };
      //         });
      //     })
      //   );
      // }
      // [{name:string , data:[{fileName:string , url:string}]}]
      const cue = db.map((x) => {
        const charaname = x.name.replace("Voice_", "");
        const data = x.data.map((y) => {
          const fileName = y.name;
          const url = y.link;
          return { fileName, url };
        });
        return { charaname, data };
      });
      this.cues[4] = cue;

      this.isCardVoiceLoading = false;
      this.isCardVoiceLoaded = true;
    },
  },
  watch: {
    show() {
      if (this.show) {
        this.load();
      }
    },
    id() {
      this.reset();
    },
    type() {
      if (this.type === 4) {
        this.loadCardVoice();
      }
    },
    $route: function(to, from) {
      if (to.path !== from.path) {
        if (!fs.existsSync(`./Voice_${this.named.m_ResouceBaseName}`)) {
          this.reset();
        }
      }
    },
  },
  mounted() {
    this.show = false;
    window.d = this;
  },
};
</script>

<style scoped>
.line {
  font-size: 80%;
  width: fit-content;
  white-space: nowrap;
}
</style>
