<template lang="pug">
  div
    Enemy(:id="random.m_QuestEnemyIDs[selected]", :level="random.m_QuestEnemyLvs[selected]", :qid="qid")
    v-select.px-4.px-sm-2(v-model="selected", :items="enemies", dense)
</template>

<script>
import Enemy from './Enemy';

export default {
  name: 'Random',
  props: ['id', 'qid'],
  components: { Enemy },
  data() {
    return {
      selected: 0,
    };
  },
  computed: {
    random() {
      return this.$db.QuestWaveRandomList[this.id];
    },
    enemies() {
      const enemies = [];
      for (let i = 0; i < this.random.m_Num; i++) {
        if (this.random.m_Prob[i] > 0 && this.random.m_QuestEnemyIDs[i] != -1) {
          enemies.push({
            text: `${this.random.m_Prob[i]}%: ${this.$name(this.$db.QuestEnemyList[this.random.m_QuestEnemyIDs[i]].m_CharaName)} ${this.$t('Level')} ${this.random.m_QuestEnemyLvs[i]}`,
            value: i,
          });
        }
      }
      return enemies;

    },
  }
};
</script>