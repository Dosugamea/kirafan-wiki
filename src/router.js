import Vue from 'vue';
import VueRouter from 'vue-router';
import goTo from 'vuetify/es5/services/goto';
import Home from './views/Home';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/character/:id',
    name: 'Character',
    props: true,
    component: () => import('./views/Character')
  },
  {
    path: '/characters',
    name: 'Characters',
    props: true,
    component: () => import('./views/Characters')
  },
  {
    path: '/item/:id',
    name: 'Item',
    props: true,
    component: () => import('./views/Item')
  },
  {
    path: '/items',
    name: 'Items',
    props: true,
    component: () => import('./views/Items')
  },
  {
    path: '/weapon/:id',
    name: 'Weapon',
    props: true,
    component: () => import('./views/Weapon')
  },
  {
    path: '/weapons',
    name: 'Weapons',
    props: true,
    component: () => import('./views/Weapons')
  },
  {
    path: '/master',
    name: 'Master',
    props: true,
    component: () => import('./views/Master')
  },
  {
    path: '/masterorb/:id',
    name: 'Master Orb',
    props: true,
    component: () => import('./views/MasterOrb')
  },
  {
    path: '/questlibraries',
    name: 'Quest Libraries',
    props: true,
    component: () => import('./views/QuestLibraries')
  },
  {
    path: '/questlibrary/:id',
    name: 'Quest Library',
    props: true,
    component: () => import('./views/QuestLibrary')
  },
  {
    path: '/quest/:id',
    name: 'Quest',
    props: true,
    component: () => import('./views/Quest')
  },
  {
    path: '/enemy/:id',
    name: 'Enemy',
    props: true,
    component: () => import('./views/Enemy')
  },
  {
    path: '/roomobject/:id',
    name: 'Room Object',
    props: true,
    component: () => import('./views/RoomObject')
  },
  {
    path: '/roomobjects',
    name: 'Room Objects',
    props: true,
    component: () => import('./views/RoomObjects')
  },
  {
    path: '/townobject/:id',
    name: 'Town Object',
    props: true,
    component: () => import('./views/TownObject')
  },
  {
    path: '/townobjects',
    name: 'Town Objects',
    props: true,
    component: () => import('./views/TownObjects')
  },
  {
    path: '/scenario/:id',
    name: 'Scenario',
    props: true,
    component: () => import('./views/Scenario')
  },
  {
    path: '/scenarioLibraries',
    name: 'Scenario Libraries',
    props: true,
    component: () => import('./views/ScenarioLibraries')
  },
  {
    path: '/scenarioLibrary/:id',
    name: 'Scenario Library',
    props: true,
    component: () => import('./views/ScenarioLibrary')
  },
  {
    path: '/standpic/:id',
    name: 'Standpic',
    props: true,
    component: () => import('./views/Standpic')
  },
  {
    path: '/named/:id',
    name: 'Named',
    props: true,
    component: () => import('./views/Named')
  },
  {
    path: '/title/:id',
    name: 'Title',
    props: true,
    component: () => import('./views/Title')
  },
  {
    path: '/titles',
    name: 'Titles',
    props: true,
    component: () => import('./views/Titles')
  },
  {
    path: '/originalcharacter/:id',
    name: 'Original Character',
    props: true,
    component: () => import('./views/OriginalCharacter/')
  },
  {
    path: '/settings',
    name: 'Settings',
    props: true,
    component: () => import('./views/Settings')
  },
];

const router = new VueRouter({
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;
    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }
    return goTo(scrollTo, { duration: 0 });
  },
  routes
});

export default router;
