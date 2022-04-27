<template lang="pug">
    div
        //- WIP
        p.display.px-4.primary--text {{ name }}
        template(v-for="fruits in groupedItem")
            v-divider
            fruit(:id="fruits" :key="'grouped-fruit-' + fruits")
</template>

<script>
import fruit from "./Fruit";

export default {
  components: { fruit },
  props: {
    id: String,
  },

  computed: {
    groupedItem() {
      return [0, 1, 2, 3].map((x) => {
        let tmp_id = this.id.split("");
        tmp_id.splice(2, 1, x);
        return tmp_id.join("");
      });
    },
    fruit() {
      return this.$store.state.$db.AbilitySpheres[this.id];
    },
    itemId() {
      return this.fruit.m_ItemID;
    },
    name() {
      return this.$store.state.$db.ItemList[this.itemId].m_Name.replace("[Grade1]", "");
    },
  },
};
</script>
