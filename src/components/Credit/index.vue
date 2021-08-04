<template lang="pug">
  v-list-item(@click="")
    v-list-item-avatar(:size="$size()")
      v-img(:src="credit.icon")
    v-list-item-content
      v-list-item-title {{credit.name}}
    v-list-item-action.ml-2.my-1(v-if="credit.gitlab")
      v-btn(icon, :href="credit.gitlab", target="_blank")
        v-icon mdi-gitlab
    v-list-item-action.ml-2.my-1(v-if="credit.qq")
      v-btn(icon, :href="credit.qq", target="_blank")
        v-icon mdi-qqchat
    v-list-item-action.ml-2.my-1(v-if="credit.twitter")
      v-btn(icon, :href="credit.twitter", target="_blank")
        v-icon mdi-twitter
</template>

<script>
import credits from './credits';

export default {
  name: 'Credit',
  props: ['name'],
  computed: {
    credit() {
      return credits[this.name];
    },
  }
};
</script>