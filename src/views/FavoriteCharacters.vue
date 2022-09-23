<!-- @format -->

<template>
  <div class="container">
    <div v-if="store.getters.favouritesCount === 0" class="empty">
      <h3>No favourite characters</h3>
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
import axios from "axios";
import Button from "@/components/shared/Button.vue";
import { Character } from "@/types";

export default defineComponent({
  components: {
    CharacterCard,
    Button,
  },

  setup() {
    const store = useStore();
    let data: Ref<Character[]> = ref([]);

    const getCharacters = async (ids: string) => {
      try {
        const json = await axios.get(
          `https://rickandmortyapi.com/api/character/${ids}`
        );

        if (!Array.isArray(json.data)) {
          store.dispatch("loadCharacters", { value: [json.data] });
        } else {
          store.dispatch("loadCharacters", { value: json.data });
        }
      } catch (e) {
        throw new Error("Something went wrong, " + e);
      }
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
