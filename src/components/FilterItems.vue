<template>
  <v-card outlined tile>
    <h1 class="ps-4">Filter</h1>
    <v-btn
      text
      color="primary"
      v-if="filterTags.length"
      @click="filterTags = []"
      ><span style="text-decoration: none">Clear All</span></v-btn
    >
    <v-divider></v-divider>
    <v-checkbox v-model="hideCompleted" class="ms-8">
      <template v-slot:label>
        <div>Hide completed</div>
      </template>
    </v-checkbox>
    <v-divider></v-divider>
    <h3 class="ps-5 pt-4">Category</h3>
    <v-card
      style="max-height: calc(25vh)"
      :class="scrollbarTheme + ' overflow-auto'"
    >
      <v-list-item-group
        class="ps-3"
        v-model="selectedProductIds"
        multiple
        style="max-height: calc(25vh)"
        @change="handleProductsCheckbox"
      >
        <v-list-item
          v-for="(object, key) in $store.state.learnCategories"
          :key="key"
          dense
          class="p-0 m-0"
        >
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content class="p-0 m-0">
              {{ object }}
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-card>
    <v-divider></v-divider>
    <h3 class="ps-5 pt-4">Roles</h3>
    <v-card
      :class="scrollbarTheme + ' overflow-auto'"
      style="max-height: calc(25vh)"
    >
      <v-list-item-group
        class="ps-3"
        v-model="selectedRoleIds"
        multiple
        style="max-height: calc(25vh)"
        @change="handleRolesCheckbox"
      >
        <v-list-item
          v-for="(object, key) in $store.state.learnRoles"
          :key="key"
          dense
          class="p-0 m-0"
        >
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content class="p-0 m-0">
              {{ object }}
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-card>
    <v-divider></v-divider>
    <h3 class="ps-5 pt-4">Levels</h3>
    <v-card
      :class="scrollbarTheme + ' overflow-auto'"
      style="max-height: calc(25vh)"
    >
      <v-list-item-group
        class="ps-3"
        v-model="selectedLevelIds"
        multiple
        style="max-height: calc(25vh)"
        @change="handleLevelsCheckbox"
      >
        <v-list-item
          v-for="(object, key) in $store.state.learnLevels"
          :key="key"
          dense
          class="p-0 m-0"
        >
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content class="p-0 m-0">
              {{ object }}
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-card>
  </v-card>
</template>

