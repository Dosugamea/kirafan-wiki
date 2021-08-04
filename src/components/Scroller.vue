<template lang="pug">
  .my-4
    div.hidden-xs-only(style="position: relative")
      v-fade-transition
        v-btn(fab, small, icon, @click="scroll(false)", color="primary", :style="chevron(false)", v-show="showLeft"): v-icon mdi-chevron-left
      v-fade-transition
        v-btn(fab, small, icon, @click="scroll(true)", color="primary", :style="chevron(true)", v-show="showRight"): v-icon mdi-chevron-right
    .d-flex.flex-row.scroll-x(ref="scroller", @scroll="onScroll", :class="scrollClass")
      slot
</template>

<script>
export default {
  name: 'Scroller',
  props: ['icon'],
  data() {
    return {
      showLeft: false,
      showRight: false,
    };
  },
  computed: {
    scrollClass() {
      return this.$vuetify.breakpoint.xsOnly ? {} : {
        'scroll-x-left-button': this.showLeft && !this.showRight,
        'scroll-x-right-button': !this.showLeft && this.showRight,
        'scroll-x-left-right-button': this.showLeft && this.showRight,
      };
    }
  },
  methods: {
    chevron(right) {
      return {
        position: 'absolute',
        'z-index': 1,
        right: right ? '0px' : null,
        left: !right ? '0px' : null,
        top: (this.icon - 40) / 2 + 'px',
      };
    },
    onScroll() {
      this.showLeft = this.$refs.scroller.scrollLeft > 0;
      this.showRight = this.$refs.scroller.scrollLeft < this.$refs.scroller.scrollWidth - this.$refs.scroller.clientWidth;
    },
    scroll(right) {
      let distance = this.$refs.scroller.clientWidth - this.icon - 16;
      if (!right) {
        distance = - distance;
      }
      if (distance > this.$refs.scroller.scrollWidth - this.$refs.scroller.scrollLeft - this.$refs.scroller.clientWidth) {
        distance = this.$refs.scroller.scrollWidth - this.$refs.scroller.scrollLeft - this.$refs.scroller.clientWidth;
      }
      if (distance < - this.$refs.scroller.scrollLeft) {
        distance = - this.$refs.scroller.scrollLeft;
      }
      this._scroll(distance, 300);
    },
    _scroll(distance, interval) {
      const time = 1000 / 120;
      let n = interval / time <= 0 ? 1 : interval / time;
      let v = Math.round(distance / n * 2);
      this.$refs.scroller.scrollLeft += v;
      if (Math.abs(distance) > Math.abs(v)) {
        setTimeout(() => this._scroll(distance - v, interval - time), time);
      }
    },
  },
  mounted() {
    this.onScroll();
  },
  watch: {
    '$route'() {
      this.$nextTick(() => this.onScroll());
    },
    '$vuetify.breakpoint.width'() {
      this.$nextTick(() => this.onScroll());
    }
  }
};
</script>

<style scoped>
.scroll-x::-webkit-scrollbar {
  display: none;
}
.scroll-x {
  overflow-x: scroll;
}
.scroll-x-left-button {
  mask-image: linear-gradient(
    to right,
    transparent 16px,
    black 48px,
    black 100%
  );
}
.scroll-x-right-button {
  mask-image: linear-gradient(
    to right,
    black 0,
    black calc(100% - 48px),
    transparent calc(100% - 16px)
  );
}
.scroll-x-left-right-button {
  mask-image: linear-gradient(
    to right,
    transparent 16px,
    black 48px,
    black calc(100% - 48px),
    transparent calc(100% - 16px)
  );
}
</style>
