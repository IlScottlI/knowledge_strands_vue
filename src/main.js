import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMoment from "vue-moment";
import moment from "moment";
import 'simplemde/dist/simplemde.min.css'
import VueMarkdown from 'vue-markdown'
import 'highlight.js/styles/default.css';
import Highlight from 'vue-markdown-highlight'

import {
  Providers,
  Msal2Provider,
  publicClientApplication,
} from "@microsoft/mgt";

Vue.config.productionTip = false

Providers.globalProvider = new Msal2Provider({
  publicClientApplication: publicClientApplication,
  clientId: "fd163635-ed51-415d-8e13-e324c032fcdc",
  scopes: [
    "People.Read",
    "User.ReadBasic.All",
    "Mail.ReadWrite",
    "Sites.ReadWrite.All",
  ],
  authority:
    "https://login.microsoftonline.com/3596192b-fdf5-4e2c-a6fa-acb706c963d8",
  domainHint: "pg.com",
  redirectUrl: "http://localhost:8080/",
});

async function checkMsal() {
  let accounts = await Providers.globalProvider.getAllAccounts();

  const loginRequest = {
    scopes: [
      "People.Read",
      "User.ReadBasic.All",
      "Mail.ReadWrite",
      "Sites.ReadWrite.All",
    ],
    domainHint: "pg.com",
  };

  if (accounts.length > 0) {
    let accessToken =
      await Providers.globalProvider.publicClientApplication.acquireTokenSilent(
        loginRequest
      );

    let account = await Providers.me();
    Vue.use({ moment });
    Vue.use(VueMoment);

    Vue.component('vue-markdown', VueMarkdown);
    Vue.use(Highlight)

    new Vue({
      Providers,
      account,
      accessToken,
      router,
      store,
      vuetify,
      components: {
        'vue-markdown': VueMarkdown
      },
      render: h => h(App)
    }).$mount('#app')
  } else {
    Providers.globalProvider.publicClientApplication.loginRedirect(
      loginRequest
    );
  }
}

Providers.onProviderUpdated(checkMsal);