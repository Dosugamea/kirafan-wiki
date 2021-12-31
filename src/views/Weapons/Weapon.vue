<template lang="pug">
  v-list-item(:to="`/weapon/${weapon.m_ID}`")
    template(v-if="collection")
      v-list-item-avatar(:size="48", tile)
        v-img(:src="$asset.weaponicon.format($store.state.$db.WeaponList[id].m_ResourceID_R)+'.jpg'")
      v-list-item-subtitle {{$name(weapon.m_WeaponName)}}

    template(v-else)
      v-list-item-avatar.mx-auto.mr-2.mr-md-4(:size="$size()", tile)
        v-img(:src="$asset.weaponicon.format($store.state.$db.WeaponList[id].m_ResourceID_R)+'.jpg'")
      
      v-list-item-content.mr-auto.ml-0(style="max-width: 384px")
        v-list-item-title.d-flex.align-center
          template(v-if="false")
            img.d-inline(v-for="i in weapon.m_Rare+1", :key="`rare-icon-${i}`", :width="rareIconSize", :height="rareIconSize",
              :src="$asset.commonuiatlas.format('RareIcon')+'.png'")
            span.pr-1
          template(v-if="weapon.m_Rare!=4")
            img(:width="$size()/2.5", :height="$size()/2.5",
              :src="$asset.commonuiatlas.format(classIcon)+'.png'")
            span.pr-1
          | {{$name(weapon.m_WeaponName)}}

        v-list-item-subtitle
          Status(:status="status", divide=3)
</template>

<script>
export default {
  name: 'Weapon',
  props: {
    id: {},
    collection: Boolean,
  },
  computed: {
    weapon() { return this.$store.state.$db.WeaponList[this.id]; },
    status() {
      const status = {};
      if (this.weapon.m_InitAtk) status.ATK = this.weapon.m_InitAtk;
      if (this.weapon.m_InitMgc) status.MAT = this.weapon.m_InitMgc;
      if (this.weapon.m_InitDef) status.DEF = this.weapon.m_InitDef;
      if (this.weapon.m_InitMDef) status.MDF = this.weapon.m_InitMDef;
      return status;
    },
    classIcon() {
      return {
        0: 'ClassIconFighter',
        1: 'ClassIconMagician',
        2: 'ClassIconPriest',
        3: 'ClassIconKnight',
        4: 'ClassIconAlchemist',
      }[this.weapon.m_ClassType];
    },
  }
};
</script>