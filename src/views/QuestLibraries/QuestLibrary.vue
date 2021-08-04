<template lang="pug">
  div(v-if="!questLibrary")
  v-list-item(:to="to", v-else)
    template(v-if="collection")
      v-list-item-avatar(:width="48*4", :height="48", tile)
        v-img.quest-library-icon(:src="questLibrary.icon", contain)
      v-list-item-content
        v-list-item-subtitle

    template(v-else)
      v-list-item-avatar.mx-auto.mr-2.mr-md-4(:width="$size()*4", :height="$size()", tile)
        v-img.quest-library-icon(:src="questLibrary.icon", contain)
      
      div.mr-2.small(v-if="questLibrary.badge", style="width: 64px")
        KeyValue(:k="questLibrary.badge")

      v-list-item-content.ml-0(:style="{'max-width': questLibrary.badge ? '160px' : '240px'}")
        v-list-item-subtitle {{$name(questLibrary.name)}}

      .mr-auto
</template>

<script>
export default {
  name: 'QuestLibrary',
  props: {
    id: {},
    collection: Boolean,
  },
  computed: {
    to() {
      const values = Object.values(this.questLibrary.quests);
      if (values.length == 1 && this.questLibrary.category == 4) {
        return `/quest/${values[0]}`;
      } else {
        return `/questlibrary/${this.questLibrary.id}`;
      }
    },
    questLibrary() {
      return this.$db.QuestLibraryList[this.id];
    },
  }
};
</script>
