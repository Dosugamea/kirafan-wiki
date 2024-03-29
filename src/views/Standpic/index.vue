<template lang="pug">
//- .py-4.text-center(v-if="loading")
//-   v-progress-circular(indeterminate=true, color="primary")
//- .pa-4(v-if="!character")
//-   KeyValue(:k="$t('No Character')")
div
  p.display.px-4.mb-10.primary--text {{ $t('Standpic') }}

  v-row(justify="center")
    v-dialog(v-model="dialog", max-width="290")
      v-card(v-if="!isLoadingDb")
        // TODO:i18n
        v-card-title.text-h5 DBをダウンロードしますか?
        v-card-text この処理には時間がかかることがあります
        v-card-actions
          v-spacer
          v-btn(color="green darken-1", text, @click="dialog = false") No
          v-btn(
            color="green darken-1",
            text,
            @click="loadAssetBundle()"
          ) Yes
      v-card(v-else)
        // TODO:i18n
        v-card-title.text-h5 DBダウンロード中...  
          v-progress-circular.ml-3(indeterminate)
        //- v-card-text 
        //-   v-progress-circular(indeterminate)
      

  v-row(no-gutters)
    v-col(cols=12, sm=12, lg=6)
      v-select.px-4(
        v-model="characterID",
        :label="$t('Character') + ` (${characters.length})`",
        dense,
        :items="characters.map((item, i) => ({ text: item.m_ADVCharaID, value: i }))"
      )
    v-col(cols=12, sm=6, lg=3)
      v-select.px-4(
        v-model="poseID",
        :label="$t('Pose') + ` (${poses.length})`",
        dense,
        :items="poses.map((item, i) => ({ text: i, value: i }))"
      )
    v-col(cols=12, sm=6, lg=3, style="position: relative")
      v-select.px-4(
        v-model="faceID",
        :label="$t('Face') + ` (${faces.length})`",
        dense,
        :items="faces.map((item, i) => ({ text: `${item.key[2]}`, value: i }))"
      )
      v-overlay(absolute, :value="loading", opacity=0)
        v-progress-circular(indeterminate, color="primary")

  v-list-item(target="_blank", :href="$const.sites.standpic.format(base)")
    v-list-item-title.primary--text {{ base }} - {{ $t('Assets.Title') }}
    v-list-item-action.ma-0: v-icon mdi-open-in-new

  v-divider.mb-4

  .px-4.float-right
    v-btn.ml-2(icon, @click="scale *= 0.8"): v-icon mdi-magnify-minus
    v-btn.ml-2(icon, @click="scale = 1"): v-icon mdi-magnify-close
    v-btn.ml-2(icon, @click="scale /= 0.8"): v-icon mdi-magnify-plus
    v-progress-circular.ml-4.mr-2(
      v-if="downloading",
      indeterminate,
      size="20",
      width="3"
    )
    v-btn.ml-2(v-else, icon, @click="downloadImg"): v-icon mdi-download

  div(style="width: 100%; overflow: hidden; position: relative",
   :style="{ height: scale * 1200 + 'px' }"
  )
    div(style="position: absolute; left: 50%; transform: translateX(-50%)")

      div(
          :style="{ transform: `scale(${scale}) translateY(${((scale - 1) * 50) / scale}%)` }",
          :key="id"
      )
        .d-inline-block
          canvas.standpic
</template>

<script>
import axios from "axios";

