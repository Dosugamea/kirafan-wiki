<template lang="pug">
  div
    v-subheader {{$t('Common')}}
    v-list-item(@click="$s.appTitleShowID=!$s.appTitleShowID")
      v-list-item-content: v-list-item-title {{$t('App Title Show ID')}}
      v-list-item-action: v-switch(color="primary", readonly, v-model="$s.appTitleShowID")
    //- v-list-item(@click="$s.advancedFilter=!$s.advancedFilter")
    //-   v-list-item-content: v-list-item-title {{$t('Advanced Filter')}}
    //-   v-list-item-action: v-switch(color="primary", readonly, v-model="$s.advancedFilter")

    v-divider
    v-subheader {{$t('Characters')}}
    v-list-item(@click="$s.characterShowMaxStatus=!$s.characterShowMaxStatus")
      v-list-item-content
        v-list-item-title {{$t('Character Show Max Status')}}
        v-list-item-subtitle {{$t('Character Show Max Status Hint')}}
      v-list-item-action: v-switch(color="primary", readonly, v-model="$s.characterShowMaxStatus")
    v-list-item(@click="$s.characterTalentShowLuck=!$s.characterTalentShowLuck")
      v-list-item-content: v-list-item-title {{$t('Character Talent Show Luck')}}
      v-list-item-action: v-switch(color="primary", readonly, v-model="$s.characterTalentShowLuck")
    v-list-item(@click="$s.characterIconFramed=!$s.characterIconFramed")
      v-list-item-content: v-list-item-title {{$t('Character Icon Framed')}}
      v-list-item-action: v-switch(color="primary", readonly, v-model="$s.characterIconFramed")
    v-list-item(@click="$s.loadAssetbundle=!$s.loadAssetbundle")
      v-list-item-content: v-list-item-title {{$t('Load assetBundle.json')}}
      v-list-item-action: v-switch(color="primary",  readonly,v-model="$s.loadAssetbundle")

    //- v-list-item()
        //- v-col(cols="4")
        v-list-item-content
          v-list-item-title {{$t('Set Max Frendship')}}
          v-list-item-subtitle {{$t('Set Max Frendship Hint')}}
        //- v-col(cols="8")
        v-text-field(
              :label="$t('Friendship')"
              type="number"
              filled
              class="limit-width"
              :value="$s.maxFriendship" 
              @input="$s.maxFriendship = Number($event)"
              )            
          v-icon(slot="append" color="red")
          v-icon(slot="append" color="red")
    
            
            
    v-divider
    v-subheader {{$t('Quests')}}
    v-list-item(@click="$s.questDropsGrouped=!$s.questDropsGrouped")
      v-list-item-content: v-list-item-title {{$t('Quest Drops Grouped')}}
      v-list-item-action: v-switch(color="primary", readonly, v-model="$s.questDropsGrouped")
    v-list-item(@click="$s.enemyAIPattern=!$s.enemyAIPattern")
      v-list-item-content: v-list-item-title {{$t('Enemy AI Pattern')}}
      v-list-item-action: v-switch(color="primary", readonly, v-model="$s.enemyAIPattern")

    v-divider
    v-subheader {{$t('Clea')}}
    v-list-item(@click="reloadClea")
      v-list-item-content
        v-list-item-title {{$t('Show Clea On Start')}}
        v-list-item-subtitle {{$t('Show Clea On Start Hint')}}
      v-list-item-action: v-switch(color="primary", readonly, v-model="$s.showCleaOnStart")
    v-list-item(@click="$s.showCleaInDetailPage=!$s.showCleaInDetailPage")
      v-list-item-content
        v-list-item-title {{$t('Show Clea In Detail Page')}}
        v-list-item-subtitle {{$t('Show Clea In Detail Page Hint')}}
      v-list-item-action: v-switch(color="primary", readonly, v-model="$s.showCleaInDetailPage")

    v-divider
    v-subheader {{$t('Database')}}
    v-list-item(@click="")
      v-list-item-content: v-list-item-title {{$t('Database Fetch Time')}}
      v-list-item-action: v-list-item-action-text {{new Date($db.date).toLocaleString()}}
    v-list-item(@click="")
      v-list-item-content: v-list-item-title {{$t('Hash')}}
      v-list-item-action: v-list-item-action-text {{$db.version}}
    v-list-item(@click="reloadDatabase")
      v-list-item-content: v-list-item-title {{$t('Reload Database')}}
      v-list-item-action: v-icon mdi-refresh

    v-divider
    v-subheader {{$t('Application')}}
    v-list-item(@click="")
      v-list-item-content: v-list-item-title {{$t('Version')}}
      v-list-item-action: v-list-item-action-text {{$version}}
    v-list-item(@click="unregister")
      v-list-item-content: v-list-item-title {{$t('Reload Application')}}
      v-list-item-action: v-icon mdi-refresh

    template(v-if="$i18n.locale!='ja'")
      v-divider
      v-subheader {{$t('Language')}}
      v-list-item(@click="$s.alwaysShowJapanese=!$s.alwaysShowJapanese")
        v-list-item-content: v-list-item-title {{$t('Always Show Japanese')}}
        v-list-item-action: v-switch(color="primary", readonly, v-model="$s.alwaysShowJapanese")
      v-list-item(@click="")
        v-list-item-content: v-list-item-title {{$t('Package Fetch Time')}}
        v-list-item-action: v-list-item-action-text {{new Date(translations.date).toLocaleString()}}
      v-list-item(@click="")
        v-list-item-content: v-list-item-title {{$t('Hash')}}
        v-list-item-action: v-list-item-action-text {{translations.version}}
      v-list-item(@click="reloadTranslations")
        v-list-item-content: v-list-item-title {{$t('Reload Language Package')}}
        v-list-item-action: v-icon mdi-refresh
      v-list-item(:href="$const.sites.translations", target="_blank")
        v-list-item-content: v-list-item-title {{$t('Help Translate Names')}}
        v-list-item-action: v-icon mdi-open-in-new
    
    v-divider
    v-subheader {{$t('Contact')}}
    Credit(name="林檎アメ")
    
</template>

<style>
/* Chrome/Safari */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.limit-width{
  width:5px;
}
</style>

<script>
import settings from "@/settings";
import translations from "@/translations";
import { del } from "idb-keyval";
import { unregister } from "register-service-worker";

export default {
  name: "Settings",
  data() {
    return {
      settings: settings,
      translations: translations,
    };
  },
  methods: {
    reloadDatabase() {
      del("databaseVersion").then(() => {
        location.reload();
      });
    },
    reloadTranslations() {
      del("translationVersion").then(() => {
        location.reload();
      });
    },
    unregister() {
      unregister();
      location.reload();
    },
    reloadClea() {
      settings.showCleaOnStart = !settings.showCleaOnStart;
      window.vue.$emit("cleaVisibility", settings.showCleaOnStart);
    },
  },
};
</script>
