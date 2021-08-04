<template lang="pug">
  v-app(color="secondary", :style="{'font-family': font}")
    v-app-bar(app, clipped-left, clipped-right, color="secondary", height=56, elevation=0)
      
      v-btn.hidden-sm-and-up(icon, @click="navigation=!navigation"): v-icon mdi-menu
      v-toolbar-title.px-2.px-sm-4 {{title}} 
      v-spacer
      .hidden-xs-only
        Theme
        v-btn(icon, @click="$root.$emit('dark')"): v-icon mdi-theme-light-dark
        v-menu
          template(v-slot:activator="{on}")
            v-btn(icon, v-on="on"): v-icon mdi-translate
          v-list
            v-list-item(@click="setLocale('ja')") 日本語
            v-list-item(@click="setLocale('zh')") 中文
            v-list-item(@click="setLocale('en')") English
            v-list-item(@click="setLocale('ko')") 한국어
      v-btn.hidden-sm-and-up(icon, @click="collection=!collection"): v-icon mdi-star

    v-navigation-drawer(app, clipped,
      v-model="navigation", mobile-break-point=512,
      :mini-variant="$vuetify.breakpoint.smOnly||$vuetify.breakpoint.mdOnly", mini-variant-width=64)

      v-toolbar.hidden-sm-and-up(color="secondary", elevation=0)
        v-btn(icon, @click="navigation=!navigation"): v-icon mdi-chevron-left
        v-spacer
        Theme
        v-btn(icon, @click="$root.$emit('dark')"): v-icon mdi-theme-light-dark
        v-menu
          template(v-slot:activator="{on}")
            v-btn(icon, v-on="on"): v-icon mdi-translate
          v-list
            v-list-item(@click="setLocale('ja')") 日本語
            v-list-item(@click="setLocale('zh')") 中文
            v-list-item(@click="setLocale('en')") English
            v-list-item(@click="setLocale('ko')") 한국어

      Navigation(:style="{height: `calc(100vh - 56px)`}")

    v-navigation-drawer(app, clipped, right
      v-model="collection", mobile-break-point=512, touchless,
      :mini-variant="$vuetify.breakpoint.smOnly", mini-variant-width=64)

      v-toolbar.hidden-sm-and-up(color="secondary", elevation=0)
        v-toolbar-title {{$t('Collection')}}
        v-spacer
        v-btn(icon, @click="collection=!collection"): v-icon mdi-chevron-right
      
      div(v-if="!databaseStatus")
        .pa-8.text-center
          v-progress-circular(indeterminate=true, color="primary")
      Collection(v-else)

    v-content
      .pa-8.text-center(v-if="databaseStatus==0")
        v-progress-circular(color="primary", rotate=-90,
          :indeterminate="!databaseProgress", :value="databaseProgress.loaded / databaseProgress.total * 100")
        .pa-2.caption
          span Loading Database...
          span(v-show="databaseProgress")  {{databaseProgress.loaded}} / {{databaseProgress.total}}
      div(v-else, style="max-width: 768px; margin: auto; padding: 32px 0 80px 0")
        keep-alive: router-view
        //- v-divider
        //- Ad(:key="$router.toString()", type="display")


    v-fade-transition
      v-btn(fab, color="primary", style="position: fixed; bottom: 16px; ", v-show="this.$route.params.id",
        :style="{left: `${fixedPosition(false)}px`}", @click="setCollection")
        v-icon(v-if="getCollection(magic)") mdi-heart
        v-icon(v-else) mdi-heart-outline

    v-fade-transition
      v-btn(fab, color="primary", style="position: fixed; bottom: 16px; ", v-show="this.$route.name!='Home'",
        :style="{right: `${fixedPosition(true)}px`}", @click="$vuetify.goTo(0)")
        v-icon mdi-chevron-up

    v-snackbar(v-model="snackbar", :timeout="0")
      .d-block.py-2(style="width: 100%")
        .text-center(v-if="databaseStatus==2")
          v-progress-circular(color="primary", rotate=-90,
            :indeterminate="!databaseProgress", :value="databaseProgress.loaded / databaseProgress.total * 100")
          .pa-2.caption
            span Loading Database...
            span(v-show="databaseProgress")  {{databaseProgress.loaded}} / {{databaseProgress.total}}
        
        .text-center.mb-2(v-show="databaseStatus==3") {{$t('Updated.Database')}}
        .text-center.mb-2(v-show="applicationStatus") {{$t('Updated.Application')}}

        v-btn.mx-0(text, block, @click="reload()", v-show="refresh") {{$t('Refresh')}}
        v-btn.mx-0(text, block, @click="snackbar=false") {{$t('Close')}}
    Clea(:show="cleaVisibility")
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      refresh: false,
      snackbar: false,
      databaseStatus: 0, // 0: no db; 1: ok, 2: updating, 3: updated
      databaseProgress: 0,
      applicationStatus: false,

      navigationMini: true,
      navigation: this.$vuetify.breakpoint.smAndUp,
      collection: this.$vuetify.breakpoint.smAndUp,
      cleaVisibility: false,
      magic: 0,
    };
  },
  computed: {
    title() {
      return [
        this.$s.appTitleShowID && this.$route.params.id,
        this.$t(this.$route.name),
        this.$vuetify.breakpoint.mdAndUp && (this.$t('KiraFan Wiki') + ' Forked'),
      ].filter(x => x).join(' — ');
    },
    font() {
      return {
        ja: [
          'Avenir',
          'Verdana',
          'Helvetica',
          'ヒラギノ角ゴシック',
          'Hiragino Sans',
          'ヒラギノ角ゴ ProN W3',
          'Hiragino Kaku Gothic ProN',
          'メイリオ',
          'Meiryo',
          'ＭＳ Ｐゴシック',
          'MS PGothic',
          'sans-serif'
        ].join(),
        zh: [
          'Avenir',
          'Verdana',
          'Helvetica',
          'Hiragino Sans GB',
          'Source Han Sans CN',
          'WenQuanYi Micro Hei',
          'Microsoft Yahei',
          'sans-serif'
        ].join(),
        en: [
          'Avenir',
          'Verdana',
          'Helvetica',
          'Verdana',
          'Arial',
          'sans-serif'
        ].join()
      }[this.$i18n.locale];
    },
  },
  methods: {
    setLocale(lang) {
      this.$i18n.locale = lang;
      this.$s.locale = lang;
    },
    setCollection() {
      this.magic += 1;
      return this.$c.set(this.$route);
    },
    getCollection(magic) {
      return this.$c.get(this.$route, magic);
    },
    fixedPosition(right) {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 16;
        case 'sm': return 16 + 64;
        case 'md':
          if (right) return 16 + 256;
          else return 16 + 64;
        case 'lg': return 16 + 256;
        case 'xl': return 16 + 256;
      }
      return 0;
    },
    reload() {
      return window.location.reload(true);
    },
  },
  mounted() {
    this.$root.$on('databaseLoading', (x) => {
      this.databaseProgress = x;
    });
    this.$root.$on('databaseLoaded', () => {
      this.databaseStatus = 1;
    });
    this.$root.$on('databaseUpdating', () => {
      this.databaseStatus = 2;
      this.snackbar = true;
    });
    this.$root.$on('databaseUpdated', () => {
      this.databaseStatus = 3;
      this.snackbar = true;
      this.refresh = true;
    });
    this.$root.$on('applicationUpdated', () => {
      this.applicationStatus = true;
      this.snackbar = true;
      this.refresh = true;
    });
    this.$root.$on('cleaVisibility', (x) => {
      this.cleaVisibility = x;
    });
  },
};
</script>

<style>
.two-lines {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.theme--light.v-tabs-items {
  background-color: transparent !important;
}
.v-slide-group__prev--disabled {
  display: none !important;
}
.small {
  font-size: 80%;
}
.slider-label {
  width: 80px;
  white-space: nowrap;
}
.display {
  font-size: 30px;
  font-weight: 500;
}
</style>