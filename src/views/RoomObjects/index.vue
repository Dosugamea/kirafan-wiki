<template lang="pug">
  div
    p.display.px-4.primary--text {{$t('Room Objects')}}
    .px-4
      v-select(v-model="category", :label="$t('Category')", :items="categories", dense)
    v-row(no-gutters)
      v-col(v-for="item in items", :key="`room-objects-item-${item.m_DBAccessID}`", cols=12, sm=6)
        v-divider
        RoomObject(:id="item.m_DBAccessID")

</template>

<script>
import RoomObject from './RoomObject';

export default {
  name: 'RoomObjects',
  components: { RoomObject },
  data() {
    return {
      category: 0,
    };
  },
  computed: {
    categories() {
      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => ({
        text: this.$t(`Room Object Categories.${i}`),
        value: i,
      }));
    },
    items() {
      return this.$db.RoomObjectListArray.filter(item => item.m_Category == this.category);
    },
  },
};
</script>
