<template>
  <v-card outlined tile>
    <h1 class="ps-4">Filter</h1>
    <h3 class="ps-5 pt-4">Skill Block</h3>
    <v-card
      style="max-height: calc(25vh)"
      :class="scrollbarTheme + ' overflow-auto'"
    >
      <v-list-item-group
        class="ps-3"
        v-model="selectedSkillBlocks"
        multiple
        style="max-height: calc(25vh)"
      >
        <v-list-item
          v-for="(object, key) in skillBlocks"
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
  data: () => ({
    selectedSkillBlocks: null,
    skillBlocks: ["Test"],
  }),
  computed: {
    scrollbarTheme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {},
  watch: {},
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
