<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" v-if="breadcrumbs">
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
      <v-container v-if="learnUnit" class="d-flex justify-center">
        <v-sheet width="900">
          <v-toolbar extended height="11" v-if="learnModulesUnitItems">
            <template v-slot:extension>
              <v-fab-transition>
                <div style="width: 150px">
                  <router-link
                    v-if="showPrevious"
                    :to="previousButton(learnModulesUnitItems)"
                    style="text-decoration: none"
                  >
                    <v-btn small left top text @click="handleChange">
                      <v-icon>mdi-chevron-left</v-icon>
                      Previous
                    </v-btn>
                  </router-link>
                </div>
              </v-fab-transition>
              <v-spacer></v-spacer>
              <unit-menu />
              <v-spacer></v-spacer>

              <v-fab-transition>
                <div style="width: 150px">
                  <router-link
                    v-if="showNext"
                    @click="checkProgress(learnUnit.id)"
                    :to="nextButton(learnModulesUnitItems)"
                    style="text-decoration: none"
                  >
                    <v-btn
                      small
                      top
                      right
                      text
                      @click="checkProgress(learnUnit.id)"
                      v-if="learnKnowledgeCheckPass"
                    >
                      Next
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </router-link>
                </div>
              </v-fab-transition>
            </template>
          </v-toolbar>
          <v-row class="pa-5" justify="center">
            <v-col cols="12" sm="2">
              <div v-html="learnUnit.icon" />
            </v-col>
            <v-col cols="12" sm="11">
              <div class="text-h3">{{ learnUnit.Title }}</div>
              <v-row>
                <div v-html="learnUnit.details"></div>
              </v-row>
            </v-col>
            <v-col cols="12" sm="11">
              <small
                >{{
                  (learnUnit.durationInMinutes * 60000) | duration("humanize")
                }}
              </small>
            </v-col>
            <v-col cols="12" sm="11">
              <div v-html="learnUnit.HTML" v-if="learnUnit.HTML"></div>
            </v-col>
            <v-col cols="12" sm="11">
              <div v-if="learnUnit.Markdown">
                <vue-markdown v-highlight
                  >{{ learnUnit.Markdown }}
                </vue-markdown>
              </div>
            </v-col>
            <v-col cols="12" sm="11" v-if="learnUnit.tip">
              <v-alert
                color="green darken-3"
                dark
                icon="mdi-lightbulb-outline"
                border="left"
                prominent
              >
                <div class="text-h6">Tip</div>
                <div v-html="learnUnit.tip"></div>
              </v-alert>
            </v-col>
            <v-col cols="12" sm="11" v-if="learnUnit.note">
              <v-alert
                color="deep-purple darken-2"
                icon="mdi-note-alert"
                border="left"
                prominent
                dark
              >
                <div class="text-h6">Note</div>
                <div v-html="learnUnit.note"></div>
              </v-alert>
            </v-col>
            <v-col cols="12" sm="11" v-if="learnKnowledgeCheck">
              <div class="text-h4">Check your knowledge</div>
              <div v-for="(value, key) in learnKnowledgeCheck" :key="key">
                <knowledge-check
                  v-if="learnUnit.knowledgeCheck"
                  :check="value"
                  :number="key + 1"
                  :i="Number(key)"
                />
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="11"
              v-if="learnKnowledgeCheck && checkAnswersBtn"
            >
              <div>
                <v-btn color="primary" @click="checkKnowledge">
                  Check your answers</v-btn
                >
              </div>
            </v-col>
            <v-col cols="12" sm="11" v-if="learnKnowledgeCheck">
              <v-alert v-if="btnMessage" dense outlined :type="btnMessageType">
                {{ btnMessage }}
              </v-alert>
            </v-col>
            <v-col cols="12" sm="11">
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12" sm="11" v-if="nextUnit(learnModulesUnitItems)">
              <div class="text-h6" v-if="learnKnowledgeCheckPass">
                Next unit: {{ nextUnit(learnModulesUnitItems).Title }}
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="11"
              v-if="learnModulesUnitItems && learnKnowledgeCheckPass"
            >
              <div v-if="nextButton(learnModulesUnitItems)">
                <v-btn
                  color="primary"
                  :to="nextButton(learnModulesUnitItems)"
                  @click="checkProgress(learnUnit.id)"
                >
                  Continue
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" sm="11" v-if="showIncomplete()">
              <div class="text-h6">Module incomplete:</div>
            </v-col>
            <v-col
              cols="12"
              sm="11"
              v-if="!nextButton(learnModulesUnitItems) && !showIncomplete()"
            >
              <div class="text-h6">Module complete:</div>
            </v-col>
            <v-col cols="12" sm="11" v-if="showIncomplete()">
              <div>
                <v-btn
                  color="primary"
                  :to="backToFinish(learnModulesUnitItems)"
                  @click="handleChange"
                >
                  Go back to finish
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="11"
              v-if="!nextButton(learnModulesUnitItems) && !showIncomplete()"
            >
              <div v-if="$store.getters.moduleIncomplete">
                <v-btn color="primary" @click="unlockAchievement()">
                  Unlock achievement
                </v-btn>
              </div>
              <div v-else>
                <v-btn
                  color="primary"
                  @click="$router.push({ name: 'Browse' })"
                >
                  Review your Learning Path history
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
    </div>
  </div>
