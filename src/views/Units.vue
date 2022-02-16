<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :to="item.href" :disabled="item.disabled">
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <div
      :class="scrollbarTheme + ' overflow-auto'"
      style="max-height: calc(80vh)"
    >
      <v-container v-if="learnUnit" class="d-flex justify-center">
        <v-sheet width="900">
          <v-toolbar extended height="8" v-if="learnModulesUnitItems">
            <template v-slot:extension>
              <v-fab-transition v-if="showPrevious">
                <router-link
                  :to="previousButton(learnModulesUnitItems)"
                  style="text-decoration: none"
                >
                  <v-btn small left top text @click="handleChange">
                    <v-icon>mdi-chevron-left</v-icon>
                    Previous
                  </v-btn>
                </router-link>
              </v-fab-transition>
              <v-spacer></v-spacer>
              <unit-menu />
              <v-spacer></v-spacer>

              <v-fab-transition v-if="showNext">
                <router-link
                  :to="nextButton(learnModulesUnitItems)"
                  style="text-decoration: none"
                >
                  <v-btn small top right text @click="handleChange">
                    Next
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </router-link>
              </v-fab-transition>
            </template>
          </v-toolbar>
          <v-row class="pa-10" justify="center">
            <v-col cols="12" sm="2">
              <div v-html="learnUnit.icon" />
            </v-col>
            <v-col cols="12" sm="10">
              <div class="text-h3">{{ learnUnit.Title }}</div>
              <v-row>
                <div v-html="learnUnit.details"></div>
              </v-row>
            </v-col>
            <v-col cols="12" sm="8">
              <small>{{
                (learnUnit.durationInMinutes * 60000) | duration("humanize")
              }}</small>
            </v-col>
            <v-col cols="12" sm="8" v-if="learnModulesUnitItems">
              <div v-if="nextButton(learnModulesUnitItems)">
                <v-btn
                  color="primary"
                  :to="nextButton(learnModulesUnitItems)"
                  @click="handleChange"
                >
                  Continue <v-icon>mdi-chevron-right</v-icon></v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
    </div>
  </div>
</template>

<script>
import unitMenu from "../components/UnitMenu.vue";
export default {
  components: {
    unitMenu,
  },
  data: () => ({
    learnUnitIndex: null,
    learnUnitItemsCount: null,
  }),
  computed: {
    scrollbarTheme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    breadcrumbs: function () {
      return this.$store.getters.breadcrumbs;
    },
    learnModule: function () {
      return this.$store.getters.learnModule;
    },
    learnModuleId: function () {
      return this.$store.state.learnModuleId;
    },
    learnModulesUnitItems: function () {
      return this.$store.getters.learnModulesUnitItems;
    },
    learnItems: function () {
      return this.$store.state.learnItems;
    },
    learnPath: function () {
      return this.$store.getters.learnPath;
    },
    learnUnit: function () {
      return this.$store.getters.learnUnit;
    },
    showNext: function () {
      if (!this.$store.getters.learnModulesUnitItems) return false;
      let nextIndex = this.learnUnitIndex + 1;
      return this.$store.getters.learnModulesUnitItems[nextIndex]
        ? true
        : false;
    },
    showPrevious: function () {
      if (!this.$store.getters.learnModulesUnitItems) return false;
      if (!this.learnUnitIndex) return false;
      let previousIndex = this.learnUnitIndex - 1;
      if (previousIndex < 0) return false;
      return this.$store.getters.learnModulesUnitItems[previousIndex]
        ? true
        : false;
    },
  },
  methods: {
    handleChange: function () {
      this.$store.commit("setLoading", true);
      setTimeout(() => {
        this.$store.commit("setLoading", false);
      }, 2);
    },
    nextButton: function (learnModulesUnitItems) {
      let nextIndex = this.learnUnitIndex + 1;
      return learnModulesUnitItems[nextIndex]
        ? "/unit/" + learnModulesUnitItems[nextIndex].id
        : "";
    },
    previousButton: function (learnModulesUnitItems) {
      let previousIndex = this.learnUnitIndex - 1;
      if (previousIndex < 0) return "";
      return learnModulesUnitItems[previousIndex]
        ? "/unit/" + learnModulesUnitItems[previousIndex].id
        : "";
    },
    getCrumbs: function (duration, type, childern) {
      let count = childern ? childern.split(",").length : "";
      let subType = "";
      switch (type) {
        case "Module":
          subType = "Unit";
          break;
        case "Learning Path":
          subType = "Module";
          break;
      }
      return [
        {
          text: this.$moment.duration(duration * 60000).humanize(),
          disabled: true,
          href: "",
        },
        {
          text: type,
          disabled: true,
          href: "",
        },
        {
          text: count + (count > 1 ? " " + subType + "s" : subType),
          disabled: true,
          href: "",
        },
      ];
    },
  },
  created: function () {
    this.$store.commit("setLearnUnitId", null);
    this.$store.commit("setLearnUnitId", this.$route.params.id);
    this.$store.commit("setLearnModuleId", null);
    this.$store.commit("setLearnPathId", null);
  },
  mounted() {
    this.$store.dispatch("getLearnItems");
    this.$store.dispatch("getProductItems");
    this.$store.dispatch("getRoleItems");
    this.$store.dispatch("getLearnUnitItems");
  },
  watch: {
    learnModulesUnitItems(learnModulesUnitItems) {
      if (!learnModulesUnitItems) return;
      if (!this.learnUnit) return;
      this.learnUnitIndex = learnModulesUnitItems.indexOf(this.learnUnit);
      this.learnUnitItemsCount = learnModulesUnitItems.length;
    },
    learnModule(item) {
      if (!item) return;
      this.$store.commit("setLearnPathId", String(item.pathId));
    },
    learnUnit(item) {
      if (!item) return;
      this.$store.commit("setLearnModuleId", String(item.parentId));
    },
  },
};
</script>

<style>
html {
  overflow: auto;
}
.m-icon img {
  width: 5rem;
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
@import "~simplemde-theme-base/dist/simplemde-theme-base.min.css";
</style>
