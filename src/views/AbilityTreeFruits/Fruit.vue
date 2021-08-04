<template lang="pug">
    v-list-item(:to="'/AbilityTreeFruit/' + id")
       template
            v-list-item-avatar.mx-auto.mr-2.mr-md-4(:width="$size()", :height="$size()")
                v-img(:src="$asset.itemicon.format(itemId) + '.jpg'")
            v-list-item-content.ml-0.mr-auto(style="max-width: 384px")
              v-list-item-title {{ name }}
</template>

<script>
export default {
  name: "Fruit",
  props: {
    id: Number,
  },
  computed: {
    fruit(){
      return this.$db.AbilitySpheres[this.id]
    },
    itemId(){
      return this.fruit.m_ItemID
    },
    name(){
      return this.$db.ItemList[this.itemId].m_Name.replace("[Grade1]","")
    }
  },
};
</script>
