<template>
  <v-container fluid>
    <v-row
      no-gutters
      :class="scrollbarTheme + ' overflow-auto pa-2'"
      style="max-height: calc(80vh)"
    >
      <v-col cols="12">
        <v-sheet class="pa-2" outlined tile>
          <h1 class="ps-4">eLearning</h1>
          <v-card-text>Strands assigned to you in eManufacturing</v-card-text>
        </v-sheet>
      </v-col>
      <v-col :class="scrollbarTheme + ' overflow-auto pa-2 pt-16 csstransforms' "> 
      <branch-view />
            </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BranchView from "../components/BranchView.vue";
export default {
  components: {
    BranchView,
  },
  name: "eLearning",
  data: () => ({
    keys:[],
    headers: [
          {
            text: 'Title',
            align: 'start',
            value: 'title',
            groupable: false,
          },
          { text: 'Skill Block', value: 'skill_block', align: 'right' },
        ],
  }),
  computed: {
    scrollbarTheme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    
    eLearningItems: {
      get() {
        return this.$store.state.eLearningItems;
      },
      set(value) {
        this.$store.commit("seteLearningItems", value);
      },
    },
    eLearningSkillBlockItems: {
      get() {
        return this.$store.state.eLearningSkillBlockItems;
      },
      set(value) {
        this.$store.commit("seteLearningSkillBlockItems", value);
      },
    },
    searchTerm: {
      get() {
        return this.$store.state.searchTerm;
      },
      set(value) {
        this.$store.commit("setSearchTerm", value);
      },
    },
    numberOfPages() {
      return Math.ceil(this.eLearningItems.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    calPer(item){
      if(!item) return;
      if(!this.$store.state.eLearningItems) return;
      let objects = this.$store.state.eLearningItems.filter(e=> e !== null).filter(e=>e.skill_block === item.skillBlock);
      let complete = objects.filter(e=>e.isComplete === 1)
      return  Math.round((complete.length / objects.length) * 100);
    },
    setColor(item){
      if(!item) return;
      if(!this.$store.state.eLearningItems) return;
      let objects = this.$store.state.eLearningItems.filter(e=> e !== null).filter(e=>e.skill_block === item.skillBlock);
      let complete = objects.filter(e=>e.isComplete === 1)
      let per =  Math.round((complete.length / objects.length) * 100);
      let color = 'red'
        if(per > 99){
          color = 'green'
        } else if (per > 79 ) {
          color = '#FFD600';
         } else {
           color = 'red';
         }
      return color;
    },
  },
  mounted() {
    this.$store.dispatch("geteLearningItems");
    this.$store.dispatch("geteLearningSkillBlockItems");
  },
  watch: {
    //
  },
};
</script>

<style lang="scss">

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
 

.fullwidth {
  width: calc(90vw) !important;
}


.table-header-rotated {
  border-collapse: collapse;
  .csstransforms & td {
    width: 40px;
  }
  .no-csstransforms & th {
    padding: 5px 10px;
  }
  td {
    text-align: center;
    padding: 10px 5px;
    border: 1px solid #ccc;
  }
  .csstransforms & th.rotate {
    height: calc(48vh);
    white-space: nowrap;
    // Firefox needs the extra DIV for some reason, otherwise the text disappears if you rotate 
    > div {
      transform: 
        // Magic Numbers
        translate(29px, 210px) 
        // 45 is really 360-45
        rotate(320deg);
      width: 35px;
    }
    > div > span {
      border-bottom: 1px solid #ccc;
      padding: 5px 10px;
      font-size: small;
    }
  }
  th.row-header {
    padding: 5px 5px;
    border-bottom: 1px solid #ccc;
  }
}
</style>