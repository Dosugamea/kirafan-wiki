<template lang="pug">
  .py-1
    .d-flex(v-if="v==undefined")
      .key-only.key.value(v-html="k")
    .d-flex(v-else-if="k==undefined")
      .value-only.value(:class="{disabled: disabled || disabled===null}", v-html="v")
    .d-flex(v-else)
      .key(:style="{width: width ? width : undefined}", v-html="k")
      .value(:style="{width: width ? `calc(100% - ${width})` : undefined}", v-html="v")
</template>

<script>
export default {
  name: 'KeyValue',
  props: ['k', 'v', 'width', 'disabled'],
};
</script>

<style lang="scss" scoped>
.key-only {
  width: 100% !important;
}

.value-only {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  width: 100% !important;
}

.key,
.value {
  white-space: nowrap;
  width: 50%;
  text-align: center;
  border: 1px solid var(--v-primary-base);
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0px 2px;
}

.disabled {
  border: 1px dashed var(--v-primary-base);
  color: gray;
}

.theme--light {
  .key {
    color: white;
  }
}

.theme--dark {
  .key {
    color: rgba(0, 0, 0, 0.6);
  }
  background-color: #303030;
}

.key {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  background-color: var(--v-primary-base);
  font-weight: 550;
}

.value {
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}
</style>