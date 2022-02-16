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
      <v-container v-if="path" class="d-flex justify-center">
        <v-sheet width="900">
          <v-row class="pa-10" justify="center">
            <v-col cols="12" sm="2">
              <div v-html="path.icon" />
            </v-col>
            <v-col cols="12" sm="10">
              <h1>{{ path.Title }}</h1>
              <v-row>
                <v-breadcrumbs
                  :items="
                    getCrumbs(
                      path.duration_in_minutes,
                      path.type,
                      path.childern
                    )
                  "
                >
                  <template v-slot:divider>
                    <v-icon>mdi-circle-small</v-icon>
                  </template>
                </v-breadcrumbs>
                <small>{{ path.learning_objectives }}</small>
              </v-row>
            </v-col>
            <v-col cols="12" sm="8">
              <h3>Prerequisites</h3>
              <small>{{ path.prerequisites }}</small>
            </v-col>
            <v-col cols="12" sm="8" v-if="learnPathModulesItems">
              <v-btn
                color="primary"
                :to="'/module/' + learnPathModulesItems[0].id"
              >
                Start <v-icon>mdi-chevron-right</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
      <v-container>
        <v-row justify="center" class="ms-15">
          <v-col cols="12" sm="7">
            <v-card-title> Modules in this learning path </v-card-title>
          </v-col>
        </v-row>
      </v-container>
      <v-container
        class="d-flex justify-center mb-10"
        v-for="(item, key) in learnPathModulesItems"
        :key="key"
      >
        <v-sheet width="900">
          <v-row class="pa-10" justify="center">
            <v-col cols="12" sm="2">
              <div class="m-icon" v-html="item.icon" />
            </v-col>
            <v-col cols="12" sm="10">
              <router-link
                :to="`/module/${item.id}`"
                style="text-decoration: none"
              >
                {{ item.Title }}
              </router-link>
              <v-breadcrumbs
                :items="
                  getCrumbs(item.duration_in_minutes, item.type, item.childern)
                "
              >
                <template v-slot:divider>
                  <v-icon>mdi-circle-small</v-icon>
                </template>
              </v-breadcrumbs>
              <small>{{ item.learning_objectives }}</small>
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
    path: function () {
      return this.$store.getters.learnPath;
    },
    learnPathModulesItems: function () {
      return this.$store.getters.learnPathModulesItems;
    },
    learnItems: function () {
      return this.$store.state.learnItems;
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
    this.$store.commit("setLearnPathId", null);
    this.$store.commit("setLearnPathId", this.$route.params.id);
    this.$store.commit("setLearnModuleId", null);
    this.$store.commit("setLearnUnitId", null);
  },
  mounted() {
    this.$store.dispatch("getLearnItems");
    this.$store.dispatch("getProductItems");
    this.$store.dispatch("getRoleItems");
    this.$store.dispatch("getLearnUnitItems");
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
