import { Character } from "@/types";
import { createStore } from "vuex";

interface State {
  favourites: number[];
  favouriteCharacters: Character[];
}

export default createStore<State>({
  state() {
    return {
      favourites: JSON.parse(localStorage.getItem("favourites") || "[]"),
      favouriteCharacters: [],
    };
  },
  mutations: {
    ADD_TO_FAVOURITES(state, payload) {
      state.favourites.push(payload.value.id);
      state.favouriteCharacters.push(payload.value);
    },
    LOAD_FAVOURITES(state, payload) {
      state.favouriteCharacters.push(...payload.value);
    },
    REMOVE_FROM_FAVOURITES(state, payload) {
      const index = state.favourites.indexOf(payload.value);
      if (index > -1) {
        state.favourites.splice(index, 1);
      }

      state.favouriteCharacters = state.favouriteCharacters.filter(
        (character) => character.id !== payload.value
      );
    },
  },
  actions: {
    addToFavourites(context, payload) {
      localStorage.setItem(
        "favourites",
        JSON.stringify([...context.state.favourites, payload.value.id])
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
    loadCharacters(context, payload) {
      context.commit("LOAD_FAVOURITES", payload);
    },
  },
  getters: {
    favouritesCount(state) {
      return state.favourites.length;
    },
    favouriteCharacters(state) {
      return state.favouriteCharacters;
    },
  },
});
