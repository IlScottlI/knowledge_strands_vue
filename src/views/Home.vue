<template>
  <v-sheet>
    <div>
      <v-toolbar dark prominent color="#123684" :src="hero" height="360">
      </v-toolbar>
      <v-card class="mx-4 pa-5" max-width="600" style="margin-top: -300px">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4">WELCOME TO KNOWLEDGE STRANDS</div>
            <v-list-item-title class="text-h5 mb-1">
              Discover your path
            </v-list-item-title>
            <v-list-item-subtitle
              >Whether you're just starting or an experienced professional, our
              hands-on approach helps you arrive at your goals faster, with more
              confidence and at your own pace.</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn outlined text class="text-capitalize" to="browse">
            Browse catalog
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <v-main>
      <v-container style="margin-top: calc(-5vh)">
        <v-row>
          <v-col v-for="n in topCards" :key="n.path" cols="4">
            <v-card
              dense
              height="200"
              style="border-radius: calc(1vw); cursor: pointer"
              :to="n.path"
            >
              <v-row>
                <v-avatar height="200" width="22%" tile>
                  <v-img
                    :src="n.img"
                    style="border-radius: 10px 0px 0px 10px"
                  ></v-img>
                </v-avatar>
                <span>
                  <v-card-text class="text-overline">{{ n.title }}</v-card-text>
                  <v-card-title>{{ n.desc }}</v-card-title>
                </span>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row cols="12">
          <v-col
            cols="12"
            class="text-center text-h4 mt-5"
            v-if="continueCards.length"
          >
            Continue working on...
          </v-col>
          <v-col v-for="n in continueCards" :key="n.path" cols="4">
            <v-card
              dense
              height="200"
              style="border-radius: calc(1vw); cursor: pointer"
              :to="n.path"
            >
              <v-row>
                <v-avatar height="200" width="22%" tile>
                  <v-img
                    :src="n.img"
                    style="border-radius: 10px 0px 0px 10px"
                  ></v-img>
                </v-avatar>
                <span>
                  <v-card-text class="text-overline">{{ n.title }}</v-card-text>
                  <v-card-title>{{ n.desc }}</v-card-title>
                </span>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-sheet>
</template>

<script>
import heroDark from "../assets/hero_background_dark.svg";
import heroLight from "../assets/hero_background_light.svg";
import learnPath from "../assets/featured_learning-path_tablet.png";
import certPath from "../assets/featured_certifications_tablet.png";
import learnTV from "../assets/learn-tv-tile.jpg";
export default {
  name: "Home",
  data: () => ({
    model: 0,
    heroDark,
    heroLight,
    topCards: [
      {
        img: learnPath,
        title: "LEARNING PATHS",
        desc: "Learn a complete strand path",
        path: "/browse?resource_type=learning%20path",
      },
      {
        img: certPath,
        title: "STEP-UP CARD CERTIFICATION",
        desc: "Ready to Qualify",
        path: "/qualify",
      },
      {
        img: learnTV,
        title: "LEARN TV",
        desc: "Watch Recorded Training",
        path: "/tv",
      },
    ],
    continueCards: [],
  }),
  computed: {
    hero() {
      return this.$store.state.theme.isDark ? this.heroDark : this.heroLight;
    },
    userName: {
      get() {
        return this.$store.state.account.name.includes(",")
          ? this.$store.state.account.name.split(",")[1] +
              " " +
              this.$store.state.account.name.split(",")[0]
          : this.$store.state.account.name;
      },
      set(value) {
        this.$store.commit("setTheme", value);
      },
    },
  },
  components: {
    //
  },
  metaInfo: {
    titleTemplate: "Knowledge STRANDS",
  },
};
</script>

<style>
html {
  overflow: auto;
}
</style>
