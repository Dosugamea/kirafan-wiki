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

      template(v-else)
        v-tabs(v-model="type", background-color="transparent", grow)
          v-tab(v-for="t in types", :key="`character-voice-tab-${t}`") {{ $t(`Character Voice Type.${t}`) }}

        v-tabs-items(v-model="type", touchless)
          v-tab-item.py-4(
            v-for="t in types",
            :key="`character-voice-tab-item-${t}`",
            touchless
          )
            template(v-if="t == 0 || t == 3")
              div(
                v-for="(n, cueID in cues[t])",
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
                    )
                    .d-flex.justify-center.flex-column
                      .line(
                        v-if="i == 1 && tweets[`voice_${cueID}`]",
                        v-html="tweets[`voice_${cueID}`].replace(/\\n/g, '<br>')"
                      )
                      .line(v-else) {{ `voice_${cueID}_${i - 1}` }}
                  .pl-4

            template(v-else-if="t == 1 || t == 2")
              div(
                v-for="(item, cat in cues[t])",
                :key="`character-voice-cue-${cat}`"
              )
                p.px-4.subtitle-1 {{ $t(`Character Voice Category.${cat}`) }}
                Scroller(icon=56)
                  template(v-for="(n, cueID in item)")
                    .ml-4.d-flex(
                      v-for="i in n",
                      :key="`character-voice-cue-${cueID}-${i}`"
                    )
                      Voice.mr-2(
                        :name="named.m_ResouceBaseName",
                        :cue="`voice_${cueID}_${i - 1}`"
                      )
                      .d-flex.justify-center.flex-column
                        .line(
                          :v-if="i == 1 && tweets[`voice_${cueID}`]",
                          v-html="tweets[`voice_${cueID}`].replace(/\\n/g, '<br>')"
                        )
                        .line(v-else) {{ `voice_${cueID}_${i - 1}` }}
                  .pl-4
</template>

<script>
import axios from "axios";
import cri from "@/components/cri";

export default {
  name: "Voices",
  props: ["id"],
  data() {
    return {
      show: false,
      loading: 1,
      cues: null,
      type: 0,
    };
  },
  computed: {
    named() {
      return this.$db.NamedList[this.id];
    },
    types() {
      return [0, 1, 2, 3];
    },
    tweets() {
      const tweets = {};
      const tweetList = this.$db.TweetList.filter(
        (tweet) => tweet.m_NamedType == this.id
      );
      for (let tweet of tweetList) {
        tweets[tweet.m_VoiceCueName] = tweet.m_Text;
      }
      return tweets;
    },
  },
  methods: {
    async get_index() {
      return await axios.get(
        this.$asset.voice.format(this.named.m_ResouceBaseName, "index.json")
      );
    },
    load() {
      this.loading += 1;
      const loading = this.loading;
      this.get_index().then((response) => {
        if (loading != this.loading) {
          return;
        }
        const cues = {};
        response.data.forEach((item) => {
          let cueID = item.name.split("_")[1];
          if (cues[cueID]) {
            cues[cueID] += 1;
          } else {
            cues[cueID] = 1;
          }
        });
        const cueCategory = {
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
        };
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
        this.cues = cueCategory;
        this.loading = 0;
      });
    },
  },
  watch: {
    show() {
      if (this.show && !this.cues) {
        this.load();
      }
    },
    id() {
      if (this.show) {
        this.load();
      } else {
        this.cues = null;
        this.loading += 1;
      }
    },
  },
  mounted() {
    console.log("cri :>> ", cri);
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
