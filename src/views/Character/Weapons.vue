<template lang="pug">
  div(v-if="weapons.length")
    v-divider.mb-4
    p.px-4.title.primary--text {{$t('Weapons')}}
    template(v-for="weapon in weapons")
      Weapon(:id="weapon.m_ID")
</template>

<script>
import Weapon from '@/views/Weapons/Weapon';

export default {
  name: 'Weapons',
  props: ['id'],
  components: { Weapon },
  computed: {
    character() {
      return this.$store.state.$db.CharacterList[this.id];
    },
    weapons() {
      return this.$store.state.$db.WeaponListArray.filter(weapon =>
        weapon.m_EvolvedCount == 0 && weapon.m_EquipableCharaID == this.id ||
        // weapon.m_EvolvedCount == 0 && weapon.m_EquipableCharaID == -1 && weapon.m_ClassType == this.character.m_Class && !weapon.default || 
        false);
    },
  }
};
</script>