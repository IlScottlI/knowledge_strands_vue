<template>
  <v-container class="px-0" fluid>
    <vue-markdown v-highlight>
      {{ number }}. &nbsp;{{ learnKnowledgeCheck.q }}
    </vue-markdown>

    <v-list rounded dense>
      <v-radio-group v-model="radioGroup" dense>
        <v-list-item-group v-model="radioGroup_" :color="color">
          <v-list-item
            v-for="(item, i) in learnKnowledgeCheck.options"
            :key="i"
            @click="radioGroup = item"
          >
            <v-list-item-title>
              <v-radio :color="color" :key="i" :value="item">
                <template v-slot:label>
                  <vue-markdown v-highlight>
                    {{ item }}
                  </vue-markdown>
                </template>
              </v-radio>
            </v-list-item-title>
            <v-list-item-icon v-if="color == 'green' && radioGroup === item">
              <v-icon>mdi-check</v-icon>
            </v-list-item-icon>
            <v-list-item-icon v-if="color == 'red' && radioGroup === item">
              <v-icon>mdi-window-close</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-radio-group>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      radioGroup: null,
      radioGroup_: null,
      correctAnswer: null,
      color: null,
    };
  },
  computed: {
    learnKnowledgeCheckResponse: {
      get() {
        return this.$store.state.learnKnowledgeCheckResponse;
      },
      set(value) {
        this.$store.commit("setLearnKnowledgeCheckResponse", value);
      },
    },
    handleKnowledgeCheck: {
      get() {
        return this.$store.state.handleKnowledgeCheck;
      },
      set(value) {
        this.$store.commit("setHandleKnowledgeCheck", value);
      },
    },
    complete_units: {
      get() {
        return this.$store.getters.complete_units;
      },
    },
    learnKnowledgeCheck: function () {
      return this.$attrs.check;
    },
    number: function () {
      return this.$attrs.number;
    },
    key: function () {
      return this.$attrs.i;
    },
  },
  created() {
    if (!this.$attrs.progress) return (this.color = "primary");
    this.color = this.$attrs.progress ? "green" : "primary";
  },
  mounted() {
    this.correctAnswer =
      this.learnKnowledgeCheck.options[this.learnKnowledgeCheck.a];
    if (!this.progress) return;
    this.correctAnswer = this.learnKnowledgeCheck.options[this.progress.a];
    this.radioGroup = this.learnKnowledgeCheck.options[this.progress.a];
    this.learnKnowledgeCheckResponse = this.$attrs.progress.kc;
  },
  watch: {
    radioGroup(item) {
      this.$store.commit("setBtnMessage", null);
      this.color = "primary";
      if (!item) return;
      if (!this.learnKnowledgeCheck) return;
      let correctAnswer = this.learnKnowledgeCheck.options.indexOf(
        this.correctAnswer
      );
      let selectedAnswer = this.learnKnowledgeCheck.options.indexOf(item);
      if (this.learnKnowledgeCheckResponse.map((e) => e.i).includes(this.key)) {
        let k = this.learnKnowledgeCheckResponse
          .map((e) => e.i)
          .indexOf(this.key);
        this.learnKnowledgeCheckResponse[k] = {
          i: this.key,
          ca: correctAnswer,
          sa: selectedAnswer,
        };
      } else {
        this.learnKnowledgeCheckResponse.push({
          i: this.key,
          ca: correctAnswer,
          sa: selectedAnswer,
        });
      }
    },
    handleKnowledgeCheck(value) {
      if (value !== true) return;
      if (!this.learnKnowledgeCheck) return;
      if (!this.learnKnowledgeCheckResponse) return;
      if (
        this.$store.getters.learnKnowledgeCheck.length !==
        this.learnKnowledgeCheckResponse.length
      )
        return;
      if (this.learnKnowledgeCheckResponse.map((e) => e.i).includes(this.key)) {
        let key = this.learnKnowledgeCheckResponse
          .map((e) => e.i)
          .indexOf(this.key);
        if (
          this.learnKnowledgeCheckResponse[key].sa ===
          this.learnKnowledgeCheckResponse[key].ca
        ) {
          this.color = "green";
        } else {
          this.color = "red";
        }
      }
    },
  },
};
</script>
