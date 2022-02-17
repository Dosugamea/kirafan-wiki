<template lang="pug">
    v-list-item(@click="$s[configName]=!$s[configName]")
      v-list-item-content
        v-list-item-title {{ title }}
        v-list-item-subtitle(v-if="subtitle") {{ subtitle }}
      v-list-item-action: v-switch(color="primary", readonly, v-model="$s[configName]")
</template>

<script>
export default {
  props: ["configName", "title", "subtitle"],
};
</script>
