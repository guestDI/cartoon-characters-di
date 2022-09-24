<!-- @format -->

<template>
  <div v-if="favouritesCount === 0" class="empty">
    <h3>{{ noFavouritesMessage }}</h3>
    <Button @click="$router.back">Go back</Button>
  </div>
  <Spinner v-else-if="isLoading" />
  <div v-else class="container">
    <CharacterCard
      v-for="(card, index) in favouriteCharacters"
      :key="index"
      :card="card"
      :primary-action="getPrimaryActionHandler(card)"
      :primary-action-text="getPrimaryActionText(card)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, computed } from "vue";
import CharacterCard from "@/components/CharacterCard.vue";
import { useStore } from "vuex";
import Button from "@/components/shared/Button.vue";
import { Character } from "@/types";
import Spinner from "@/components/shared/Spinner.vue";

export default defineComponent({
  components: {
    CharacterCard,
    Button,
    Spinner,
  },

  setup() {
    const store = useStore();
    let data: Ref<Character[]> = ref([]);
    let noFavouritesMessage = ref("No favourite characters");
    let isLoading = ref(false);

    if (!store.getters.initialLoad) {
      store.dispatch("loadCharacters");
    }

    const favouritesCount = computed(() => store.getters.favouritesCount);

    const favouriteCharacters = computed(
      () => store.getters.favouriteCharacters as Character[]
    );

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
      getPrimaryActionHandler,
      getPrimaryActionText,
      noFavouritesMessage,
      isLoading,
      favouriteCharacters,
      favouritesCount,
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
