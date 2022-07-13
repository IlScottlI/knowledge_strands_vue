<template>
  <v-app app>
    <v-app-bar app max-height="calc(20vh)">
      <span
        style="max-width: calc(45vw); cursor: pointer"
        @click="navigate('/')"
        >Knowledge <strong>STRANDS</strong></span
      >
      <v-spacer></v-spacer>
      <mgt-login
        id="login"
        :class="$store.state.theme.isDark ? 'mgt-dark' : ''"
      ></mgt-login>
    </v-app-bar>
    <v-main>
      <router-view v-if="!$store.state.loading" />
    </v-main>
    <v-footer class="pa-0" app>
      <v-col cols="2" style="cursor: pointer" @click="navigate('/')">
        Knowledge <strong>Strands</strong>
      </v-col>

      <v-spacer></v-spacer>
      <v-col cols="1">
        <v-menu v-model="menu" offset-x>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon>mdi-brightness-7</v-icon>
              <div class="ms-1">Theme</div>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-action>
                  <v-btn text @click="theme.isDark = false">
                    <v-avatar size="calc(5vw)" tile class="mx-1">
                      <v-img :src="lightIcon" width="30" class="pa-3"></v-img>
                    </v-avatar>
                    Light</v-btn
                  >
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-btn text @click="theme.isDark = true">
                    <v-avatar size="calc(5vw)" tile class="mx-1">
                      <v-img :src="darkIcon" width="30" class="pa-1"></v-img>
                    </v-avatar>
                    Dark</v-btn
                  >
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import moment from "moment";
import router from "@/router";
import lightIcon from "./assets/light-menu-icon.svg";
import darkIcon from "./assets/dark-menu-icon.svg";
export default {
  name: "App",
  components: {
    //
  },
  data: () => ({
    lightIcon,
    darkIcon,
    menu: null,
  }),
  metaInfo: {
    titleTemplate: "Knowledge STRANDS",
  },
  computed: {
    scrollbarTheme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    theme: {
      get() {
        return this.$store.state.theme;
      },
      set(value) {
        this.$store.commit("setTheme", value);
      },
    },
    now: {
      get() {
        return this.$store.state.now;
      },
      set(value) {
        this.$store.commit("setNow", value);
      },
    },
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch("toggleTheme");
    },
    navigate(path) {
      this.$router.push({ path: path });
    },
  },
  mounted() {
    let parent = this.$parent.$options;
    this.now = moment().format("h:mm:ss a");
    this.$store.commit("setAccessToken", parent.accessToken.accessToken);
    this.$store.commit("setAccount", parent.accessToken.account);
    let darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    document.querySelector("#app").__vue__.$vuetify.theme.isDark =
      darkModeMediaQuery.matches;
    darkModeMediaQuery.addListener((e) => {
      let darkModeOn = e.matches;
      this.$store.dispatch("setGlobalTheme", darkModeOn);
      document.querySelector("#app").__vue__.$vuetify.theme.isDark = darkModeOn;
      console.log(`Dark mode is ${darkModeOn ? "🌒 on" : "☀️ off"}.`);
    });
    this.$store.dispatch("getUserProfile");
  },
  created() {
    this.$store.commit("setRoutes", router.options.routes);
    this.theme = this.$vuetify.theme;
  },
};
</script>

<style>
html {
  overflow: auto;
}

mgt-login {
  --color: black;
  --font-size: 14px;
  --font-weight: 600;
  --weight: "100%";
  --height: "100%";
  --margin: 0;
  --padding: 12px 20px;
  --button-color: #ffffff;
  --button-color--hover: var(--theme-primary-color);
  --button-background-color: rgba(0, 0, 0, 0);
  --button-background-color--hover: ##e9ba0f52;
  --popup-background-color: rgba(255, 255, 255, 1);
  --popup-command-font-size: 12px;
  --popup-color: #201f1e;
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