</template>

<script>
import UnitMenu from "../components/UnitMenu.vue";
import KnowledgeCheck from "../components/KnowledgeCheck.vue";
import { mapActions } from "vuex";
import Swal from "sweetalert2";

export default {
  components: {
    UnitMenu,
    KnowledgeCheck,
  },
  data: () => ({
    text: "# hello world",
    checkAnswersBtn: false,
  }),
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
    learnUnitIndex: {
      get() {
        return this.$store.state.learnUnitIndex;
      },
      set(value) {
        this.$store.commit("setLearnUnitIndex", value);
      },
    },
    btnMessage: {
      get() {
        return this.$store.state.btnMessage;
      },
      set(value) {
        this.$store.commit("setBtnMessage", value);
      },
    },
    btnMessageType: {
      get() {
        return this.$store.state.btnMessageType;
      },
      set(value) {
        this.$store.commit("setBtnMessageType", value);
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
    learnKnowledgeCheckPass: {
      get() {
        return this.$store.state.learnKnowledgeCheckPass;
      },
      set(value) {
        this.$store.commit("setLearnKnowledgeCheckPass", value);
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
    progress() {
      return this.$store.getters.complete_units.find(
        (e) => Number(e.u) === Number(this.$route.query.id)
      );
    },
    scrollbarTheme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    breadcrumbs: function () {
      return this.$store.getters.breadcrumbs;
    },
    learnModule: function () {
      return this.$store.getters.learnModule;
    },
    learnModuleComplete: function () {
      if (!this.$store.state.learnModuleId) return;
      return this.$store.getters.complete_units
        .map((e) => e.m)
        .includes(this.$store.state.learnModuleId);
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
    learnKnowledgeCheck: function () {
      return this.$store.getters.learnKnowledgeCheck;
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
    ...mapActions(["handleChange", "checkKnowledge"]),
    unlockAchievement() {
      let item = this.$route.query.id;
      if (this.complete_units) {
        if (
          this.complete_units.filter((e) => {
            return e.u == item;
          }).length
        ) {
          console.log("Progress already tracked");
        } else {
          let history_json = this.historyJson;
          history_json.progress.complete_units.push({
            u: Number(item),
            t: Date.now(),
          });
          history_json.progress.complete_modules.push({
            m: Number(this.learnModuleId),
            t: Date.now(),
          });
          this.$store.dispatch("patchUserProfile", {
            fields: { history_json: JSON.stringify(history_json) },
          });
        }
      }
      Swal.fire({
        title: "You did it!",
        html: "<div> Congratulations! Keep it up. Browse to learn more about your interests. </div>",
        imageUrl: "https://unsplash.it/400/200",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        icon: "success",
        confirmButtonText: "Back to Browse",
      });
    },
    showIncomplete() {
      let learnUnitIndex = this.$store.state.learnUnitIndex;
      let learnUnitItemsCount = this.$store.state.learnUnitItemsCount;
      if (!this.$store.getters.learnModule) return;
      if (!this.$store.getters.complete_units) return;
      let here = [];
      let notHere = [];
      this.$store.getters.learnModule.childern.split(",").forEach((e) => {
        if (
          this.$store.getters.complete_units.map((i) => i.u).includes(Number(e))
        ) {
          here.push(e);
        } else {
          notHere.push(e);
        }
      });
      if (
        here.length ===
        this.$store.getters.learnModule.childern.split(",").length
      )
        return false;
      return (
        learnUnitIndex + notHere.length !== learnUnitItemsCount &&
        learnUnitIndex === learnUnitItemsCount - 1
      );
    },
    backToFinish: function () {
      if (!this.$store.getters.learnModule) return;
      if (!this.$store.getters.complete_units) return;
      let here = [];
      let notHere = [];
      this.$store.getters.learnModule.childern.split(",").forEach((e) => {
        if (
          this.$store.getters.complete_units.map((i) => i.u).includes(Number(e))
        ) {
          here.push(e);
        } else {
          notHere.push(e);
        }
      });
      return "/unit?id=" + notHere[0];
    },
    checkProgress(item) {
      if (this.complete_units) {
        if (
          this.complete_units.filter((e) => {
            return e.u === Number(item);
          }).length
        ) {
          console.log("Progress already tracked");
        } else {
          let history_json = this.historyJson;
          history_json.progress.complete_units.push({
            u: Number(item),
            t: Date.now(),
          });
          this.$store.dispatch("patchUserProfile", {
            fields: { history_json: JSON.stringify(history_json) },
          });
        }
      }
      this.handleChange();
    },
    nextUnit: function (learnModulesUnitItems) {
      let nextIndex = this.learnUnitIndex + 1;
      return learnModulesUnitItems[nextIndex]
        ? learnModulesUnitItems[nextIndex]
        : false;
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
    getCrumbs: function (duration, type, childern) {
      try {
        if (!childern) return;
        let count = childern ? childern.split(",").length : 0;
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
      } catch {
        return null;
      }
    },
  },
  created: function () {
    this.$store.dispatch("getLearnUnitItems");
    this.$store.commit("setLearnUnitId", String(this.$route.query.id));
    this.$store.commit("setLearnModuleId", null);
    this.$store.commit("setLearnPathId", null);
    this.$store.commit("setBtnMessage", null);
    this.$store.commit("setBtnMessageType", null);
    this.learnKnowledgeCheckResponse = [];
  },
  mounted() {
    this.$store.dispatch("getLearnItems");
    this.$store.dispatch("getProductItems");
    this.$store.dispatch("getRoleItems");
    this.$store.dispatch("getLearnKnowledgeChecks");
    this.$store.dispatch("getUserProfile");
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
      if (typeof item !== "object") return;
      this.$store.commit("setLearnModuleId", String(item.parentId));
      this.checkAnswersBtn = true;
      if (this.learnUnit.knowledgeCheck) {
        if (this.progress) {
          this.$store.commit("setLearnKnowledgeCheckPass", true);
        } else {
          this.$store.commit("setLearnKnowledgeCheckPass", false);
        }
      } else {
        this.$store.commit("setLearnKnowledgeCheckPass", true);
      }
      this.$store.dispatch("patchUserProfile", {
        fields: {
          current_json: JSON.stringify({
            module: Number(item.parentId),
            unit: Number(item.id),
          }),
        },
      });
    },
    handleKnowledgeCheck() {
      if (!this.learnKnowledgeCheck) return;
      if (!this.learnKnowledgeCheckResponse) return;
      if (
        this.learnKnowledgeCheckResponse.length !==
        this.learnKnowledgeCheck.length
      ) {
        this.btnMessage =
          "You must answer all questions before checking your work.";
        this.btnMessageType = "error";
        return;
      }
      let total = this.learnKnowledgeCheckResponse.length;
      let correct = 0;
      this.learnKnowledgeCheckResponse.forEach((e) => {
        if (e.sa === e.ca) {
          correct++;
        }
      });
      if (total === correct) {
        this.learnKnowledgeCheckPass = true;
        this.checkAnswersBtn = false;
        Swal.fire({
          title: "Congratulations!",
          html: "Knowledge check complete. <br>You answered all questions correctly.",
          icon: "success",
          confirmButtonText: "Sweet",
        });
        let item = this.learnUnit.id;
        if (this.complete_units) {
          if (
            this.complete_units.filter((e) => {
              return e.u === Number(item);
            }).length
          ) {
            console.log("Progress already tracked");
          } else {
            let history_json = this.historyJson;
            history_json.progress.complete_units.push({
              u: Number(item),
              t: Date.now(),
              kc: this.learnKnowledgeCheckResponse,
            });
            history_json.progress.knowledge_checks.push({
              u: Number(item),
              t: Date.now(),
              kc: this.learnKnowledgeCheckResponse,
            });
            this.$store.dispatch("patchUserProfile", {
              fields: { history_json: JSON.stringify(history_json) },
            });
          }
        }
      } else {
        console.log(this.learnKnowledgeCheckResponse);
        let item = this.learnUnit.id;
        this.btnMessage = "Some of the responses are incorrect";
        this.btnMessageType = "warning";
        let history_json = this.historyJson;
        history_json.progress.knowledge_checks.push({
          u: Number(item),
          t: Date.now(),
          kc: this.learnKnowledgeCheckResponse,
        });
        this.$store.dispatch("patchUserProfile", {
          fields: { history_json: JSON.stringify(history_json) },
        });
      }
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
