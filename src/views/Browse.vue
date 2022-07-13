<template>
  <v-container fluid>
    <v-row
      no-gutters
      :class="scrollbarTheme + ' overflow-auto pa-2'"
      style="max-height: calc(80vh)"
    >
      <v-col cols="12">
        <v-sheet class="pa-2" outlined tile>
          <h1 class="ps-4">Browse all</h1>
          <v-card-text
            >Learn new skills with step-by-step guidance. Start your journey
            today by exploring our learning paths and modules.</v-card-text
          >
        </v-sheet>
      </v-col>
      <v-col cols="3">
        <filter-items />
      </v-col>
      <v-col cols="9">
        <v-card :class="scrollbarTheme + ' overflow-auto pa-2'">
          <v-container>
            <v-data-iterator
              v-if="learnItems"
              :items="learnItems"
              :items-per-page.sync="itemsPerPage"
              :page.sync="page"
              :search="searchTerm"
              hide-default-footer
              :sort-by="sortBy"
              :sort-desc="sortDesc"
            >
              <template v-slot:header>
                <v-toolbar class="mb-1">
                  <v-text-field
                    dense
                    v-model="searchTerm"
                    clearable
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    label="Search"
                  ></v-text-field>
                </v-toolbar>

                <v-chip-group column>
                  <v-chip
                    v-for="(tag, i) in filterTags.filter(
                      (e) => e.type !== 'hideCompleted'
                    )"
                    :key="i"
                    close
                    @click:close="handleTagRemove(filterTags, i)"
                  >
                    {{ tag.tag }}
                  </v-chip>
                </v-chip-group>
              </template>

              <template v-slot:default="props">
                <v-row class="mt-5">
                  <v-col
                    v-for="item in props.items"
                    :key="item.name"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                  >
                    <v-card>
                      <v-card-title>
                        <v-toolbar prominent :color="item.color" height="50px">
                          <v-toolbar-title></v-toolbar-title>
                          <v-btn
                            icon
                            :to="{
                              path: routeType(item),
                              query: { id: item.id },
                            }"
                          >
                            <div v-html="item.icon"></div>
                          </v-btn>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                      </v-card-title>

                      <v-divider></v-divider>

                      <v-list>
                        <v-list-item-title class="ms-7 mt-2">{{
                          item.type
                        }}</v-list-item-title>
                        <v-list-item>
                          <v-list-item-subtitle class="blue--text">
                            <router-link
                              :to="'/' + routeType(item) + '?id=' + item.id"
                              style="text-decoration: none"
                              >{{ item.Title }}</router-link
                            >
                          </v-list-item-subtitle>
                        </v-list-item>
                      </v-list>
                      <v-list>
                        <v-list-item>
                          <v-list-item-subtitle>
                            {{
                              (item.duration_in_minutes * 60000)
                                | duration("humanize")
                            }}
                            <v-col cols="12">
                              <v-chip-group column>
                                <v-chip
                                  v-for="tag in item.levels"
                                  :key="tag"
                                  small
                                  :ripple="false"
                                  active
                                >
                                  {{ tag }}
                                </v-chip>
                              </v-chip-group>
                            </v-col>
                          </v-list-item-subtitle>
                        </v-list-item>
                      </v-list>
                      <v-card-actions>
                        <v-progress-linear
                          v-if="
                            item.progress > 0 && Math.ceil(item.progress) < 99.9
                          "
                          v-model="item.progress"
                          height="25"
                          color="green"
                          rounded
                        >
                          <strong class="dark"
                            >{{ Math.ceil(item.progress) }}%</strong
                          >
                        </v-progress-linear>
                        <v-btn
                          v-else-if="Math.ceil(item.progress) > 99.9"
                          small
                          text
                          color="green"
                          >COMPLETED<v-icon>mdi-check</v-icon></v-btn
                        >
                        <v-spacer></v-spacer>
                        <v-btn
                          v-if="item.progress > 0"
                          small
                          class="green--text"
                          :to="'/' + routeType(item) + '?id=' + item.id"
                          >{{
                            Math.ceil(item.progress) > 99.9
                              ? "View"
                              : "Continue"
                          }}</v-btn
                        >
                        <v-btn
                          v-else
                          small
                          class="blue--text"
                          :to="'/' + routeType(item) + '?id=' + item.id"
                          >Start</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </template>
              <template v-slot:footer>
                <v-row class="mt-2 mx-5" align="center" justify="center">
                  <span class="grey--text">Items per page</span>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        dark
                        text
                        color="primary"
                        class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        {{ itemsPerPage }}
                        <v-icon>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(number, index) in itemsPerPageArray"
                        :key="index"
                        @click="updateItemsPerPage(number)"
                      >
                        <v-list-item-title>{{ number }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>

                  <v-spacer></v-spacer>

                  <span class="mr-4 grey--text">
                    Page {{ page }} of {{ numberOfPages }}
                  </span>
                  <v-btn
                    icon
                    dark
                    color="blue darken-3"
                    class="mr-1"
                    @click="formerPage"
                  >
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    dark
                    color="blue darken-3"
                    class="ml-1"
                    @click="nextPage"
                  >
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-row>
              </template>
            </v-data-iterator>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FilterItems from "../components/FilterItems.vue";
export default {
  components: {
    FilterItems,
  },
  name: "Browse",
  data: () => ({
    itemsPerPageArray: [12, 24, 36, 48, 60],
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 12,
    sortBy: "Title",
    keys: ["Title", "products", "Modified"],
    parseKeys: ["levels", "roles", "products"],
    selected: [],
  }),
  computed: {
    scrollbarTheme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    numberOfPages() {
      return Math.ceil(this.$store.state.learnItems.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "id");
    },
    searchTerm: {
      get() {
        return this.$store.state.searchTerm;
      },
      set(value) {
        this.$store.commit("setSearchTerm", value);
      },
    },
    learnProductItems: {
      get() {
        return this.$store.state.learnProductItems;
      },
      set(value) {
        this.$store.commit("setLearnProductItems", value);
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
    selectedCategories: {
      get() {
        return this.$store.state.selectedCategories;
      },
      set(value) {
        this.$store.commit("setSelectedCategories", value);
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
    filterTags: {
      get() {
        return this.$store.state.filterTags;
      },
      set(value) {
        this.$store.commit("setFilterTags", value);
      },
    },
    learnRoleItems() {
      return this.$store.state.learnRoleItems;
    },
    selectedRoles: {
      get() {
        return this.$store.state.selectedRoles;
      },
      set(value) {
        this.$store.commit("setLearnRoleItems", value);
      },
    },
    learnItems: {
      get() {
        if (this.$store.state.learnItems.length < 1) return [];
        let historyJson = this.$store.getters.historyJson;
        let items = this.$store.state.learnItems;
        let learnItems = [];
        if (Array.isArray(items)) {
          items.forEach((object) => {
            object.progress = 0;
            try {
              for (const key in object) {
                if (key === "childern") {
                  let progress = [];
                  let ids = object[key].split(",");
                  if (object.type === "Module") {
                    ids.forEach((unit) => {
                      let complete = historyJson.progress.complete_units.filter(
                        (e) => e.u == unit
                      );
                      progress.push({
                        unit: Number(unit),
                        complete: complete.length,
                      });
                    });
                    object.progressArray = progress;
                    object.progressItemCount = progress.length;
                    object.progressItemComplete = progress.filter(
                      (e) => e.complete > 0
                    ).length;
                    object.progressWeight = 100 / object.progressItemCount;
                    object.progress =
                      object.progressItemComplete * object.progressWeight;
                    if (object.progressItemComplete === 0) {
                      object.progress = 0;
                    }
                    if (
                      object.progressItemCount === object.progressItemComplete
                    ) {
                      object.itemComplete = true;
                    } else {
                      object.itemComplete = false;
                    }
                  }
                }

                if (Object.hasOwnProperty.call(object, key)) {
                  let element = object[key];
                  if (this.parseKeys.includes(key)) {
                    try {
                      object[key] = JSON.parse(element);
                      object[key + "_str"] = element;
                    } catch {
                      //
                    }
                  }
                }
              }
            } catch {
              //
            }
            learnItems.push(object);
          });
        }

        if (this.$store.state.hideCompleted) {
          learnItems = learnItems.filter((e) => e.itemComplete !== true);
        }

        if (this.filterTags.length) {
          this.filterTags.forEach((e) => {
            switch (e.type) {
              case "products":
                learnItems = this.filterItems(
                  learnItems,
                  "products",
                  this.selectedProducts
                );
                break;
              case "roles":
                learnItems = this.filterItems(
                  learnItems,
                  "roles",
                  this.selectedRoles
                );
                break;
              case "levels":
                learnItems = this.filterItems(
                  learnItems,
                  "levels",
                  this.selectedLevels
                );
                break;
            }
          });
        }
        return learnItems;
      },
      set(value) {
        this.$store.commit("setLearnItems", value);
      },
    },
  },
  methods: {
    handleTagRemove(filterTags, i) {
      filterTags.splice(i, 1);
    },
    filterItems(items, column, filterItems) {
      let res = [];
      if (!filterItems) return;
      for (let item of items) {
        if (Array.isArray(item[column])) {
          filterItems.forEach((e) => {
            if (item[column].includes(e)) {
              res.push(item);
            }
          });
        }
      }
      let result = [];
      let map = new Map();
      for (let item of res) {
        if (!map.has(item.id)) {
          map.set(item.id, true);
          result.push(item);
        }
      }
      return result;
    },
    routeType(object) {
      if (object.type === "Module") {
        return "module";
      } else {
        return "path";
      }
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
  mounted() {
    this.$store.dispatch("getLearnItems");
    this.$store.dispatch("getProductItems");
    this.$store.dispatch("getRoleItems");
  },
  watch: {
    //
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
