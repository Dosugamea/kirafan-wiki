<template lang="pug">
div
  v-subheader {{ $t('Common') }}
  Config(configName="appTitleShowID", :title="$t('App Title Show ID')")
  Config(configName="isHomePageFooterFixed", :title="$t('Footer Fixed')")
  //- v-list-item(@click="$s.advancedFilter=!$s.advancedFilter")
  //-   v-list-item-content: v-list-item-title {{$t('Advanced Filter')}}
  //-   v-list-item-action: v-switch(color="primary", readonly, v-model="$s.advancedFilter")

  v-divider
  v-subheader {{ $t('Characters') }}
  Config(
    configName="characterShowMaxStatus",
    :title="$t('Character Show Max Status')",
    :subtitle="$t('Character Show Max Status Hint')"
  )
  Config(
    configName="characterTalentShowLuck",
    :title="$t('Character Talent Show Luck')"
  )
  Config(
    configName="characterIconFramed",
    :title="$t('Character Icon Framed')"
  )
  Config(
    configName="downloadAudioFilesDirectly",
    :title="$t('Download Audio Files Directly')",
    :subtitle="$t('Setting Hint:Download Audio Files Directly')"
  )
  Config(configName="loadScenarioVoice", :title="$t('Load Scenario Voice')")

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
  v-subheader {{ $t('Quests') }}
  Config(configName="questDropsGrouped", :title="$t('Quest Drops Grouped')")
  Config(configName="enemyAIPattern", :title="$t('Enemy AI Pattern')")

  v-divider
  v-subheader {{ $t('Clea') }}
  v-list-item(@click="reloadClea")
    v-list-item-content
      v-list-item-title {{ $t('Show Clea On Start') }}
      v-list-item-subtitle {{ $t('Show Clea On Start Hint') }}
    v-list-item-action: v-switch(
      color="primary",
      readonly,
      v-model="$s.showCleaOnStart"
    )
  Config(configName="showCleaInDetailPage", :title="$t('Show Clea In Detail Page')",:subtitle="$t('Show Clea In Detail Page Hint')")

  v-divider
  v-subheader {{ $t('Database') }}
  v-list-item(@click="")
    v-list-item-content: v-list-item-title {{ $t('Database Fetch Time') }}
    v-list-item-action: v-list-item-action-text {{ new Date($store.state.$db.date).toLocaleString() }}
  v-list-item(@click="")
    v-list-item-content: v-list-item-title {{ $t('Hash') }}
    v-list-item-action: v-list-item-action-text {{ $store.state.$db.version }}
  v-list-item(@click="reloadDatabase")
    v-list-item-content: v-list-item-title {{ $t('Reload Database') }}
    v-list-item-action: v-icon mdi-refresh

  v-divider
  v-subheader {{ $t('Application') }}
  v-list-item(@click="")
    v-list-item-content: v-list-item-title {{ $t('Version') }}
    v-list-item-action: v-list-item-action-text {{ $version }}
  v-list-item(@click="unregister")
    v-list-item-content: v-list-item-title {{ $t('Reload Application') }}
    v-list-item-action: v-icon mdi-refresh

  template(v-if="$i18n.locale != 'ja'")
    v-divider
    v-subheader {{ $t('Language') }}

    Config(configName="alwaysShowJapanese", :title="$t('Always Show Japanese')")
    v-list-item(@click="")
      v-list-item-content: v-list-item-title {{ $t('Package Fetch Time') }}
      v-list-item-action: v-list-item-action-text {{ new Date(translations.date).toLocaleString() }}
    v-list-item(@click="")
      v-list-item-content: v-list-item-title {{ $t('Hash') }}
      v-list-item-action: v-list-item-action-text {{ translations.version }}
    v-list-item(@click="reloadTranslations")
      v-list-item-content: v-list-item-title {{ $t('Reload Language Package') }}
      v-list-item-action: v-icon mdi-refresh
    v-list-item(:href="$const.sites.translations", target="_blank")
      v-list-item-content: v-list-item-title {{ $t('Help Translate Names') }}
      v-list-item-action: v-icon mdi-open-in-new

  v-divider
  v-subheader {{ $t('Contact') }}
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

.limit-width {
  width: 5px;
}
</style>

<script>
import settings from "@/settings";
import translations from "@/translations";
import { del } from "@/idb-localforage";
import { unregister } from "register-service-worker";

import Config from "./Config";

export default {
  name: "Settings",
  components: { Config },
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
