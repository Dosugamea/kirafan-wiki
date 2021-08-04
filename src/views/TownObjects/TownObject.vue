<template lang="pug">
  v-list-item(:to="`/townobject/${id}`")
    template(v-if="collection")
      v-list-item-avatar(:size="48")
        v-img(:src="$asset.townobjecticon.format(item.m_ResourceID+'00')+'.jpg'")
      v-list-item-content
        v-list-item-title {{item.m_ObjName}}
        v-list-item-subtitle(v-if="item.m_TitleType!=-1") {{$name($db.TitleList[item.m_TitleType].m_DisplayName)}}
    
    template(v-else)
      v-list-item-avatar.mx-auto.mr-2.mr-md-4(:size="$size()")
        v-img(:src="$asset.townobjecticon.format(item.m_ResourceID+'00')+'.jpg'")
      v-list-item-content.mr-auto.ml-0(style="max-width: 384px")
        v-list-item-title {{item.m_ObjName}}
        v-list-item-subtitle(v-if="item.m_TitleType!=-1") {{$name($db.TitleList[item.m_TitleType].m_DisplayName)}}

</template>

<script>
export default {
  name: 'TownObject',
  props: {
    id: {},
    collection: Boolean,
  },
  computed: {
    item() {
      return this.$db.TownObjectList[this.id];
    }
  }
};
</script>