<template>
  <v-container fluid >
    <v-row no-gutters :class="scrollbarTheme + ' overflow-auto pa-2'" style="max-height: calc(80vh)" >
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
        <v-card outlined tile >
          <h1 class="ps-4">Filter</h1>
          <v-divider></v-divider>
          <h3 class="ps-5 pt-4">Category</h3>
          <v-card
            style="max-height: calc(25vh)"
            :class="scrollbarTheme + ' overflow-auto'"
          >
            <v-list-item-group
              class="ps-3"
              v-model="selectedProducts"
              multiple
              style="max-height: calc(25vh)"
            >
              <v-list-item
                v-for="(object, key) in learnProductItems"
                :key="key"
                dense
                class="p-0 m-0"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content class="p-0 m-0">
                    {{ object.Title }}
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
              v-model="selectedRoles"
              multiple
              style="max-height: calc(25vh)"
            >
              <v-list-item
                v-for="(object, key) in learnRoleItems"
                :key="key"
                dense
                class="p-0 m-0"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content class="p-0 m-0">
                    {{ object.Title }}
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="9">
        <v-card :class="scrollbarTheme + ' overflow-auto pa-2'" >
          <v-container>
            <v-data-iterator
              v-if="$store.state.learnItems"
              :items="learnItems"
              :search="search"
              hide-default-footer
              :sort-by="sortBy.toLowerCase()"
              :sort-desc="sortDesc"
            >
              <template v-slot:header>
                <v-toolbar class="mb-1">
                  <v-text-field
                    dense
                    v-model="search"
                    clearable
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    label="Search"
                  ></v-text-field>
                  <template v-if="false">
                    <v-spacer></v-spacer>
                    <v-select
                      v-if="$vuetify.breakpoint.xlAndUp"
                      dense
                      v-model="sortBy"
                      flat
                      solo-inverted
                      hide-details
                      :items="keys"
                      prepend-inner-icon="mdi-magnify"
                      label="Sort by"
                    ></v-select>
                    <v-spacer></v-spacer>
                    <v-btn-toggle
                      v-model="sortDesc"
                      mandatory
                      dense
                      v-if="false"
                    >
                      <v-btn depressed color="blue" :value="false">
                        <v-icon>mdi-arrow-up</v-icon>
                      </v-btn>
                      <v-btn depressed color="blue" :value="true">
                        <v-icon>mdi-arrow-down</v-icon>
                      </v-btn>
                    </v-btn-toggle>
                  </template>
                </v-toolbar>
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
                            :to="'/' + routeType(item) + '/' + item.id"
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
                              :to="'/' + routeType(item) + '/' + item.id"
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
                        <v-spacer></v-spacer>
                        <v-btn
                          small
                          class="blue--text"
                          :to="'/' + routeType(item) + '/' + item.id"
                          >Start</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-col>
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
export default {
  name: "Browse",
  data: () => ({
    itemsPerPageArray: [4, 8, 12],
    search: "",
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 4,
    sortBy: "duration_in_minutes",
    keys: ["Title", "duration_in_minutes"],
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
    learnProductItems() {
      return this.$store.state.learnProductItems;
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "id");
    },
    selectedProducts: {
      get() {
        return this.$store.state.selectedProducts;
      },
      set(value) {
        this.$store.commit("setSelectedProducts", value);
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
        let items = this.$store.state.learnItems;
        let learnItems = [];
        if (Array.isArray(items)) {
          items.forEach((object) => {
            for (const key in object) {
              if (Object.hasOwnProperty.call(object, key)) {
                let element = object[key];
                if (this.parseKeys.includes(key)) {
                  try {
                    object[key] = JSON.parse(element);
                  } catch {
                    //
                  }
                }
              }
            }
            learnItems.push(object);
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
