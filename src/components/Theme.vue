<template lang="pug">
  v-menu
    template(v-slot:activator="{on}")
      v-btn(icon, v-on="on"): v-icon mdi-palette
    v-list
      v-list-item-group(v-model="$s.theme")
        v-list-item(v-for="theme, i in themes", :key="`theme-${i}`", @click="setTheme")
          v-list-item-avatar
            v-icon(:style="{color: $vuetify.theme.isDark ? theme.dark.primary : theme.light.primary}", v-if="theme") mdi-checkbox-blank-circle
            v-icon(v-else) mdi-autorenew
          v-list-item-content
            v-list-item-title {{$t(`Themes.${i}`)}}
</template>

<script>
import colors from 'vuetify/lib/util/colors';

export default {
  name: 'Theme',
  data() {
    return {
      dynamic: 6,
    };
  },
  computed: {
    themes() {
      return [
        {
          light: { primary: colors.red.lighten2, secondary: colors.red.lighten3 },
          dark: { primary: colors.red.lighten2, secondary: colors.grey.darken3 },
        },
        {
          light: { primary: colors.blue.lighten2, secondary: colors.blue.lighten3 },
          dark: { primary: colors.blue.lighten2, secondary: colors.grey.darken3 },
        },
        {
          light: { primary: colors.deepOrange.lighten1, secondary: colors.deepOrange.lighten2 },
          dark: { primary: colors.deepOrange.lighten1, secondary: colors.grey.darken3 },
        },
        {
          light: { primary: colors.green.lighten2, secondary: colors.green.lighten3 },
          dark: { primary: colors.green.lighten2, secondary: colors.grey.darken3 },
        },
        {
          light: { primary: colors.purple.lighten3, secondary: colors.purple.lighten4 },
          dark: { primary: colors.purple.lighten3, secondary: colors.grey.darken3 },
        },
        {
          light: { primary: colors.amber.darken1, secondary: colors.amber.base },
          dark: { primary: colors.amber.darken1, secondary: colors.grey.darken3 },
        },
        {
          light: { primary: colors.pink.lighten3, secondary: colors.pink.lighten4 },
          dark: { primary: colors.pink.lighten3, secondary: colors.grey.darken3 },
        },
        null,
      ];
    },
  },
  methods: {
    setTheme() {
      this.$nextTick(() => {
        let i = !this.themes[this.$s.theme] ?
          this.dynamic :
          this.$s.theme;
        if (this.themes[i]) {
          this.$vuetify.theme.themes.light.primary = this.themes[i].light.primary;
          this.$vuetify.theme.themes.light.secondary = this.themes[i].light.secondary;
          this.$vuetify.theme.themes.dark.primary = this.themes[i].dark.primary;
          this.$vuetify.theme.themes.dark.secondary = this.themes[i].dark.secondary;
        }
        this.setAppColor();
      });
    },
    setAppColor() {
      setTimeout(() => {
        let i = !this.themes[this.$s.theme] ?
          this.dynamic :
          this.$s.theme;
        let color = this.$vuetify.theme.dark ?
          this.themes[i].dark.secondary :
          this.themes[i].light.secondary;
        document.querySelector('meta[name=theme-color]').setAttribute('content', color);
      }, 100);
    }
  },
  mounted() {
    this.$root.$off('theme');
    this.$root.$on('theme', (element) => {
      this.dynamic = element >= 0 && element <= 5 ? element : 6;
      this.setTheme();
    });
    this.$root.$off('dark');
    this.$root.$on('dark', (dark) => {
      if (dark === undefined) {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      } else {
        this.$vuetify.theme.dark = dark;
      }
      this.setAppColor();
      this.$s.dark = this.$vuetify.theme.dark;
    });
  },
  watch: {
    $route(to) {
      if (['Character', 'Weapon', 'Enemy'].indexOf(to.name) == -1) {
        this.$root.$emit('theme');
      }
    },
  }
};
</script>