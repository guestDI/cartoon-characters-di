import { MutationTypes } from "@/types";
import { ActionTree } from "vuex";
import { State } from "./index";

export const actions: ActionTree<State, State> = {
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
};
