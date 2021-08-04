<template lang="pug">
  div
    .text-center(v-if="loading")
      v-divider
      v-progress-circular.my-4(indeterminate=true, color="primary")
    template(v-else)
      template(v-for="questLibraryID in questLibraryIDs")
        v-divider
        QuestLibrary(:key="`home-questLibrary-${questLibraryID}`", :id="questLibraryID")
</template>

<script>
import QuestLibrary from '@/views/QuestLibraries/QuestLibrary';
import axios from 'axios';

export default {
  name: 'QuestLibraries',
  components: { QuestLibrary },
  data() {
    return {
      loading: false,
      questLibraryIDs: [],
    };
  },
  methods: {
    load() {
      this.loading = true;
      axios.get(this.$asset.advlibraryicon.format('/../index.json')).then(response => {
        this.questLibraryIDs = response.data
          .filter(item => item.new)
          .map(item => parseInt(item.name.slice(15)))
          .map(id => {
            if (id >= 0 && id < 3000) {
              return id;
            } else if (id >= 20000000 && id < 30000000) {
              let year = Math.floor(id / 10000);
              let month = Math.floor(id / 100) % 100;
              return 4000 + (year - 2018) * 12 + month - 2;
            } else {
              return undefined;
            }
          })
          .filter(x => x);
        this.loading = false;
      });
    },
  },
  mounted() {
    this.load();
  },
};
</script>