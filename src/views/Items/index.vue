<template lang="pug">
  div(v-infinite-scroll="load", infinite-scroll-disabled="disabled", infinite-scroll-distance=96)
    p.display.px-4.primary--text {{$t('Items')}}
    .px-4
      v-select(v-model="filter", :label="$t('Type')", :items="types", dense)
    div(v-for="category in categorys.slice(0, show)", :key="`items-category-${category}`")
      v-divider.mb-4
      Category(:id="category")
</template>

<script>
import Category from './Category';

export default {
  name: 'Items',
  components: { Category },
  data() {
    return {
      filter: 3,
      show: 20,
    };
  },
  computed: {
    categorys() {
      const categorys = {};
      this.$db.ItemListArray.forEach(item => categorys[item.category] = true);
      return Object.keys(categorys).filter(category => Math.floor(category / 100) == this.filter);
    },
    types() {
      return [10, 0, 1, 2, 3, 4].map(i => ({
        text: this.$t(`Item Type.${i}`),
        value: i,
      }));
    },
    disabled() {
      return this.$route.name != 'Items' || this.show >= this.categorys.length;
    },
  },
  methods: {
    load() {
      this.show += 10;
    }
  },
  watch: {
    filter() {
      this.show = 20;
    },
  },
};
</script>
