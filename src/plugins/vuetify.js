import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css';

import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  breakpoint: {
    thresholds: {
      xs: 512,
      sm: 768,
      md: 1024,
      lg: 1280,
    },
    scrollBarWidth: 0,
  },
  theme: {
    themes: {
      light: {
        // title, button, active elements; make it high-contrast to white
        primary: colors.pink.lighten3,

        // app bar; make it as primary-lighten-x
        secondary: colors.pink.lighten4,
      },
      dark: {
        // title, button, active elements; make it high-contrast to black, but not close to white
        primary: colors.pink.lighten3,

        // app bar; make it black
        secondary: colors.black,
      },
    },
    options: {
      customProperties: true,
    },
    dark: false,
  },
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
});
