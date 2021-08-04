<template lang="pug">
  div
    .text-center(v-if="loading")
      v-divider
      v-progress-circular.my-4(indeterminate=true, color="primary")
    template(v-else)
      template(v-for="characterID in characterIDs")
        v-divider
        Character(:key="`home-character-${characterID}`", :id="characterID")
</template>

<script>
import Character from '@/views/Characters/Character';
import axios from 'axios';

export default {
  name: 'Characters',
  components: { Character },
  data() {
    return {
      loading: false,
      characterIDs: [],
    };
  },
  methods: {
    load() {
      this.loading = true;
      axios.get(this.$asset.characard.format('/../index.json')).then(response => {
        this.characterIDs = response.data
          .filter(item => item.new)
          .map(item => parseInt(item.name.slice(10)))
          .filter(id => id % 10 == 0);
        this.loading = false;
      });
    },
  },
  mounted() {
    this.load();
  },
};
</script>