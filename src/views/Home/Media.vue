<template lang="pug">
  div
    v-divider
    div.mx-auto.my-4.d-flex(style="max-width: 360px")
      div.mx-2.my-auto(style="width: 25%")
        v-img(src="@/assets/media.png")
      div.mx-2.my-auto(style="width: 75%")
        p {{$t('Version')}} {{$version}}
        p.small {{$t('Version Info')}}
</template>

<script>
export default {
  name: 'Media',
};
</script>
