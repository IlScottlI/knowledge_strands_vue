import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueMoment from "vue-moment";
import moment from "moment";
import VueMarkdown from 'vue-markdown';
import 'highlight.js/styles/github.css';
import Highlight from 'vue-markdown-highlight';

import {
  Providers,
  Msal2Provider,
  publicClientApplication,
} from "@microsoft/mgt";

Vue.config.productionTip = false;

Providers.globalProvider = new Msal2Provider({
  publicClientApplication: publicClientApplication,
  clientId: "9fa1a8b4-a5e1-4005-8465-50c17565342e",
  scopes: [
    "People.Read",
    "User.ReadBasic.All",
    "Mail.ReadWrite",
    "Sites.ReadWrite.All",
  ],
  redirectUrl: "https://tablerstation.us/Strands",
});

async function checkMsal() {
  let accounts = await Providers.globalProvider.getAllAccounts();

  const loginRequest = {
    scopes: [
      "Sites.ReadWrite.All",
    ],
  };

  if (accounts.length > 0) {
    let accessToken =
      await Providers.globalProvider.publicClientApplication.acquireTokenSilent(
        loginRequest
      );

    let account = await Providers.me();
    Vue.use({
      moment
    });
    Vue.use(VueMoment);

    Vue.component('vue-markdown', VueMarkdown);
    Vue.use(Highlight);

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
    }).$mount('#app');
  } else {
    Providers.globalProvider.publicClientApplication.loginRedirect(
      loginRequest
    );
  }
}

Providers.onProviderUpdated(checkMsal);