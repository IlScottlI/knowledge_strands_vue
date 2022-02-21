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
      style="max-height: calc(77vh)"
    >
      <v-container v-if="learnModule" class="d-flex justify-center">
        <v-sheet width="900">
          <v-row class="pa-10" justify="center">
            <v-col cols="12" sm="2">
              <div v-html="learnModule.icon" />
            </v-col>
            <v-col cols="12" sm="10">
              <h1>{{ learnModule.Title }}</h1>
              <v-row>
                <v-breadcrumbs
                  :items="
                    getCrumbs(
                      learnModule.duration_in_minutes,
                      learnModule.type,
                      learnModule.childern
                    )
                  "
                >
                  <template v-slot:divider>
                    <v-icon>mdi-circle-small</v-icon>
                  </template>
                </v-breadcrumbs>
                <small>{{ learnModule.learning_objectives }}</small>
                <div v-html="learnModule.details"></div>
              </v-row>
            </v-col>
            <v-col cols="12" sm="8">
              <h3>Prerequisites</h3>
              <small>{{ learnModule.prerequisites }}</small>
            </v-col>
            <v-col cols="12" sm="8" v-if="learnModulesUnitItems">
              <v-btn
                color="primary"
                :to="'/unit/' + learnModulesUnitItems[0].id"
              >
                Start <v-icon>mdi-chevron-right</v-icon></v-btn
              >
            </v-col>
            <v-col cols="12" sm="8" v-if="learnModule.pathId">
              <div class="text-p">
                This module is part of these learning paths
              </div>
              <router-link
                v-if="learnPath"
                :to="'/path/' + learnPath.id"
                style="text-decoration: none"
                >{{ learnPath.Title }}</router-link
              >
            </v-col>
            <v-col cols="12" sm="8" v-if="learnModulesUnitItems">
              <v-list dense>
                <v-list-item-group color="primary">
                  <router-link
                    v-for="(item, i) in learnModulesUnitItems"
                    :key="i"
                    :to="'/unit/' + item.id"
                    style="text-decoration: none"
                  >
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-power-on</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title style="color: #1976d2">
                        {{ item.Title }}
                        <br />
                        <small style="color: gray">{{
                          (item.durationInMinutes * 60000)
                            | duration("humanize")
                        }}</small>
                      </v-list-item-title>
                    </v-list-item>
                  </router-link>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    //
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
  },
  methods: {
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
    this.$store.commit("setLearnModuleId", null);
    this.$store.commit("setLearnModuleId", this.$route.params.id);
    this.$store.commit("setLearnPathId", null);
    this.$store.commit("setLearnUnitId", null);
  },
  mounted() {
    this.$store.dispatch("getLearnItems");
    this.$store.dispatch("getProductItems");
    this.$store.dispatch("getRoleItems");
    this.$store.dispatch("getLearnUnitItems");
  },
  watch: {
    learnModule(item) {
      if (!item) return;
      this.$store.commit("setLearnPathId", String(item.pathId));
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
</style>
