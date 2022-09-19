<!-- @format -->

<template>
  <div class="container">
    <CharacterCard v-for="(card, index) in data" :key="index" :card="card" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CharacterCard from "@/components/CharacterCard.vue";
import { useStore } from "vuex";
import axios from "axios";

export default defineComponent({
  components: {
    CharacterCard,
  },

  setup() {
    const store = useStore();
    let data: any = ref([]);

    const getCharacters = async (ids: any) => {
      try {
        const json = await axios.get(
          `https://rickandmortyapi.com/api/character/${ids}`
        );

        data.value = json.data;
      } catch (e) {
        throw new Error("Something went wrong, " + e);
      }
    };

    if (store.state.favourites.length) {
      getCharacters(store.state.favourites);
    }

    return { data };
  },
});
</script>
