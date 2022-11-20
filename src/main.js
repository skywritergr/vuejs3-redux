import { createApp } from "vue";
import { provideStore } from "redux-vuex";
import { store } from "./store/store";
import actions from "./store/actions";
import App from "./App.vue";

import "./main.css";

const app = createApp(App);

provideStore({
  app,
  store,
  actions,
});

app.mount("#app");
