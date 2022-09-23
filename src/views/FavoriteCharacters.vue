<!-- @format -->

<template>
  <div class="container">
    <div v-if="store.getters.favouritesCount === 0" class="empty">
      <h3>{{ noFavouritesMessage }}</h3>
      <Button @click="$router.back">Go back</Button>
    </div>
    <CharacterCard
      v-for="(card, index) in data"
      :key="index"
      :card="card"
      :primary-action="getPrimaryActionHandler(card)"
      :primary-action-text="getPrimaryActionText(card)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watchEffect } from "vue";
import CharacterCard from "@/components/CharacterCard.vue";
import { useStore } from "vuex";
import Button from "@/components/shared/Button.vue";
import { Character } from "@/types";
import CharacterService from "@/services/CharacterService";

export default defineComponent({
  components: {
    CharacterCard,
    Button,
  },

  setup() {
    const store = useStore();
    let data: Ref<Character[]> = ref([]);
    let noFavouritesMessage = ref("No favourite characters");

    const getCharacters = (ids: string) => {
      CharacterService.getCharactersByIds(ids)
        .then((response) => {
          if (!Array.isArray(response.data)) {
            store.dispatch("loadCharacters", { value: [response.data] });
          } else {
            store.dispatch("loadCharacters", { value: response.data });
          }
        })
        .catch((error) => {
          noFavouritesMessage.value = "Something went wrong";
          throw new Error(error);
        });
    };

    if (!store.getters.favouriteCharacters.length) {
      getCharacters(store.state.favourites);
    }

    watchEffect(() => {
      data.value = store.getters.favouriteCharacters;
    });

    const getPrimaryActionHandler = (card: Character) => {
      return store.state.favourites.includes(card?.id)
        ? () => store.dispatch("removeFromFavourites", { value: card.id })
        : () => store.dispatch("addToFavourites", { value: card });
    };

    const getPrimaryActionText = (card: Character) => {
      return store.state.favourites.includes(card?.id)
        ? "Remove from favorites"
        : "Add to favorites";
    };

    return {
      data,
      store,
      getPrimaryActionHandler,
      getPrimaryActionText,
      noFavouritesMessage,
    };
  },
});
</script>

<style scoped lang="scss">
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
