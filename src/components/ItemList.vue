<template lang="pug">
  .px-4(v-if="!items.length && !gold")
    KeyValue(:k="$t('No Item')")
  div(v-else)
    Scroller(:icon="$size()").text-center
      .pl-2.pl-md-0
      .ml-2.ml-md-4(v-for="item, i in items", :key="`itemlist-item-${item}`")
        router-link(:to="`/item/${item}`")
          v-avatar(:size="$size()")
            v-img(:src="$asset.itemicon.format(item)+'.jpg'")
        .caption(v-if="amounts[i]", v-html="amounts[i]", style="line-height: 1rem")
      .ml-2.ml-md-4(key="items-item-key", v-if="gold")
        v-avatar(:size="$size()")
          v-img(:src="$asset.commonuiatlas.format('GoldIcon')+'.jpg'")
        .caption(v-html="gold", style="line-height: 1rem")
      .pl-4
</template>

<script>
export default {
  name: 'ItemList',
  props: {
    'items': { default: () => [] },
    'amounts': { default: () => [] },
    'gold': {},
  },
};
</script>