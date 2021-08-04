<template lang="pug">
  .pa-4(v-if="!questLibrary")
    KeyValue(:k="$t('No Quest')")
  div(v-else)
    .float-right.px-4.hidden-xs-only
      v-img(:width="$size()*4", :height="$size()", contain, :src="questLibrary.icon") 

    KeyValue.pl-4.pr-2.pt-2.float-left(v-if="questLibrary.badge", :k="questLibrary.badge")

    template(v-if="questLibrary.category==5 || questLibrary.category==6")
      p.display.px-4.primary--text {{$t(`Quest Library Categories.${questLibrary.category}`)}}
      p.px-4.primary--text {{$name(questLibrary.name)}}
    template(v-else)
      p.display.px-4.primary--text {{$name(questLibrary.name, true)}}
      p.px-4(v-show="$i18n.locale!='ja'") 
        span 日本語：
        span.primary--text {{questLibrary.name}}

    .px-4.hidden-sm-and-up
      v-img(:src="questLibrary.icon")
    .pb-4

    v-list-item(:to="`/scenariolibrary/${questLibrary.category==0?id-id%100+id%10:id}`", v-if="questLibrary.category<3")
      v-list-item-title.primary--text {{$t('Scenarios')}}
      v-list-item-action.ma-0: v-icon mdi-chevron-right
    
    v-list-item(:to="`/title/${id%1000}`", v-else-if="questLibrary.category==5 || questLibrary.category==6")
      v-list-item-title.primary--text {{$t('Title')}}
      v-list-item-action.ma-0: v-icon mdi-chevron-right
    
    v-list-item(v-show="$i18n.locale=='ja'", target="_blank", v-if="questLibrary.category==1",
      :href="$const.wikiwiki.quest.format(questLibrary.name)")
      v-list-item-title.primary--text イベント攻略 - {{$t('Wikiwiki.Title')}}
      v-list-item-action.ma-0: v-icon mdi-open-in-new

    v-divider
    Ad(:key="`quest-library-ad-${id}`")

    div(v-show="questLibrary.category==1")
      v-divider.mb-4
      .float-right.pr-4
        v-btn(icon, @click="show=!show")
          v-icon(v-if="show") mdi-chevron-up
          v-icon(v-else) mdi-chevron-down
      
      p.px-4.title.primary--text(@click="show=true") {{$t('Event Information')}}

    v-expand-transition
      div(v-show="show")
        v-list-item(v-if="event.m_Url", :href="event.m_Url", target="_blank")
          v-list-item-title.primary--text {{$t('Event Abstract')}}
          v-list-item-action.ma-0: v-icon mdi-open-in-new

        template(v-if="questLibrary.category==1")
          v-divider.mb-4
          ItemCategory(:id="id", questLibrary)

        template(v-if="eventBonus")
          v-divider.mb-4
          EventBonus(:id="id")
      
    template(v-for="questID in questLibrary.quests")
      v-divider
      Quest(:id="questID", :key="`questlibrary-quest-${questID}`")
</template>

<script>
import ItemCategory from '@/views/Items/Category';
import Quest from './Quest';
import EventBonus from './EventBonus';

export default {
  name: 'QuestLibrary',
  props: ['id'],
  components: { Quest, ItemCategory, EventBonus },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    questLibrary() {
      return this.$db.QuestLibraryList[this.id];
    },
    event() {
      if (this.questLibrary.category == 1) {
        return this.$db.Events[this.id] || {};
      } else {
        return {};
      }
    },
    eventBonus() {
      return this.$db.EventQuestDropExt.filter(
        (item) => item.m_EventType == this.id
      ).length;
    },
  },
};
</script>