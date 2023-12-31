import { createApp } from "vue";
import * as bootstrap from "bootstrap";
import "./style.scss";
import App from "./App.vue";
import router from "./router/router";
import store from "./vuex";

createApp(App).use(store).use(router).mount("#app");
