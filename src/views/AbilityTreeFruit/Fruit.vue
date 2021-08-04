<template lang="pug">
    span
        PassiveSkill(:id="id + '0'", owner="ABL", :characterSkillIDs="[]")

</template>

<script>
export default {
  name: "Fruit",
  props: {
    id: String,
  },
  computed: {
    fruit() {
      return this.$db.AbilitySpheres[this.id];
    },
  },
};
</script>
