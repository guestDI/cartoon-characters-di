<!-- @format -->

<template>
  <div class="container">
    <CharacterDetailsCard
      v-if="!isLoaded"
      :card="data"
      :primary-action-text="getPrimaryActionText(data)"
      :primary-action="getPrimaryActionHandler(data)"
    />
  </div>
</template>

<script lang="ts">
import CharacterDetailsCard from "@/components/CharacterDetailsCard.vue";
import CharacterService from "@/services/CharacterService";
import { Character } from "@/types";
import axios from "axios";
import { defineComponent, Ref, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "CharactersView",
  components: {
    CharacterDetailsCard,
  },
  props: ["id", "card"],

  setup(props) {
    let isLoaded: Ref<boolean> = ref(true);
    const data: Ref<Character | null> = ref(null);
    const router = useRouter();
    const store = useStore();

    watchEffect(() => {
      CharacterService.getCharacter(props.id)
        .then((response) => {
          data.value = response.data;
          isLoaded.value = false;

          axios
            .get(response.data.episode[0])
            .then((res) => {
              if (data.value) {
                data.value.episode = {
                  name: res.data.name,
                  number: res.data.episode,
                };
              }
            })
            .catch(() => {
              if (data.value) {
                data.value.episode = {
                  name: "N/A",
                  number: "N/A",
                };
              }
            });
        })
        .catch(() => {
          router.push({
            name: "404",
            params: { resource: "character" },
          });
        });
    });

    const addToFavorites = (card: Character) => {
      store.dispatch("addToFavourites", { value: card });
    };

    const removeFromFavorites = (id: number) => {
      store.dispatch("removeFromFavourites", { value: id });
    };

    const getPrimaryActionHandler = (card: Character) => {
      return store.state.favourites.includes(card?.id)
        ? () => removeFromFavorites(card?.id)
        : () => addToFavorites(card);
    };

    const getPrimaryActionText = (card: Character) => {
      return store.state.favourites.includes(card?.id)
        ? "Remove from favorites"
        : "Add to favorites";
    };

    return { data, isLoaded, getPrimaryActionHandler, getPrimaryActionText };
  },
});
</script>

<style scoped lang="scss">
.container {
  margin-top: 1rem;
}
</style>
