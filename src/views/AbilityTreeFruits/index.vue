<template lang="pug">
    div
        //- WIP
        template(v-for="fruits in groupedFruits")
            v-divider
            fruit(:id="fruits" :key="'grouped-fruits-' + fruits")

</template>

<script>
import fruit from "./Fruit";

export default {
  name: "AbilityTreeFruits",
  components: { fruit },

  computed: {
    groupedFruits() {
      const output = [];
      this.$db.AbilitySpheresArray.forEach((element) => {
        const id = element.m_ID;
        const id_str = String(id);
        if (id_str[2] === "0") {
          output.push(id);
        }
      });
      return output;
    },
  },

  methods: {},

  mounted() {
    window.a = this;
  },
};
</script>
