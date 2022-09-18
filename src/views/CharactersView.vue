<!-- @format -->

<template>
  <div>
    <FiltersPanel />
    <div class="container">
      <CharacterCard v-for="(card, index) in data" :key="index" :card="card" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CharacterCard from "@/components/CharacterCard.vue";
import FiltersPanel from "@/components/FiltersPanel.vue";
import axios from "axios";

export default defineComponent({
  name: "CharactersView",
  components: {
    CharacterCard,
    FiltersPanel,
  },
  setup() {
    const data: any = ref(null);

    const getCharacters = async () => {
      try {
        const json = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        data.value = json.data.results;
      } catch (e) {
        throw new Error("Something went wrong, " + e);
      }
    };

    getCharacters();

    return { data };
  },
});
</script>

<style lang="scss">
.container {
  display: flex;
  gap: 2rem;
  padding: 1rem 4rem;
}
</style>
