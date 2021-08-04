<template lang="pug">
  div(v-if="$showAd() && $isMoe()")
    InFeedAdsense(v-if="type=='feed'"
      data-ad-layout-key="-fg+6d-1m-er+wm",
      data-ad-client="ca-pub-7892650861805139",
      data-ad-slot="3136351268")
    Adsense(v-if="type=='display'"
      data-ad-layout-key="auto",
      data-ad-client="ca-pub-7892650861805139",
      data-ad-slot="9264653959")
  v-list-item(v-else-if="$isDev()", @click="")
    v-list-item-content
      v-list-item-subtitle.text-center.my-8 Ad: {{type}}
</template>

<script>
export default {
  name: 'Ad',
  props: {
    type: {
      default: 'feed',
    },
  },
};
</script>