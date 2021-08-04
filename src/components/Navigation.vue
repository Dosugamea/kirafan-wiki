<template lang="pug">    
  v-list.overflow-y-auto
    v-list-item(to="/")
      v-list-item-icon: v-icon mdi-home
      v-list-item-content: v-list-item-title {{$t('Home')}}

    v-divider
    v-subheader.hidden-md-and-down {{$t('Battle')}}
    v-list-item(to="/characters")
      v-list-item-icon: v-icon mdi-cards
      v-list-item-content: v-list-item-title {{$t('Characters')}}
    v-list-item(to="/weapons")
      v-list-item-icon: v-icon mdi-sword
      v-list-item-content: v-list-item-title {{$t('Weapons')}}
    v-list-item(to="/questlibraries")
      v-list-item-icon: v-icon mdi-sword-cross
      v-list-item-content: v-list-item-title {{$t('Quests')}}
    v-list-item(to="/master")
      v-list-item-icon: v-icon mdi-chess-queen
      v-list-item-content: v-list-item-title {{$t('Master')}}    

    v-divider
    v-subheader.hidden-md-and-down {{$t('Items')}}
    v-list-item(to="/items")
      v-list-item-icon: v-icon mdi-flower-poppy
      v-list-item-content: v-list-item-title {{$t('Items')}}
    v-list-item(to="/roomobjects")
      v-list-item-icon: v-icon mdi-seat
      v-list-item-content: v-list-item-title {{$t('Room Objects')}}
    v-list-item(to="/townobjects")
      v-list-item-icon: v-icon mdi-castle
      v-list-item-content: v-list-item-title {{$t('Town Objects')}}

    v-divider
    v-subheader.hidden-md-and-down {{$t('Library')}}
    v-list-item(to="/titles")
      v-list-item-icon: v-icon mdi-book
      v-list-item-content: v-list-item-title {{$t('Titles')}}
    v-list-item(to="/scenariolibraries")
      v-list-item-icon: v-icon mdi-book-open-page-variant
      v-list-item-content: v-list-item-title {{$t('Scenarios')}}

    v-divider
    v-subheader.hidden-md-and-down {{$t('Others')}}
    v-menu(top, offset-x, :close-on-content-click="false")
      template(v-slot:activator="{on}")
        v-list-item(v-on="on")
          v-list-item-icon: v-icon mdi-link
          v-list-item-content: v-list-item-title {{$t('Tools')}}
          v-list-item-action: v-icon mdi-chevron-right
      v-list.overflow-y-auto(style="max-height: calc(100vh - 24px)")
          v-subheader {{$t('Applications')}}
          v-list-item(:href="$const.sites.calculator", target="_blank")
            v-list-item-icon: v-icon mdi-calculator
            v-list-item-content
              v-list-item-title {{$t('Calculator.Title')}}
              v-list-item-subtitle {{$t('Calculator.Subtitle')}}
          v-list-item(:href="$const.sites.assets", target="_blank")
            v-list-item-icon: v-icon mdi-image
            v-list-item-content
              v-list-item-title {{$t('Assets.Title')}}
              v-list-item-subtitle {{$t('Assets.Subtitle')}}
          v-list-item(:href="$const.sites.cardmaker", target="_blank")
            v-list-item-icon: v-icon mdi-cards-outline
            v-list-item-content
              v-list-item-title {{$t('Card Maker.Title')}}
              v-list-item-subtitle {{$t('Card Maker.Subtitle')}}
          v-divider
          v-subheader {{$t('External Links')}}
          v-list-item(:href="$const.sites.yarudesu", target="_blank")
            v-list-item-content
              v-list-item-title {{$t('Yarudesu.Title')}}
              v-list-item-subtitle {{$t('Yarudesu.Subtitle')}}
          v-list-item(:href="$const.sites.wikiwiki", target="_blank")
            v-list-item-content
              v-list-item-title {{$t('Wikiwiki.Title')}}
              v-list-item-subtitle {{$t('Wikiwiki.Subtitle')}}
          v-list-item(:href="$const.sites.moegirl", target="_blank")
            v-list-item-content
              v-list-item-title {{$t('Moegirl.Title')}}
              v-list-item-subtitle {{$t('Moegirl.Subtitle')}}
          v-list-item(:href="$const.sites.miraheze", target="_blank")
            v-list-item-content
              v-list-item-title {{$t('Miraheze.Title')}}
              v-list-item-subtitle {{$t('Miraheze.Subtitle')}}
          v-list-item(:href="$const.sites.timer", target="_blank")
            v-list-item-content
              v-list-item-title {{$t('Timers.Title')}}
              v-list-item-subtitle {{$t('Timers.Subtitle')}}
    v-list-item.hidden-sm-and-up(to="/settings")
      v-list-item-icon: v-icon mdi-cog
      v-list-item-content: v-list-item-title {{$t('Settings')}}
    v-menu(top, offset-x, :close-on-content-click="false")
      template(v-slot:activator="{on}")
        v-list-item.hidden-xs-only(v-on="on")
          v-list-item-icon: v-icon mdi-cog
          v-list-item-content: v-list-item-title {{$t('Settings')}}
          v-list-item-action: v-icon mdi-chevron-right
      v-list.overflow-y-auto(style="max-height: calc(100vh - 24px)")
        Settings

</template>

<script>
import Settings from '@/views/Settings';

export default {
  name: 'Navigation',
  components: { Settings },
};
</script>