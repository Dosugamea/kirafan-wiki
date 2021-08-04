<template lang="pug">
  div
    .text-center(v-if="loading")
      v-divider
      v-progress-circular.my-4(indeterminate=true, color="primary")
    template(v-else)
      template(v-for="weaponID in weaponIDs")
        v-divider
        Weapon(:key="`home-weapon-${weaponID}`", :id="weaponID")
</template>

<script>
import Weapon from '@/views/Weapons/Weapon';
import axios from 'axios';

export default {
  name: 'Weapons',
  components: { Weapon },
  data() {
    return {
      loading: false,
      weaponIDs: [],
    };
  },
  methods: {
    load() {
      this.loading = true;
      axios.get(this.$asset.weaponicon.format('/../index.json')).then(response => {
        this.weaponIDs = response.data
          .filter(item => item.new)
          .map(item => parseInt(item.name.slice(15)));
        this.loading = false;
      });
    },
  },
  mounted() {
    this.load();
  },
};
</script>