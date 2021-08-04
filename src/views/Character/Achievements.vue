<template lang="pug">
  div(v-if="achievements.length")
    v-divider.mb-4
    p.px-4.title.primary--text {{$t('Achievements')}}
    .px-2.mb-2
      v-row(no-gutters)
        v-col(cols=12, sm=6, v-for="achievement in achievements", :key="`achievement-${achievement.id}`")
          .px-2.mb-2
            a(:href="$asset.achievement.format(achievement.id)+'.png'", target="_blank")
              v-img(:src="$asset.achievement.format(achievement.id)+'.png'", height=60, contain,
                :lazy-src="$asset.achievement.format(0)+'.png'")
</template>

<script>
export default {
  name: 'Achievements',
  props: ['id'],
  computed: {
    achievements() {
      return this.$db.AchievementListArray.filter(achievement =>
        (achievement.type == 1 || achievement.type == 3) &&
        achievement.trigger == this.id);
    }
  }
};
</script>