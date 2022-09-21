import { createStore } from "vuex";

interface State {
  favourites: number[];
}

export default createStore<State>({
  state() {
    return {
      favourites: JSON.parse(localStorage.getItem("favourites") || "[]"),
    };
  },
  mutations: {
    ADD_TO_FAVOURITES(state, payload) {
      state.favourites.push(payload.value);
    },
    REMOVE_FROM_FAVOURITES(state, payload) {
      const index = state.favourites.indexOf(payload.value);
      if (index > -1) {
        state.favourites.splice(index, 1);
      }
    },
  },
  actions: {
    addToFavourites(context, payload) {
      localStorage.setItem(
        "favourites",
        JSON.stringify([...context.state.favourites, payload.value])
      );

      context.commit("ADD_TO_FAVOURITES", payload);
    },
    removeFromFavourites(context, payload) {
      context.commit("REMOVE_FROM_FAVOURITES", payload);

      localStorage.setItem(
        "favourites",
        JSON.stringify([...context.state.favourites])
      );
    },
  },
  getters: {
    favouritesCount(state) {
      return state.favourites.length;
    },
  },
});
