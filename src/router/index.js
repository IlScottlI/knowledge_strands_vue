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
      path: '/path/:id?',
      name: 'Path',
      show: false,
      nav: true,
      icon: mdiHome,
      component: () => import(/* webpackChunkName: "path" */ '../views/Paths'),
    },
    {
      id: 3,
      path: '/module/:id?',
      name: 'Module',
      show: false,
      nav: true,
      icon: mdiHome,
      component: () => import(/* webpackChunkName: "modules" */ '../views/Modules'),
    },
    {
      id: 4,
      path: '/unit/:id?',
      name: 'Unit',
      show: false,
      nav: true,
      icon: mdiHome,
      component: () => import(/* webpackChunkName: "unit" */ '../views/Units'),
    },
  ],
})

router.afterEach(() => {
  // console.log(e);
});

export default router
