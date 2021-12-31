<template lang="pug">
  div
    p.px-4.title.primary--text {{name}}
    Scroller(:icon="$size(64)")
      .ml-4(v-for="item in items", :key="`items-item-${item.m_ID}`", :style="{width: $size(64)+'px'}")
        router-link(:to="`/item/${item.m_ID}`")
          v-avatar(:size="$size(64)")
            v-img(:src="$asset.itemicon.format(item.m_ID)+'.jpg'")
          .caption.text-center.two-lines {{$name(item.m_Name)}}
      .pl-4
    KeyValue.px-4(:k="$t('No Item')", v-if="!items.length")

</template>

<script>
export default {
  name: 'Category',
  props: {
    id: {},
    questLibrary: Boolean,
  },
  computed: {
    items() {
      return this.$store.state.$db.ItemListArray.filter(item => item.category == this.id);
    },
    name() {
      if (this.questLibrary) {
        return this.$t('Items');
      }
      if (Math.floor(this.id / 100) == 10) {
        return this.$t('Item Category Event').format({
          event: this.$name(this.$store.state.$db.ADVLibraryList[this.id].m_ListName),
        });
      } else {
        return this.$t(`Item Category.${this.id}`);
      }
    },
  }
};
</script>
