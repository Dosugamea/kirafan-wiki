<template lang="pug">
  div
    p.display.px-4.primary--text {{$t('Town Objects')}}
    v-row(no-gutters)
      v-col(v-for="item in $db.TownObjectListArray",
        :key="`town-objects-item-${item.m_ID}`", cols=12, sm=6)
        v-divider
        TownObject(:id="item.m_ID")
</template>

<script>
import TownObject from './TownObject';

export default {
  name: 'TownObjects',
  components: { TownObject },
};
</script>