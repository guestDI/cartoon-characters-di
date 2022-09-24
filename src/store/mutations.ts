import { Character, MutationTypes } from "@/types";
import { MutationTree } from "vuex";
import { State } from "./index";

export const mutations: MutationTree<State> = {
  [MutationTypes.ADD_TO_FAVOURITES](state, payload: { value: Character }) {
    state.favourites.push(payload.value.id);
    state.favouriteCharacters.push(payload.value);
  },
  [MutationTypes.LOAD_FAVOURITES](state, payload: { value: Character[] }) {
    state.favouriteCharacters = [...payload.value];
    state.initialLoad = true;
  },
  [MutationTypes.REMOVE_FROM_FAVOURITES](state, payload: { value: number }) {
    const index = state.favourites.indexOf(payload.value);
    if (index > -1) {
      state.favourites.splice(index, 1);
    }

    state.favouriteCharacters = state.favouriteCharacters.filter(
      (character: Character) => character.id !== payload.value
    );
  },
};
