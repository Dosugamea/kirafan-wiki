<template lang="pug">
  v-list-item(:to="`/scenariolibrary/${item.id}`")
    v-list-item-avatar.mx-auto.mr-2.mr-md-4(:width="$size()*4", :height="$size()", tile)
      v-img.quest-library-icon(:src="item.icon", contain)

    v-list-item-content.ml-0(:style="{'max-width': '240px'}")
      v-list-item-subtitle {{item.name}}

    .mr-auto
</template>

<script>
export default {
  name: 'QuestLibrary',
  props: ['item'],
};
</script>
