import Vue from 'vue'
import Vuex from 'vuex'
import { set } from "@/utils/vuex";
import functions from "@/utils/functions";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseSharePointId: '4b096747-0b35-4956-b6bb-3ae802451174,98d3a323-daa8-4e56-a37a-edd946b5ba78',
    learnItemsId: '85e2a978-365d-4c37-bf64-1530e3a6d4bb',
    learnUsersId: 'fb501273-2a61-4d35-83ed-ae3efaf41815',
    learnLevelsId: '691dcb5f-0a34-4f41-809e-a11eab84bf5f',
    learnRolesId: '0f161b5a-6a4c-40f0-860c-690ca4b5a2d1',
    learnReviewsId: '058acdbf-c2aa-4473-b23b-52f66d54a6fd',
    learnProductsId: '9794a980-15c4-40e6-bef7-24658dcb3601',
    learnUnitsId: 'fead18ce-9622-4dd6-abb7-244e3f4648b4',
    learnTypesId: '21e68f59-26b9-46e3-8b83-0a04c99335e3',
    learnChecksId: '9513338d-dca6-4c50-a3f2-ef85285b10dd',
    sharePointLists: null,
    mgtShow: true,
    theme: null,
    now: null,
    accessToken: null,
    account: null,
    routes: null,
    learnPathId: null,
    learnModuleId: null,
    learnUnitId: null,
    learnItems: null,
    learnUserProfile: null,
    learnUnitItems: null,
    learnProductItems: null,
    selectedProducts: null,
    learnRoleItems: null,
    selectedRoles: null,
    loading: false,
    learnUnitIndex: null,
    learnUnitItemsCount: null,
    learnKnowledgeChecks: null,
    learnKnowledgeCheckPass: false,
  },
  mutations: {
    setSharePointLists: set('sharePointLists'),
    setMgtShow: set('mgtShow'),
    setTheme: set('theme'),
    setLoading: set('loading'),
    setNow: set('now'),
    setAccessToken: set('accessToken'),
    setAccount: set('account'),
    setRoutes: set('routes'),
    setLearnPathId: set('learnPathId'),
    setLearnModuleId: set('learnModuleId'),
    setLearnUnitId: set('learnUnitId'),
    setLearnUnitItems: set('learnUnitItems'),
    setLearnUserProfile: set('learnUserProfile'),
    setLearnItems: set('learnItems'),
    setLearnProductItems: set('learnProductItems'),
    setSelectedProducts: set('selectedProducts'),
    setLearnRoleItems: set('learnRoleItems'),
    setSelectedRoles: set('selectedRoles'),
    setLearnUnitIndex: set('learnUnitIndex'),
    setLearnUnitItemsCount: set('learnUnitItemsCount'),
    setLearnKnowledgeChecks: set('learnKnowledgeChecks'),
    setLearnKnowledgeCheckPassß: set('learnKnowledgeCheckPass'),
  },
  getters: {
    learnUnit: (state) => {
      if (!state.learnUnitId) return;
      if (!state.learnUnitItems) return;
      return state.learnUnitItems.find(e => e.id === state.learnUnitId);
    },
    learnModule: (state) => {
      if (!state.learnModuleId) return;
      if (!state.learnItems) return;
      return state.learnItems.find(e => e.id === state.learnModuleId);
    },
    learnPath: (state) => {
      if (!state.learnPathId) return;
      if (!state.learnItems) return;
      return state.learnItems.find(e => e.id === state.learnPathId);
    },
    learnKnowledgeCheck: (state, getters) => {
      if (!getters.learnUnit) return;
      if (!state.learnKnowledgeChecks) return;
      if (!getters.learnUnit.knowledgeCheck) return;
      let num = getters.learnUnit.knowledgeCheck;
      let check = state.learnKnowledgeChecks.find(e => Number(e.id) === num);
      return JSON.parse(check.JSON_Data);
    },
    learnPathModulesItems: (state, getters) => {
      if (!state.learnPathId) return;
      if (!getters.learnPath) return;
      if (!getters.learnPath.childern) return;
      let moduleIds = getters.learnPath.childern.split(',');
      let items = [];
      moduleIds.forEach(item => {
        let object = state.learnItems.find(e => e.id === item);
        if (object.childern) {
          if (!state.learnUnitItems) return;
          let unitIds = object.childern.split(',');
          let units = [];
          unitIds.forEach(unitId => {
            units.push(state.learnUnitItems.find(e => e.id === unitId));
          });
          object.units = units;
        }
        if (object) {
          items.push(object);
        }
      });
      return items
    },
    learnModulesUnitItems: (state, getters) => {
      if (!state.learnUnitItems) return 0;
      if (!getters.learnModule) return 0;
      if (!getters.learnModule.childern) return 0;
      let moduleIds = getters.learnModule.childern.split(',');
      let items = [];
      moduleIds.forEach(item => {
        let object = state.learnUnitItems.find(e => e.id === item);
        if (object) {
          items.push(object);
        }
      });
      return items
    },
    breadcrumbs: (state, getters) => {
      if (!state.learnItems) return;
      try {
        let disabled = false;
        let items = [{
          text: 'Learn',
          disabled: false,
          href: '/',
        }, {
          text: 'Browse',
          disabled: false,
          href: '/browse',
        }];
        if (state.learnPathId) {
          disabled = state.learnModuleId === null;
          items.push({
            text: getters.learnPath.Title,
            disabled: disabled,
            href: '/path/' + state.learnPathId,
          });
        }
        if (state.learnModuleId) {
          disabled = state.learnModuleId === null;
          items.push({
            text: getters.learnModule.Title,
            disabled: disabled,
            href: '/module/' + state.learnModuleId,
          })
        }
        if (state.learnUnitId) {
          disabled = state.learnUnitId === null;
          items.push({
            text: getters.learnUnit.Title,
            disabled: disabled,
            href: '/unit',
          })
        }
        return items;
      } catch {
        return null;
      }
    },
  },
  actions: {
    checkKnowledge: function ({ commit }) {
      commit("setLoading", true);
      setTimeout(() => {
        commit("setLoading", false);
      }, 2);
    },
    handleChange: function ({ commit }) {
      commit("setLoading", true);
      setTimeout(() => {
        commit("setLoading", false);
      }, 2);
    },
    toggleTheme: function ({ commit }) {
      commit('setMgtShow', false);
      document.querySelector("#app").__vue__.$vuetify.theme.isDark = !document.querySelector("#app").__vue__.$vuetify.theme.isDark;
      setTimeout(() => {
        commit('setMgtShow', true);
      }, 2);
    },
    getLearnItems: function ({ state, commit }) {
      let res = functions.getSharePointListItems(state.baseSharePointId, state.accessToken, state.learnItemsId);
      res.then((res) => {
        if (Array.isArray(res.value)) {
          commit('setLearnItems', res.value.map(e => { return e.fields }));
        }
      });
    },
    getLearnUnitItems: function ({ state, commit }) {
      let res = functions.getSharePointListItems(state.baseSharePointId, state.accessToken, state.learnUnitsId);
      res.then((res) => {
        if (Array.isArray(res.value)) {
          commit('setLearnUnitItems', res.value.map(e => { return e.fields }));
        } else {
          commit('setLearnUnitItems', null);
        }
      });
    },
    getProductItems: function ({ state, commit }) {
      let res = functions.getSharePointListItems(state.baseSharePointId, state.accessToken, state.learnProductsId);
      res.then((res) => {
        if (Array.isArray(res.value)) {
          commit('setLearnProductItems', res.value.map(e => { return e.fields }));
        }
      });
    },
    getRoleItems: function ({ state, commit }) {
      let res = functions.getSharePointListItems(state.baseSharePointId, state.accessToken, state.learnRolesId);
      res.then((res) => {
        if (Array.isArray(res.value)) {
          commit('setLearnRoleItems', res.value.map(e => { return e.fields }));
        }
      });
    },
    getUserProfile: function ({ state, commit }) {
      let res = functions.getSharePointListItems(state.baseSharePointId, state.accessToken, state.learnUsersId, 1, `&$filter=fields/user_email eq '${state.account.username}'`);
      res.then((res) => {
        if (Array.isArray(res.value)) {
          commit('setLearnUserProfile', res.value.map(e => { return e.fields })[0]);
        }
      });
    },
    getLearnKnowledgeChecks: function ({ state, commit }) {
      let res = functions.getSharePointListItems(state.baseSharePointId, state.accessToken, state.learnChecksId);
      res.then((res) => {
        if (Array.isArray(res.value)) {
          commit('setLearnKnowledgeChecks', res.value.map(e => { return e.fields }));
        }
      });
    },
  },
  modules: {
  }
})
