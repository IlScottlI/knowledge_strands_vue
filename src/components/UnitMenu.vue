<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="true"
      nudge-bottom="30px"
      nudge-left="265px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn small text v-bind="attrs" v-on="on">
          Unit {{ learnUnitIndex + 1 }} of {{ learnUnitItemsCount }}
          <v-icon v-if="!menu">mdi-chevron-down</v-icon>
          <v-icon v-else>mdi-chevron-up</v-icon>
        </v-btn>
      </template>

      <v-card min-width="calc(40vw)">
        <v-list>
          <v-list-item>
            <v-list-item-title v-if="learnModule">
              {{ learnModule.Title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-col cols="12" sm="12" v-if="learnModulesUnitItems">
          <v-list dense>
            <v-list-item-group v-model="learnUnitIndex" color="primary">
              <v-list-item
                v-for="(item, i) in learnModulesUnitItems"
                :key="i"
                @click="navigate(item.id)"
              >
                <v-row>
                  <v-col cols="9">
                    <router-link
                      :to="{ name: 'Unit', query: { id: item.id } }"
                      style="text-decoration: none"
                      :disabled="!false"
                      :event="false ? 'click' : ''"
                      @click="handleChange"
                    >
                      <v-list-item-title style="color: #1976d2">
                        {{ item.Title }}
                      </v-list-item-title>
                    </router-link>
                  </v-col>
                  <v-col cols="3">
                    <v-icon color="green" v-if="isComplete(item.id)"
                      >mdi-check-bold</v-icon
                    >
                    <small
                      style="color: gray; white-space: nowrap"
                      class="overflow-hidden me-10"
                      v-else
                    >
                      {{
                        (item.durationInMinutes * 60000) | duration("humanize")
                      }}
                    </small>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    menu: false,
  }),
  computed: {
    learnUnitIndex: {
      get() {
        return this.$store.state.learnUnitIndex;
      },
      set(value) {
        this.$store.commit("setLearnUnitIndex", value);
      },
    },
    historyJson: {
      get() {
        return this.$store.getters.historyJson;
      },
    },
    complete_units: {
      get() {
        return this.$store.getters.complete_units;
      },
    },
    learnUnit: {
      get() {
        return this.$store.getters.learnUnit;
      },
    },
    learnUnitItemsCount: {
      get() {
        return this.$store.state.learnUnitItemsCount;
      },
      set(value) {
        this.$store.commit("setLearnUnitItemsCount", value);
      },
    },
    learnUnitItemsCompleteCount: {
      get() {
        return this.$store.state.learnUnitItemsCompleteCount;
      },
      set(value) {
        this.$store.commit("setLearnUnitItemsCompleteCount", value);
      },
    },
    scrollbarTheme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    learnModule: function () {
      return this.$store.getters.learnModule;
    },
    learnModulesUnitItems: function () {
      return this.$store.getters.learnModulesUnitItems;
    },
  },
  watch: {
    complete_units(complete_units) {
      if (!complete_units) return;
      this.learnUnitItemsCompleteCount = complete_units.length;
    },
  },

  methods: {
    ...mapActions(["handleChange"]),
    navigate(id) {
      this.$router.replace({ name: "Unit", query: { id: id } });
      this.handleChange();
    },
    isComplete: function (item) {
      if (!Array.isArray(this.complete_units)) return false;
      return this.complete_units.filter((e) => {
        return e.u === Number(item);
      }).length;
    },
    nextButton: function (learnModulesUnitItems) {
      let nextIndex = this.learnUnitIndex + 1;
      return learnModulesUnitItems[nextIndex]
        ? "/unit?id=" + learnModulesUnitItems[nextIndex].id
        : "";
    },
    previousButton: function (learnModulesUnitItems) {
      let previousIndex = this.learnUnitIndex - 1;
      if (previousIndex < 0) return "";
      return learnModulesUnitItems[previousIndex]
        ? "/unit?id=" + learnModulesUnitItems[previousIndex].id
        : "";
    },
  },
};
</script>
