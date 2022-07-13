import Vue from "vue";
import Vuex from "vuex";
import { set } from "@/utils/vuex";
import functions from "@/utils/functions";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loaded: false,
    route: null,
    routeQuery: null,
    baseSharePointId:
      "82d3770e-1fe9-45de-baa1-e84de3c8aecd,47c6565e-5561-412b-b432-74614152ac0b",
    learnItemsId: "a597d666-8f64-43fd-9b1a-35a60040d4b4",
    learnUsersId: "a216db6f-715b-4e07-a38f-55f78862fb7d",
    learnLevelsId: "c0ed8f5b-b411-4091-9c8f-0175a17b7a7e",
    learnRolesId: "bde450c0-dd3f-4b24-ac57-84647342475f",
    learnReviewsId: "ee8e166e-2105-47ac-b11b-2c7502771d72",
    learnProductsId: "9b99ede6-5181-48f1-a9e7-e6848d465921",
    learnUnitsId: "033f901b-eb56-4e08-a26a-ee143d61dc37",
    learnTypesId: "31ffeea8-6df8-4e11-8937-dfb46318a250",
    learnChecksId: "4311d379-81ec-4e44-aeea-38aff876f491",
    learnDevDocsId: "6b1ba693-1fb8-4ecc-bb97-d3fb447ecf89",
    sharePointLists: null,
    filterCount: 0,
    learnCategories: [],
    learnLevels: [],
    learnRoles: [],
    mgtShow: true,
    theme: null,
    now: null,
    accessToken: null,
    account: null,
    routes: null,
    learnPathId: null,
    learnModuleId: null,
    learnUnitId: null,
    learnItems: [],
    learnUserProfile: null,
    learnUnitItems: null,
    learnProductItems: null,
    selectedProducts: null,
    selectedProductIds: null,
    learnRoleItems: null,
    selectedRoles: null,
    selectedRoleIds: null,
    selectedLevels: null,
    selectedLevelIds: null,
    loading: false,
    learnUnitIndex: null,
    learnUnitItemsCount: null,
    learnUnitItemsCompleteCount: null,
    learnKnowledgeChecks: null,
    learnKnowledgeCheckResponse: [],
    learnKnowledgeCheckPass: false,
    learnDevDocItems: null,
    handleKnowledgeCheck: false,
    btnMessage: null,
    btnMessageType: null,
    filterTags: [],
    searchTerm: "",
    hideCompleted: false,
    eLearningItems: null,
    eLearningSkillBlockItems: null,
  },
  mutations: {
    setLoaded: set("loaded"),
    setRoute: set("route"),
    setRouteQuery: set("routeQuery"),
    setSharePointLists: set("sharePointLists"),
    setLearnCategories: set("learnCategories"),
    setFilterCount: set("filterCount"),
    setLearnLevels: set("learnLevels"),
    setLearnRoles: set("learnRoles"),
    setMgtShow: set("mgtShow"),
    setTheme: set("theme"),
    setLoading: set("loading"),
    setNow: set("now"),
    setAccessToken: set("accessToken"),
    setAccount: set("account"),
    setRoutes: set("routes"),
    setLearnPathId: set("learnPathId"),
    setLearnModuleId: set("learnModuleId"),
    setLearnUnitId: set("learnUnitId"),
    setLearnUnitItems: set("learnUnitItems"),
    setLearnUserProfile: set("learnUserProfile"),
    setLearnItems: set("learnItems"),
    setLearnProductItems: set("learnProductItems"),
    setSelectedProducts: set("selectedProducts"),
    setSelectedProductIds: set("selectedProductIds"),
    setLearnRoleItems: set("learnRoleItems"),
    setSelectedRoles: set("selectedRoles"),
    setSelectedRoleIds: set("selectedRoleIds"),
    setSelectedLevels: set("selectedLevels"),
    setSelectedLevelIds: set("selectedLevelIds"),
    setLearnUnitIndex: set("learnUnitIndex"),
    setLearnUnitItemsCount: set("learnUnitItemsCount"),
    setLearnUnitItemsCompleteCount: set("learnUnitItemsCompleteCount"),
    setLearnKnowledgeChecks: set("learnKnowledgeChecks"),
    setLearnKnowledgeCheckResponse: set("learnKnowledgeCheckResponse"),
    setLearnKnowledgeCheckPass: set("learnKnowledgeCheckPass"),
    setHandleKnowledgeCheck: set("handleKnowledgeCheck"),
    setBtnMessage: set("btnMessage"),
    setBtnMessageType: set("btnMessageType"),
    setFilterTags: set("filterTags"),
    setSearchTerm: set("searchTerm"),
    setHideCompleted: set("hideCompleted"),
    seteLearningItems: set("eLearningItems"),
    seteLearningSkillBlockItems: set("eLearningSkillBlockItems"),
    setLearnDevDocItems: set("learnDevDocItems"),
  },
  getters: {
    selectedProducts: (state) => {
      let res = [];
      let index = -1;
      if (!state.filterTags) return state.selectedProductIds = res;
      if (!state.filterTags) return;
      for (let i = 0; i < state.filterTags.length; i++) {
        if (state.filterTags[i].type === 'products') {
          index = state.learnCategories.indexOf(state.filterTags[i].tag);
          if (index !== -1) {
            res.push(index);
          }
        }
      }
      state.selectedProductIds = res;
      return res;
    },
    moduleIncomplete: (state) => {
      if (!state.learnUserProfile) return;
      if (!state.learnUserProfile.history_json) return;
      if (!state.learnModuleId) return;
      if (!state.learnItems) return;
      let historyJson = JSON.parse(state.learnUserProfile.history_json);
      let moduleId = state.learnItems.find((e) => String(e.id) == String(state.learnModuleId)).id;
      let completeModules = historyJson.progress.complete_modules.map(e => e.m);
      return !completeModules.includes(Number(moduleId));
    },
    historyJson: (state) => {
      if (!state.learnUserProfile) return;
      if (!state.learnUserProfile.history_json) return;
      return JSON.parse(state.learnUserProfile.history_json);
    },
    jsonCurrent: (state) => {
      if (!state.learnUserProfile) return;
      if (!state.learnUserProfile.current_json) return;
      return JSON.parse(state.learnUserProfile.current_json);
    },
    complete_units: (state) => {
      if (!state.learnUserProfile) return;
      if (!state.learnUserProfile.history_json) return;
      return JSON.parse(state.learnUserProfile.history_json).progress.complete_units;
    },
    complete_modules: (state) => {
      if (!state.learnUserProfile) return;
      if (!state.learnUserProfile.history_json) return;
      return JSON.parse(state.learnUserProfile.history_json).progress.complete_modules;
    },
    learnUnit: (state) => {
      if (!state.learnUnitId) return;
      if (!state.learnUnitItems) return;
      return state.learnUnitItems.find((e) => e.id === state.learnUnitId);
    },
    learnModule: (state) => {
      if (!state.learnModuleId) return;
      if (!state.learnItems) return;
      return state.learnItems.find((e) => e.id === state.learnModuleId);
    },
    learnPath: (state) => {
      if (!state.learnPathId) return;
      if (!state.learnItems) return;
      return state.learnItems.find((e) => e.id === state.learnPathId);
    },
    learnKnowledgeCheck: (state, getters) => {
      if (!getters.learnUnit) return;
      if (!state.learnKnowledgeChecks) return;
      if (!getters.learnUnit.knowledgeCheck) return;
      let num = getters.learnUnit.knowledgeCheck;
      let check = state.learnKnowledgeChecks.find((e) => Number(e.id) === num);
      return JSON.parse(check.JSON_Data);
    },
    learnPathModulesItems: (state, getters) => {
      if (!state.learnPathId) return;
      if (!getters.learnPath) return;
      if (!getters.learnPath.childern) return;
      let moduleIds = getters.learnPath.childern.split(",");
      let items = [];
      moduleIds.forEach((item) => {
        let object = state.learnItems.find((e) => e.id === item);
        if (object.childern) {
          if (!state.learnUnitItems) return;
          let unitIds = object.childern.split(",");
          let units = [];
          unitIds.forEach((unitId) => {
            units.push(state.learnUnitItems.find((e) => e.id === unitId));
          });
          object.units = units;
        }
        if (object) {
          items.push(object);
        }
      });
      return items;
    },
    learnModulesUnitItems: (state, getters) => {
      if (!state.learnUnitItems) return 0;
      if (!getters.learnModule) return 0;
      if (!getters.learnModule.childern) return 0;
      let moduleIds = getters.learnModule.childern.split(",");
      let items = [];
      moduleIds.forEach((item) => {
        let object = state.learnUnitItems.find((e) => e.id === item);
        if (object) {
          items.push(object);
        }
      });
      return items;
    },
    breadcrumbs: (state, getters) => {
      if (!state.learnItems) return;
      try {
        let disabled = false;
        let items = [
          {
            text: "Learn",
            disabled: false,
            href: "/",
          },
          {
            text: "Browse",
            disabled: false,
            href: "/browse",
          },
        ];
        if (state.learnPathId) {
          if (getters.learnPath?.Title) {
            disabled = state.learnModuleId === null;
            items.push({
              text: getters.learnPath?.Title,
              disabled: disabled,
              href: "/path?id=" + state.learnPathId,
            });
          }
        }
        if (state.learnModuleId) {
          disabled = state.learnModuleId === null;
          items.push({
            text: getters.learnModule?.Title,
            disabled: disabled,
            href: "/module?id=" + state.learnModuleId,
          });
        }
        if (state.learnUnitId) {
          disabled = state.learnUnitId === null;
          items.push({
            text: getters.learnUnit?.Title,
            disabled: disabled,
            href: "/unit?id=",
          });
        }
        return items;
      } catch (c) {
        console.log(c);
        return null;
      }
    },
  },
  actions: {
    checkKnowledge: function ({ commit }) {
      commit('setHandleKnowledgeCheck', true);
      setTimeout(() => {
        commit("setHandleKnowledgeCheck", false);
      }, 2);
    },
    handleChange: function ({ commit }) {
      commit("setLoading", true);
      setTimeout(() => {
        commit("setLoading", false);
      }, 2);
    },
    toggleTheme: function ({ commit }) {
      commit("setMgtShow", false);
      document.querySelector("#app").__vue__.$vuetify.theme.isDark =
        !document.querySelector("#app").__vue__.$vuetify.theme.isDark;
      setTimeout(() => {
        commit("setMgtShow", true);
      }, 2);
    },
    geteLearningItems: function ({ state, commit }) {
      let res = functions.geteLearningItems(state.account.username);
      res.then((res) => {
        if (Array.isArray(res)) {
          let eLearningItems = res;
          if (!eLearningItems) return;
          if (Array.isArray(eLearningItems)) {
            commit("seteLearningItems", eLearningItems);
          }
        }
      });
    },
    geteLearningSkillBlockItems: function ({ state, commit }) {
      let res = functions.geteLearningSkillBlockItems(state.account.username);
      res.then((res) => {
        if (Array.isArray(res)) {
          let items = res;
          if (!items) return;
          if (Array.isArray(items)) {
            commit("seteLearningSkillBlockItems", items);
          }
        }
      });
    },
    getLearnItems: function ({ state, commit }) {
      let res = functions.getSharePointListItems(
        state.baseSharePointId,
        state.accessToken,
        state.learnItemsId
      );
      res.then((res) => {
        if (Array.isArray(res.value)) {
          let categories = [];
          let levels = [];
          let roles = [];
          let learnItems = res.value.map((e) => {
            return e.fields;
          });
          if (!learnItems) return;
          if (Array.isArray(learnItems)) {
            learnItems.forEach((element) => {
              let temp_products = [];
              let temp_levels = [];
              let temp_roles = [];
              try {
                temp_products = JSON.parse(element.products);
              } catch {
                //
              }
              try {
                temp_levels = JSON.parse(element.levels);
              } catch {
                //
              }
              try {
                temp_roles = JSON.parse(element.roles);
              } catch {
                //
              }
              temp_products.forEach((c) => {
                if (categories.indexOf(c) === -1) {
                  categories.push(c);
                }
              });
              temp_levels.forEach((c) => {
                if (levels.indexOf(c) === -1) {
                  levels.push(c);
                }
              });
              temp_roles.forEach((c) => {
                if (roles.indexOf(c) === -1) {
                  roles.push(c);
                }
              });
            });
          }
          commit('setLearnCategories', categories);
          commit('setLearnLevels', levels);
          commit('setLearnRoles', roles);
          commit("setLearnItems", learnItems);
          commit("setLoaded", true);
        }
      });
    },
    getLearnUnitItems: function ({ state, commit }) {
      let res = functions.getSharePointListItems(
        state.baseSharePointId,
        state.accessToken,
        state.learnUnitsId
      );
      res.then((res) => {
        if (Array.isArray(res.value)) {
          commit(
            "setLearnUnitItems",
            res.value.map((e) => {
              return e.fields;
            })
          );
        } else {
          commit("setLearnUnitItems", null);
        }
      });
    },
    getLearnDevDocItems: function ({ state, commit }) {
      let res = functions.getSharePointListItems(
        state.baseSharePointId,
        state.accessToken,
        state.learnDevDocsId
      );
      res.then((res) => {
        if (Array.isArray(res.value)) {
          commit(
            "setLearnDevDocItems",
            res.value.map((e) => {
              return e.fields;
            })
          );
        } else {
          commit("setLearnUnitItems", null);
        }
      });
    },
    getProductItems: function ({ state, commit }) {
      let res = functions.getSharePointListItems(
        state.baseSharePointId,
        state.accessToken,
        state.learnProductsId
      );
      res.then((res) => {
        if (Array.isArray(res.value)) {
          commit(
            "setLearnProductItems",
            res.value.map((e) => {
              return e.fields;
            })
          );
        }
      });
    },
    getRoleItems: function ({ state, commit }) {
      let res = functions.getSharePointListItems(
        state.baseSharePointId,
        state.accessToken,
        state.learnRolesId
      );
      res.then((res) => {
        if (Array.isArray(res.value)) {
          commit(
            "setLearnRoleItems",
            res.value.map((e) => {
              return e.fields;
            })
          );
        }
      });
    },
    getUserProfile: function ({ state, commit, dispatch }) {
      let res = functions.getSharePointListItems(
        state.baseSharePointId,
        state.accessToken,
        state.learnUsersId,
        1,
        `&$filter=fields/user_email eq '${state.account.username}'`
      );
      res.then((res) => {
        if (Array.isArray(res.value)) {
          if (res.value.length === 0) {
            let res = functions.postSharePointListItem(
              state.baseSharePointId,
              state.accessToken,
              state.learnUsersId,
              {
                fields: {
                  Title: state.account.name,
                  user_email: state.account.username,
                  history_json: JSON.stringify({
                    progress: {
                      complete_units: [],
                      complete_modules: [],
                      complete_paths: [],
                      knowledge_checks: []
                    }
                  }),
                  current_json: JSON.stringify({
                    filterTags: state.filterTags
                  })
                }
              }
            );
            res.then(() => {
              dispatch('getUserProfile');
            });
          }

          commit(
            "setLearnUserProfile",
            res.value.map((e) => {
              return e.fields;
            })[0]
          );
        }
      });
    },
    patchUserProfile: function name({ state, commit }, data) {
      let res = functions.patchSharePointListItem(
        state.baseSharePointId,
        state.accessToken,
        state.learnUsersId,
        state.learnUserProfile.id,
        data
      );
      res.then((res) => {
        commit("setLearnUserProfile", res.fields);
      });
    },
    getLearnKnowledgeChecks: function ({ state, commit }) {
      let res = functions.getSharePointListItems(
        state.baseSharePointId,
        state.accessToken,
        state.learnChecksId
      );
      res.then((res) => {
        if (Array.isArray(res.value)) {
          commit(
            "setLearnKnowledgeChecks",
            res.value.map((e) => {
              return e.fields;
            })
          );
        }
      });
    },
  },
  modules: {},
});
