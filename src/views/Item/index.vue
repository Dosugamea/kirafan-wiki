<template lang="pug">
  .pa-4(v-if="!item")
    KeyValue(:k="$t('No Item')")

  div(v-else)
    .hidden-sm-and-up
      p.display.px-4.primary--text {{$name(item.m_Name, true)}}
      p.px-4(v-show="$i18n.locale!='ja'") 
        span 日本語：
        span.primary--text {{item.m_Name}}

    div(:style="{'min-height': $size(64) + 16 + 'px'}")
      .float-right.px-4
          a(:href="$asset.itemicon.format(item.m_ID)+'.png'", target="_blank")
            v-avatar(:size="$size(64)", :key="`item-icon-${id}`")
              v-img(:src="$asset.itemicon.format(item.m_ID)+'.jpg'")
      .hidden-xs-only
        p.display.px-4.primary--text {{$name(item.m_Name, true)}}
        p.px-4(v-show="$i18n.locale!='ja'") 
          span 日本語：
          span.primary--text {{item.m_Name}}
      p.px-4 {{item.m_DetailText.replace(/\n/g, '')}}
    
    .px-4.mb-4
      KeyValue(:k="$t('Type')", :v="$t(`Item Type.${type}`)", width="33%")

      KeyValue(:k="$t('Category')", :v="$t(`Item Category.${item.category}`)", width="33%", v-if="type!=10")
      KeyValue(:k="$t('From Event')", :v="$name(event.m_ListName)", width="33%", v-else)

      KeyValue(:k="$t('Experience')", :v="item.m_TypeArgs[1]", width="33%", v-if="item.m_Type==0")
      KeyValue(:k="$t('Experience')", :v="item.m_TypeArgs[0]", width="33%", v-if="item.m_Type==3")

      KeyValue(:k="$t('Sale Amount')", :v="item.m_SaleAmount", width="33%", v-if="item.m_SaleAmount")

</template>

<script>
export default {
  name: 'Item',
  props: ['id'],
  computed: {
    item() {
      return this.$db.ItemList[this.id];
    },
    type() {
      return Math.floor(this.item.category / 100);
    },
    event() {
      return this.$db.ADVLibraryList[this.item.category];
    },
  },
};
</script>
