<template lang="pug">
  .pa-4(v-if="!item")
    KeyValue(:k="$t('No Item')")

  div(v-else)
    div(:style="{'min-height': $size(96) + 16 + 'px'}")
      .float-right.px-4.hidden-xs-only
        a(:href="$asset.townobjecticon.format(item.m_ResourceID+'00')+'.png'", target="_blank")
          v-avatar(:size="$size(96)")
            v-img(:src="$asset.townobjecticon.format(item.m_ResourceID+'00')+'.jpg'")

      p.display.px-4.primary--text {{item.m_ObjName}}
      
      .px-4.hidden-sm-and-up.text-center
        a(:href="$asset.townobjecticon.format(item.m_ResourceID+'00')+'.png'", target="_blank")
          v-avatar(:size="128")
            v-img(:src="$asset.townobjecticon.format(item.m_ResourceID+'00')+'.jpg'")
      .pb-4

      p.px-4(v-html="item.m_DetailText.replace('\\n', '<br>')", :class="{small: $vuetify.breakpoint.xsOnly}")

    .px-4.mb-4
      KeyValue(:k="$t('Title')", :v="$name($store.state.$db.TitleList[item.m_TitleType].m_DisplayName)", width="33%", v-if="item.m_TitleType!=-1")
      KeyValue(:k="$t('Max Num')", :v="item.m_MaxNum", width="33%")

    v-divider
    Ad(:key="`townobject-ad-${id}`")

    v-divider.mb-4
    p.title.px-4.primary--text {{$t('Schedule')}}
    v-simple-table(:key="`town-object-${id}-schedule`")
      template(v-slot:default)
        thead
          tr
            th.text-center {{$t('Character')}}
            th.text-center {{$t('Text')}}
        tbody
          template(v-for="schedule in schedules")
            tr(:key="`town-object-${id}-schedule-${schedule.m_ID}-header`")
              th(colspan=2) {{schedule.m_TagName}}
            tr(:key="`town-object-${id}-schedule-${schedule.m_ID}-common`")
              td.text-center {{$t('Common')}}
              td.text-center(v-html="schedule.m_DisplayName.replace('\\n', '<br>')")
            tr(v-for="namedTypes, text in scheduleReplaces(schedule.m_ID)", :key="`town-object-${id}-schedule-${schedule.m_ID}-${text}`")
              td.text-center
                router-link(v-for="namedType in namedTypes", :key="`town-object-${id}-schedule-${schedule.m_ID}-${text}-${namedType}`",
                  :to="`/named/${namedType}`")
                  CharaIcon(named, :id="namedType", :size="48")
              td.text-center(v-html="text.replace('\\n', '<br>')")

</template>

<script>
export default {
  name: 'TownObject',
  props: ['id'],
  computed: {
    item() {
      return this.$store.state.$db.TownObjectList[this.id];
    },
    schedules() {
      return this.$store.state.$db.ScheduleNameArray.filter(schedule => schedule.m_BuildMoveCode == this.item.m_ResourceID);
    },
  },
  methods: {
    scheduleReplaces(scheduleID) {
      const schedules = {};
      this.$store.state.$db.ScheduleNameReplaceArray.forEach(schedule => {
        let index = schedule.m_ScheduleID.indexOf(scheduleID);
        if (index == -1) return;
        let text = schedule.m_ReplaceScheduleName[index];
        let namedType = this.$store.state.$db.CharacterList[schedule.m_CharaID].m_NamedType;
        if (schedules[text]) {
          if (schedules[text].indexOf(namedType) == -1) {
            schedules[text].push(namedType);
          }
        } else {
          schedules[text] = [namedType];
        }
      });
      return schedules;
    }
  }
};
</script>