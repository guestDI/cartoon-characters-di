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
  loadFavouritesCharacters(context) {
    context.commit(MutationTypes.FAVOURITES_ARE_LOADING, { value: true });
    CharacterService.getCharactersByIds(context.state.favourites.toString())
      .then((response) => {
        if (!Array.isArray(response.data)) {
          context.commit(MutationTypes.LOAD_FAVOURITES, {
            value: [response.data],
          });
        } else {
          context.commit(MutationTypes.LOAD_FAVOURITES, {
            value: response.data,
          });
        }

        context.commit(MutationTypes.FAVOURITES_ARE_LOADING, { value: false });
      })
      .catch((error) => {
        context.commit(MutationTypes.FAVOURITES_ARE_LOADING, { value: false });
        throw new Error(error);
      });
  },
};
