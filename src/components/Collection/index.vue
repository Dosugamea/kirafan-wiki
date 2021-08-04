<template lang="pug">
  div
    .hidden-sm-only
      v-tabs(v-model="c.current", background-color="transparent", grow, mobile-break-point=9999)
        v-tab.px-0(v-for="i in 3", :key="`collection-tab-${i}`") {{i}}
    .hidden-xs-only.hidden-md-and-up
      v-list-item(@click="c.current=(c.current+1)%3")
        v-list-item-content
          .text-center.primary--text(style="font-size: 14px; font-weight: 500") {{c.current+1}}

    v-divider

    v-tabs-items(v-model="c.current")
      v-tab-item(v-for="i in 3", :key="`collection-tab-item-${i}`")
        v-list.overflow-y-auto.py-0(style="height: calc(100vh - 56px - 48px - 2px - 52px)")
          template(v-for="collection, j in c.collections[i-1].slice().reverse()")
            v-divider(v-if="j")

            Character(v-if="collection.name=='Character'",
              :key="`collection-${i}-${collection.name}-${collection.id}`", :id="collection.id", collection)
            Weapon(v-else-if="collection.name=='Weapon'",
              :key="`collection-${i}-${collection.name}-${collection.id}`", :id="collection.id", collection)
            QuestLibrary(v-else-if="collection.name=='Quest Library'",
              :key="`collection-${i}-${collection.name}-${collection.id}`", :id="collection.id", collection)
            Enemy(v-else-if="collection.name=='Enemy'", :level="parseInt(collection.level)", :qid="collection.qid",
              :key="`collection-${i}-${collection.name}-${collection.id}`", :id="collection.id", collection)
            Item(v-else-if="collection.name=='Item'",
              :key="`collection-${i}-${collection.name}-${collection.id}`", :id="collection.id", collection)
            RoomObject(v-else-if="collection.name=='Room Object'",
              :key="`collection-${i}-${collection.name}-${collection.id}`", :id="collection.id", collection)
            TownObject(v-else-if="collection.name=='Town Object'",
              :key="`collection-${i}-${collection.name}-${collection.id}`", :id="collection.id", collection)
            Orb(v-else-if="collection.name=='Master Orb'",
              :key="`collection-${i}-${collection.name}-${collection.id}`", :id="collection.id", collection)

            v-list-item(v-else, :to="{ name: collection.name, params: { id: collection.id }}",
              :key="`collection-${i}-${collection.name}-${collection.id}`")

              v-list-item-content
                v-list-item-subtitle {{$t(collection.name)}}
                v-list-item-subtitle {{collection.id}}

        v-divider

        v-list-item
          v-list-item-icon.ma-2.ml-0
            v-btn(icon): v-icon mdi-filter
          v-list-item-content
            v-list-item-title {{c.collections[i-1].length}} {{$t('Pages')}}
          v-list-item-action.ma-2.mr-0
            v-btn(icon, @click="c.collections[i-1].splice(0)"): v-icon mdi-delete
</template>

<script>
// eslint-disable-next-line
import c from './functions';
import Character from '@/views/Characters/Character';
import Weapon from '@/views/Weapons/Weapon';
import QuestLibrary from '@/views/QuestLibraries/QuestLibrary';
import Enemy from '@/views/Quest/Enemy';
import Item from '@/views/Items/Item';
import RoomObject from '@/views/RoomObjects/RoomObject';
import TownObject from '@/views/TownObjects/TownObject';
import Orb from '@/views/Master/Orb';

export default {
  name: 'Collection',
  components: { Character, Weapon, QuestLibrary, Enemy, Item, RoomObject, TownObject, Orb },
  data() {
    return {
      c: c,
    };
  },
};
</script>