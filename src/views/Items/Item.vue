<template lang="pug">
  v-list-item(:to="`/item/${id}`")
    v-list-item-avatar(:size="48")
      v-img(:src="$asset.itemicon.format(item.m_ID)+'.jpg'")
    v-list-item-content
      v-list-item-subtitle {{$name(item.m_Name)}}
</template>

<script>
export default {
  name: 'Item',
  props: {
    id: {},
    collection: Boolean,
  },
  computed: {
    item() {
      return this.$store.state.$db.ItemList[this.id];
    }
  }
};
</script>
