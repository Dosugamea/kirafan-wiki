<template lang="pug">
  v-list-item(:to="`/masterorb/${id}`")
    template(v-if="collection")
      v-list-item-avatar(:size="48")
        v-img(:src="$asset.orbicon.format(id)+'.jpg'")
      v-list-item-content
        v-list-item-subtitle {{orb.m_Name}}
        v-list-item-subtitle(v-if="orb.m_TitleType!=-1 && $i18n.locale!='ja'")
          | {{$name($db.TitleList[orb.m_TitleType].m_DisplayName)}}
        v-list-item-subtitle(v-if="orb.m_Class!=-1 && $i18n.locale!='ja'")
          | {{$t(`Classes.${orb.m_Class}`)}}

    template(v-else)
      v-list-item-avatar.mx-auto.mr-2.mr-md-4(:width="$size()", :height="$size()")
        v-img(:src="$asset.orbicon.format(id)+'.jpg'")

      v-list-item-content.ml-0.mr-auto(style="max-width: 384px")
        v-list-item-title {{orb.m_Name}}
        v-list-item-subtitle(v-if="orb.m_TitleType!=-1 && $i18n.locale!='ja'")
          | {{$name($db.TitleList[orb.m_TitleType].m_DisplayName)}}
        v-list-item-subtitle(v-if="orb.m_Class!=-1 && $i18n.locale!='ja'")
          | {{$t(`Classes.${orb.m_Class}`)}}
</template>

<script>
export default {
  name: 'Orb',
  props: {
    id: {},
    collection: Boolean,
  },
  computed: {
    orb() {
      return this.$db.MasterOrbList[this.id];
    },
  }
};
</script>