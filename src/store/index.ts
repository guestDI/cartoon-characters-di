import { Character } from "@/types";
import { createStore } from "vuex";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { getItem } from "./utils";

export interface State {
  favourites: number[];
  favouriteCharacters: Character[];
  initialLoad: boolean;
  favouritesAreLoading: boolean;
}

export default createStore<State>({
  state() {
    return {
      favourites: getItem("favourites"),
      favouriteCharacters: [],
      initialLoad: false,
      favouritesAreLoading: false,
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
});