<script>
export default {
  computed: {
    scrollbarTheme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    searchTerm: {
      get() {
        return this.$store.state.searchTerm;
      },
      set(value) {
        this.$store.commit("setSearchTerm", value);
      },
    },
    loaded: {
      get() {
        return this.$store.state.loaded;
      },
      set(value) {
        this.$store.commit("setLoaded", value);
      },
    },
    routeQuery: {
      get() {
        return this.$store.state.routeQuery;
      },
      set(value) {
        this.$store.commit("setRouteQuery", value);
      },
    },
    filterTags: {
      get() {
        return this.$store.state.filterTags;
      },
      set(value) {
        this.$store.commit("setFilterTags", value);
      },
    },
    learnItems: {
      get() {
        return this.$store.state.learnItems;
      },
      set(value) {
        this.$store.commit("setLearnItems", value);
      },
    },
    learnCategories: {
      get() {
        return this.$store.state.learnCategories;
      },
      set(value) {
        this.$store.commit("setLearnCategories", value);
      },
    },
    selectedProductIds: {
      get() {
        return this.$store.state.selectedProductIds;
      },
      set(value) {
        this.$store.commit("setSelectedProductIds", value);
      },
    },
    selectedProducts: {
      get() {
        return this.$store.state.selectedProducts;
      },
      set(value) {
        this.$store.commit("setSelectedProducts", value);
      },
    },
    learnRoles: {
      get() {
        return this.$store.state.learnRoles;
      },
      set(value) {
        this.$store.commit("setLearnRoles", value);
      },
    },
    selectedRoles: {
      get() {
        return this.$store.state.selectedRoles;
      },
      set(value) {
        this.$store.commit("setSelectedRoles", value);
      },
    },
    selectedRoleIds: {
      get() {
        return this.$store.state.selectedRoleIds;
      },
      set(value) {
        this.$store.commit("setSelectedRoleIds", value);
      },
    },
    learnLevels: {
      get() {
        return this.$store.state.learnLevels;
      },
      set(value) {
        this.$store.commit("setLearnLevels", value);
      },
    },
    selectedLevels: {
      get() {
        return this.$store.state.selectedLevels;
      },
      set(value) {
        this.$store.commit("setSelectedLevels", value);
      },
    },
    selectedLevelIds: {
      get() {
        return this.$store.state.selectedLevelIds;
      },
      set(value) {
        this.$store.commit("setSelectedLevelIds", value);
      },
    },
    hideCompleted: {
      get() {
        return this.$store.state.hideCompleted;
      },
      set(value) {
        this.$store.commit("setHideCompleted", value);
      },
    },
    filterCount: {
      get() {
        return this.$store.state.filterCount;
      },
      set(value) {
        this.$store.commit("setFilterCount", value);
      },
    },
  },
  methods: {
    handleProductsCheckbox(items) {
      let filterTags = this.filterTags.filter((e) => e.type !== "products");
      items.forEach((i) => {
        filterTags.push({
          type: "products",
          tag: this.learnCategories[i],
          i: i,
        });
      });
      this.filterTags = filterTags;
    },
    handleRolesCheckbox(items) {
      let filterTags = this.filterTags.filter((e) => e.type !== "roles");
      items.forEach((i) => {
        filterTags.push({
          type: "roles",
          tag: this.learnRoles[i],
          i: i,
        });
      });
      this.filterTags = filterTags;
    },
    handleLevelsCheckbox(items) {
      let filterTags = this.filterTags.filter((e) => e.type !== "levels");
      items.forEach((i) => {
        filterTags.push({
          type: "levels",
          tag: this.learnLevels[i],
          i: i,
        });
      });
      this.filterTags = filterTags;
    },
    onLoad() {
      let selectedProductIds = [];
      let selectedProducts = [];
      let selectedRoleIds = [];
      let selectedRoles = [];
      let selectedLevelIds = [];
      let selectedLevels = [];
      let index = -1;
      let routeQuery = {};
      this.filterTags.forEach((e) => {
        index = -1;
        let key = e.type;
        switch (key) {
          case "products":
            index = this.learnCategories.indexOf(e.tag);
            if (index !== -1) {
              selectedProductIds.push(index);
              selectedProducts.push(e.tag);
            }
            break;
          case "roles":
            index = this.learnRoles.indexOf(e.tag);
            if (index !== -1) {
              selectedRoleIds.push(index);
              selectedRoles.push(e.tag);
            }
            break;
          case "levels":
            index = this.learnLevels.indexOf(e.tag);
            if (index !== -1) {
              selectedLevelIds.push(index);
              selectedLevels.push(e.tag);
            }
            break;
          case "hideCompleted":
            routeQuery.hideCompleted = true;
            break;
        }
      });
      if (selectedProducts.length > 0) {
        selectedProducts = new Set(selectedProducts);
        selectedProducts = [...selectedProducts];
        routeQuery.category = selectedProducts.join(",");
      }
      if (selectedRoles.length > 0) {
        selectedRoles = new Set(selectedRoles);
        selectedRoles = [...selectedRoles];
        routeQuery.role = selectedRoles.join(",");
      }
      if (selectedLevels.length > 0) {
        selectedLevels = new Set(selectedLevels);
        selectedLevels = [...selectedLevels];
        routeQuery.level = selectedLevels.join(",");
      }
      if (routeQuery.hideCompleted) {
        this.hideCompleted = true;
      } else {
        this.hideCompleted = false;
      }
      this.selectedProducts = selectedProducts;
      this.selectedProductIds = selectedProductIds;
      this.selectedRoles = selectedRoles;
      this.selectedRoleIds = selectedRoleIds;
      this.selectedLevels = selectedLevels;
      this.selectedLevelIds = selectedLevelIds;

      return routeQuery;
    },
  },
  watch: {
    filterTags(tags) {
      let jsonCurrent = this.$store.getters.jsonCurrent;
      if (jsonCurrent) {
        jsonCurrent.filterTags = tags;
        this.$store.dispatch("patchUserProfile", {
          fields: {
            current_json: JSON.stringify(jsonCurrent),
          },
        });
      }
      let selectedProductIds = [];
      let selectedProducts = [];
      let selectedRoleIds = [];
      let selectedRoles = [];
      let selectedLevelIds = [];
      let selectedLevels = [];
      let routeQuery = {};
      let index = -1;
      let mat = {
        category: [],
        role: [],
        level: [],
        type: [],
      };
      tags.forEach((obj) => {
        let key = obj.type;
        switch (key) {
          case "products":
            index = this.learnCategories.indexOf(obj.tag);
            if (index !== -1) {
              selectedProductIds.push(index);
              selectedProducts.push(obj.tag);
            }
            mat.category.push(obj.tag);
            routeQuery.category = mat.category.join(",");
            break;
          case "roles":
            index = this.learnRoles.indexOf(obj.tag);
            if (index !== -1) {
              selectedRoleIds.push(index);
              selectedRoles.push(obj.tag);
            }
            mat.role.push(obj.tag);
            routeQuery.role = mat.role.join(",");
            break;
          case "levels":
            index = this.learnLevels.indexOf(obj.tag);
            if (index !== -1) {
              selectedLevelIds.push(index);
              selectedLevels.push(obj.tag);
            }
            mat.level.push(obj.tag);
            routeQuery.level = mat.level.join(",");
            break;
          case "hideCompleted":
            routeQuery.hideCompleted = true;
            break;
        }
      });
      if (selectedProducts.length) {
        selectedProducts = new Set(selectedProducts);
        selectedProducts = [...selectedProducts];
      }
      if (selectedRoles.length) {
        selectedRoles = new Set(selectedRoles);
        selectedRoles = [...selectedRoles];
      }
      if (selectedLevels.length) {
        selectedLevels = new Set(selectedLevels);
        selectedLevels = [...selectedLevels];
      }
      if (routeQuery.hideCompleted) {
        this.hideCompleted = true;
      } else {
        this.hideCompleted = false;
      }
      this.selectedProducts = selectedProducts;
      this.selectedProductIds = selectedProductIds;
      this.selectedRoles = selectedRoles;
      this.selectedRoleIds = selectedRoleIds;
      this.selectedLevels = selectedLevels;
      this.selectedLevelIds = selectedLevelIds;
      this.$router.replace({ query: routeQuery }).catch(() => {});
    },
    loaded() {
      let routeQuery = this.onLoad();
      this.$router.replace({ query: routeQuery }).catch(() => {});
    },
    searchTerm(searchTerm) {
      console.log(searchTerm);
    },
    hideCompleted(hideCompleted) {
      let index = this.filterTags.map((e) => e.type).indexOf("hideCompleted");
      if (index !== -1) {
        this.filterTags.splice(index, 1);
      }
      if (hideCompleted) {
        this.filterTags.push({ tag: "Hide completed", type: "hideCompleted" });
        this.onLoad();
      }
    },
  },
};
</script>

<style>
html {
  overflow: auto;
}
.light::-webkit-scrollbar {
  width: 15px;
}

.light::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.light::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.light::-webkit-scrollbar-thumb:hover {
  background: black;
}

.dark::-webkit-scrollbar {
  width: 15px;
}

.dark::-webkit-scrollbar-track {
  background: #202020;
  border-left: 1px solid #2c2c2c;
}

.dark::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}

.dark::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
