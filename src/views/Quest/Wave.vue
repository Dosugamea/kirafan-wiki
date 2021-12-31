<template lang="pug">
  .px-4.mb-4(v-if="noEnemy")
    KeyValue(:k="$t('No Enemy')")
  v-row(no-gutters, v-else)
    v-col(v-for="i in 3", :key="`quest-wave-${id}-${3-i}`", cols=12, md=4)
      Enemy(v-if="wave.m_QuestEnemyIDs[3-i]!=-1",
        :id="wave.m_QuestEnemyIDs[3-i]", :level="wave.m_QuestEnemyLvs[3-i]", :qid="qid")
      Random(v-else-if="wave.m_QuestRandomIDs[3-i]!=-1",
        :id="wave.m_QuestRandomIDs[3-i]", :qid="qid")
</template>

<script>
import Enemy from './Enemy';
import Random from './Random';

export default {
  name: 'Wave',
  props: ['id', 'qid'],
  components: { Enemy, Random },
  computed: {
    wave() {
      return this.$store.state.$db.QuestWaveList[this.id];
    },
    noEnemy() {
      if (!this.wave) {
        return true;
      }
      for (let id of this.wave.m_QuestEnemyIDs) {
        if (id != -1) {
          return false;
        }
      }
      for (let id of this.wave.m_QuestRandomIDs) {
        if (id != -1) {
          return false;
        }
      }
      return true;
    }
  },
};
</script>
