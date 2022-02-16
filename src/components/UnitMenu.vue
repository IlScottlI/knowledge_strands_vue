<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      nudge-bottom="30px"
      nudge-left="265px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn small text v-bind="attrs" v-on="on">
          Unit 1 of 2
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
            <v-list-item-group color="primary">
              <div v-for="(item, i) in learnModulesUnitItems" :key="i">
                <v-list-item>
                  <v-row>
                    <v-col cols="9">
                      <v-list-item-title style="color: #1976d2">
                        {{ item.Title }}
                      </v-list-item-title>
                    </v-col>
                    <v-col cols="3">
                      <small
                        style="color: gray; white-space: nowrap"
                        class="overflow-hidden me-10"
                        >{{
                          (item.durationInMinutes * 60000)
                            | duration("humanize")
                        }}</small
                      >
                    </v-col>
                  </v-row>
                </v-list-item>
              </div>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
  }),
  computed: {
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
};
</script>
