<template lang="pug">
  .text-center.float-right(style="width: 160px; overflow: hidden")
    div(style="transform:rotateX(45deg) rotateY(0deg) rotateZ(315deg);")
      div(v-for="y in item.m_SizeY+2", :key="`room-object-action-row-${y}`")
        span(v-for="x in item.m_SizeX+2", :key="`room-object-action-row-${y}-col-${x}`")
          span(v-if="y==1 && x!=item.m_SizeX+2")
            v-icon(color="primary") {{search('Up', item.m_SizeX+2-x) ? 'mdi-square-outline' : null}}
          span(v-else-if="x==item.m_SizeX+2 && y!=item.m_SizeY+2")
            v-icon(color="primary") {{search('Right', item.m_SizeY+2-y) ? 'mdi-square-outline' : null}}
          span(v-else-if="y==item.m_SizeY+2 && x!=1")
            v-icon(color="primary") {{search('Down', x-1) ? 'mdi-square-outline' : null}}
          span(v-else-if="x==1 && y!=1")
            v-icon(color="primary") {{search('Left', y-1) ? 'mdi-square-outline' : null}}
          span(v-else)
            v-icon mdi-square
</template>

<script>
export default {
  name: 'Action',
  props: ['id'],
  computed: {
    item() {
      return this.$db.RoomObjectList[this.id];
    },
  },
  methods: {
    search(direction, index) {
      return this.item[`m_Search${direction}`] & (1 << index);
    }
  },
};
</script>

<style scoped>
.v-icon {
  width: 24px;
  height: 24px;
}
</style>