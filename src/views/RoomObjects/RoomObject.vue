<template lang="pug">
  v-list-item(:to="`/roomobject/${item.m_DBAccessID}`")
    template(v-if="collection")
      v-list-item-avatar(:size="48")
        v-img(:src="$asset.roomobjecticon.format(categoryName, item.m_ID)+'.jpg'")
      v-list-item-content
        v-list-item-subtitle {{item.m_Name}}

    template(v-else)
      v-list-item-avatar.mx-auto.mr-2.mr-md-4(:size="$size()")
        v-img(:src="$asset.roomobjecticon.format(categoryName, item.m_ID)+'.jpg'")
      v-list-item-content.mr-auto.ml-0
        v-list-item-title.d-flex.align-center {{item.m_Name}}
          v-list-item-subtitle.pl-1.hidden-sm-and-up
            span {{item.m_SizeX}}×{{item.m_SizeY}}
        v-list-item-subtitle
          span {{filterString(item.m_FilterName)}}
          span.float-right.hidden-sm-and-up {{item.m_BuyAmount}}
        v-list-item-subtitle.hidden-xs-only
          span {{item.m_SizeX}}×{{item.m_SizeY}}
          span.float-right {{item.m_BuyAmount}}
</template>

<script>
export default {
  name: 'RoomObject',
  props: {
    id: {},
    collection: Boolean,
  },
  computed: {
    item() {
      return this.$db.RoomObjectList[this.id];
    },
    categoryName() {
      return {
        0: 'Desk',
        1: 'Chair',
        2: 'Storage',
        3: 'Bedding',
        4: 'Appliances',
        5: 'Goods',
        6: 'Hobby',
        7: 'WallDecoration',
        8: 'Carpet',
        9: 'Screen',
        10: 'Floor',
        11: 'Wall',
        12: 'Background',
      }[this.item.m_Category];
    },
  },
  methods: {
    filterString(filter) {
      return [
        filter[3],
        (filter[0] != 'オールシーズン') && filter[0],
        (filter[1] != 'その他') && filter[1],
        (filter[2] != 'キャラアクションなし') && filter[2],
      ].filter(x => x).join(this.$t('divider'));
    }
  }
};
</script>