export default {
  name: "Standpic",
  props: ["id"],
  data() {
    return {
      index: [],
      loading: 0,
      poseID: 0,
      faceID: 0,
      scale: 1,
      characterID: 0,
      downloading: false,
      isLoadingDb: false,

      dialog: false,
    };
  },
  computed: {
    characters() {
      return this.$store.state.$db.ADVCharacterListArray.filter((character) =>
        character.m_ResourceBaseName
          .toLowerCase()
          .startsWith(this.id.toLowerCase())
      );
    },
    character() {
      return this.characters[this.characterID];
    },
    poses() {
      return this.character.m_Datas;
    },
    faces() {
      return this.index.filter(
        (item) => item.key[0] == "face" && item.key[1] == this.poseID
      );
    },
    pose() {
      return this.poses[this.poseID];
    },
    face() {
      return this.faces[this.faceID];
    },
    base() {
      return this.character.m_ResourceBaseName.toLowerCase();
    },
    base_row() {
      return this.character.m_ResourceBaseName;
    },
    faceContainerSize: () => 270,

    src() {
      return {
        standpic:
          "https://bucket-" +
          this.standpicPath() +
          "-asset.kirafan.cn/adv/standpic/" +
          this.base.toLowerCase() +
          "/" +
          this.base.toLowerCase() +
          "_standpic_" +
          this.poseID +
          "/" +
          this.base_row +
          "_StandPic_" +
          this.poseID +
          ".png",
        face:
          "https://bucket-" +
          (this.face ? this.face.path : "") +
          "-asset.kirafan.cn/adv/standpic/" +
          this.base +
          "/" +
          this.base +
          "_face_" +
          this.poseID +
          "_" +
          (((this.face && this.face.key[2]) || "undefined").toLowerCase() ||
            "undefined") +
          "/" +
          this.base_row +
          "_Face_" +
          this.poseID +
          "_" +
          (
            (this.face && this.face.key[2]) ||
            "undefined" ||
            "undefined"
          ).replace(/^(.)/, (_, p1) => p1.toUpperCase()) +
          ".png",
      };
    },
    style() {
      return {
        width: this.faceContainerSize + "px",
        height: this.faceContainerSize + "px",
        position: "absolute",
        left: this.pose.m_FaceX - this.faceContainerSize / 2 + "px",
        top: this.pose.m_FaceY - this.faceContainerSize / 2 + "px",
      };
    },
  },
  methods: {
    async load() {
      this.loading += 1;

      const db = this.standpicDB()[this.base];
      this.index = db.map((item) => {
        let key = item.img.split(this.base)[1].split("_").slice(1);
        return { key, path: item.path };
      });

      if (this.poseID >= this.poses.length) this.poseID = 0;
      if (this.faceID >= this.faces.length) this.faceID = 0;
      await this.showImg();
      this.loading = 0;
    },
    async loadAssetBundle() {
      this.isLoadingDb = true;

      let assetBundle;
      // if (this.$s.loadAssetbundle || false) {
      assetBundle = this.$store.state.$db.assetBundle;
      // } else {
      //   assetBundle = (
      //     await axios.get("https://database.kirafan.cn/assetBundle.json", {
      //       responseType: "json",
      //     })
      //   ).data;
      // }
      const standpicDB = {};

      assetBundle
        .filter((x) => x.name.match(/^adv\/standpic\//))
        // .map((x) => x.name)
        .forEach((x) => {
          let name_ = x.name;
          let path_ = x.path;
          let r = name_.match(
            /adv\/standpic\/(?<name>[^/]+)\/(?<img>[^/.]+).muast/
          );
          let name = r.groups.name;
          let img = r.groups.img;

          let path = path_[64];
          if (!standpicDB[name]) {
            standpicDB[name] = [];
          }
          // if (img.match("standpic")) {
          //   standpicDB[name].standpicPath = path;
          // }
          standpicDB[name].push({ img, path });
        });
      this.$store.state.$db.standpicDB = standpicDB;
      this.load();
      this.isLoadingDb = false;
      this.dialog = false;
    },
    async showImg() {
      this.loading = 1;
      const chara = new Image();
      const face = new Image();
      const imgLoadPromise = [this.imgOnload(chara, this.src.standpic)];

      let useFaceImg;

      if (this.face && this.face.key[2]) {
        imgLoadPromise.push(this.imgOnload(face, this.src.face));
        useFaceImg = true;
      } else {
        useFaceImg = false;
      }

      await Promise.all(imgLoadPromise);

      await this.$nextTick(() => {
        const canvas = document.querySelector(".standpic");
        canvas.width = chara.width;
        canvas.height = chara.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(chara, 0, 0);
        if (useFaceImg) {
          ctx.drawImage(
            face,
            this.pose.m_FaceX - face.width / 2,
            this.pose.m_FaceY - face.height / 2
          );
        }
        this.loading = 0;
      });
    },
    async downloadImg() {
      this.downloading = true;
      const canvas = document.querySelector(".standpic");
      const blob = await this.toBlob(canvas);
      this.fileDownloadFromBlob(
        blob,
        `${this.base}_face_${this.poseID}_${this.face && this.face.key[2]}` +
          ".png"
      );
      this.downloading = false;
    },

    toBlob(CanvasElement) {
      return new Promise((resolve, reject) => {
        try {
          CanvasElement.toBlob(resolve);
        } catch (e) {
          reject(e);
        }
      });
    },

    imgOnload(img, url) {
      // const CORS = false;
      return new Promise(async (resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = (e) => reject(e);
        const blob = (await axios.get(url, { responseType: "blob" })).data;
        img.src = URL.createObjectURL(blob);
      });
    },
    fileDownloadFromBlob(blob, fileName = "img.png") {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    },
    standpicDB() {
      return this.$store.state.$db.standpicDB;
    },
    standpicPath() {
      try {
        return (
          this.standpicDB()[this.base].find(
            (x) => x.img === this.base + "_standpic_" + String(this.poseID)
          ).path || ""
        );
      } catch {
        return "";
      }
    },
  },
  watch: {
    id() {
      this.characterID = 0;
    },
    base() {
      this.load();
    },
    poseID() {
      this.load();
    },
    faceID() {
      this.showImg();
    },
  },
  mounted() {
    if (this.standpicDB()) {
      this.load();
    } else {
      this.loadAssetBundle();
    }
    // if (this.$s.loadAssetbundle || false) {
    // } else {
    //   this.dialog = true;
    // }
  },
};
</script>
