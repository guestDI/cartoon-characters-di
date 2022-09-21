import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import Spinner from "@/components/Spinner.vue";

const app = createApp(App);

app.use(router).use(store).component("Spinner", Spinner);

app.mount("#app");
