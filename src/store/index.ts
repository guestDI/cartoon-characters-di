import { Character } from "@/types";
import { createStore } from "vuex";
import { MutationTypes } from "../types";

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
    [MutationTypes.ADD_TO_FAVOURITES](state, payload) {
      state.favourites.push(payload.value.id);
      state.favouriteCharacters.push(payload.value);
    },
    [MutationTypes.LOAD_FAVOURITES](state, payload) {
      state.favouriteCharacters.push(...payload.value);
    },
    [MutationTypes.REMOVE_FROM_FAVOURITES](state, payload) {
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

      context.commit(MutationTypes.ADD_TO_FAVOURITES, payload);
    },
    removeFromFavourites(context, payload) {
      context.commit(MutationTypes.REMOVE_FROM_FAVOURITES, payload);

      localStorage.setItem(
        "favourites",
        JSON.stringify([...context.state.favourites])
      );
    },
    loadCharacters(context, payload) {
      context.commit(MutationTypes.LOAD_FAVOURITES, payload);
    },
  },
  getters: {
    favouritesCount(state): number {
      return state.favourites.length;
    },
    favouriteCharacters(state): Character[] {
      return state.favouriteCharacters;
    },
  },
});
