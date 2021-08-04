<template lang="pug">
  Character(:id="character.m_CharaID")
</template>

<script>
import Character from '@/views/Character';

export default {
  name: 'RandomCharacter',
  components: { Character },
  computed: {
    character() {
      let index = Math.floor(Math.random() * this.$db.CharacterListArray.length);
      return this.$db.CharacterListArray[index];
    }
  }
};
</script>