import CharacterService from "@/services/CharacterService";
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
    console.log("state", context.state.favouriteCharacters);
    console.log("payload", payload);

    CharacterService.getCharactersByIds(context.state.favourites.toString())
      .then((response) => {
        if (!Array.isArray(response.data)) {
          context.commit(MutationTypes.LOAD_FAVOURITES, {
            value: [response.data],
          });
          // context.dispatch("loadCharacters", { value: [response.data] });
        } else {
          context.commit(MutationTypes.LOAD_FAVOURITES, {
            value: response.data,
          });
          // context.dispatch("loadCharacters", { value: response.data });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });

    // context.commit(MutationTypes.LOAD_FAVOURITES, payload);
  },
};
