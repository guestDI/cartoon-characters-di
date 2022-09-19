import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";

interface State {
  favourites: number[];
}

const store = createStore<State>({
  state() {
    return {
      favourites: JSON.parse(localStorage.getItem("favourites") || "[]"),
    };
  },
  mutations: {
    addToFavourites(state, payload) {
      state.favourites.push(payload.value);
    },
    removeFromFavourites(state, payload) {
      const index = state.favourites.indexOf(payload.value);
      if (index > -1) {
        state.favourites.splice(index, 1);
      }
    },
  },
});

const app = createApp(App);

app.use(router).use(store);

app.mount("#app");
