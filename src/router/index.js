import Vue from 'vue'
import Router from 'vue-router'
import { mdiHome } from "@mdi/js";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    {
      id: 0,
      path: '/',
      name: 'Home',
      show: false,
      nav: true,
      icon: mdiHome,
      component: () => import(/* webpackChunkName: "home" */ '../views/Home'),
    },
    {
      id: 1,
      path: '/browse',
      name: 'Browse',
      show: false,
      nav: true,
      icon: mdiHome,
      component: () => import(/* webpackChunkName: "browse" */ '../views/Browse'),
    },
    {
      id: 2,
      path: '/path',
      name: 'Path',
      show: false,
      nav: true,
      icon: mdiHome,
      component: () => import(/* webpackChunkName: "path" */ '../views/Paths'),
    },
    {
      id: 3,
      path: '/module',
      name: 'Module',
      show: false,
      nav: true,
      icon: mdiHome,
      component: () => import(/* webpackChunkName: "modules" */ '../views/Modules'),
    },
    {
      id: 4,
      path: '/unit',
      name: 'Unit',
      show: false,
      nav: true,
      icon: mdiHome,
      component: () => import(/* webpackChunkName: "unit" */ '../views/Units'),
    },
    {
      id: 5,
      path: '/qualify',
      name: 'Qualify',
      show: false,
      nav: true,
      icon: mdiHome,
      component: () => import(/* webpackChunkName: "qualify" */ '../views/Qualify'),
    },
    {
      id: 6,
      path: '/eLearning',
      name: 'eLearning',
      show: false,
      nav: true,
      icon: mdiHome,
      component: () => import(/* webpackChunkName: "elearning" */ '../views/eLearning'),
    },
    {
      id: 6,
      path: '/docs',
      name: 'docs',
      show: false,
      nav: true,
      icon: mdiHome,
      component: () => import(/* webpackChunkName: "docs" */ '../views/DocsView'),
    },
  ],
})
router.afterEach(async (e) => {
  let filterCount = 0;
  let { category, role, path, level, term, hideCompleted } = e.query;
  path; term;
  let $store = await document.getElementById('app').__vue__.$store;
  let filterTags = [];
  if (category) {
    filterCount = filterCount + 1;
    let tags = category.split(',').map(e => {
      return { tag: e, type: 'products' }
    });
    if (tags.length > 0) {
      tags.forEach(tag => {
        filterTags.push(tag);
      });
    }
  }
  if (role) {
    filterCount = filterCount + 1;
    let tags = role.split(',').map(e => {
      return { tag: e, type: 'roles' }
    });
    if (tags.length > 0) {
      tags.forEach(tag => {
        filterTags.push(tag);
      });
    }
  }
  if (level) {
    filterCount = filterCount + 1;
    let tags = level.split(',').map(e => {
      return { tag: e, type: 'levels' }
    });
    if (tags.length > 0) {
      tags.forEach(tag => {
        filterTags.push(tag);
      });
    }
  }
  if (hideCompleted) {
    filterCount = filterCount + 1;
    filterTags.push({ tag: 'Hide completed', type: 'hideCompleted' })
  }
  $store.commit('setFilterTags', filterTags);
  $store.commit('setFilterCount', filterCount);
});

export default router;
