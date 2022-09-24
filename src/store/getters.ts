import { Character } from "@/types";
import { GetterTree } from "vuex";
import { State } from "./index";

export type Getters = {
  favouritesCount(state: State): number;
  favouriteCharacters(state: State): Character[];
};

export const getters: GetterTree<State, State> & Getters = {
  favouritesCount(state): number {
    return state.favourites.length;
  },
  favouriteCharacters(state): Character[] {
    return state.favouriteCharacters;
  },
};
