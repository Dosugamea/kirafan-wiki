<template lang="pug">
  div(style="white-space: normal")
    template(v-for="value, key, i in status")
      KeyValue.d-inline-block(:k="key", :v="formatValue(value)", :style="{width: width}" v-if="value!==null")
      .d-inline-block(:style="{width: width}", v-else)
      .d-inline-block(style="width: 8px", v-if="(i+1)%divide!=0")

</template>

<script>

export default {
  name: 'Status',
  props: ['status', 'divide', 'format'],
  computed: {
    width() {
      return `calc((100% - 8px * (${this.divide} - 1)) / ${this.divide})`;
    },
  },
  methods: {
    formatValue(value) {
      if (this.format === undefined) return value;
      return this.$4(value);
    }
  }
};
</script>
