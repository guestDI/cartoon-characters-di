<!-- @format -->

<template>
  <div>
    <FiltersPanel @filter-characters="filterCharacter" />
    <div class="container">
      <CharacterCard
        v-for="(card, index) in data"
        :key="index"
        :card="card"
        @click="goToCharacterDetails(card as any)"
      />
    </div>
    <div class="footer">
      <div class="total">Page 1 of {{ totalPages }}</div>
      <div class="pagination">
        <router-link to="CharactersView"> Prev</router-link>
        <router-link to="CharactersView">Next</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import CharacterCard from "@/components/CharacterCard.vue";
import FiltersPanel from "@/components/FiltersPanel.vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CharactersView",
  components: {
    CharacterCard,
    FiltersPanel,
  },
  setup() {
    const router = useRouter();
    const data: any = ref(null);
    const totalPages = ref(0);

    const getCharacters = async () => {
      try {
        const json = await axios.get(
          "https://rickandmortyapi.com/api/character?page=1"
        );
        totalPages.value = json.data.info.pages;
        data.value = json.data.results;
      } catch (e) {
        throw new Error("Something went wrong, " + e);
      }
    };

    getCharacters();

    const goToCharacterDetails = (card: any) => {
      router.push(`character/${card.id}`);
    };

    const filterCharacter = async (value: string) => {
      const searchQuery = value === "All" ? "" : `?species=${value}`;

      try {
        const json = await axios.get(
          `https://rickandmortyapi.com/api/character${searchQuery}`
        );
        totalPages.value = json.data.info.pages;
        data.value = json.data.results;
      } catch (e) {
        throw new Error("Something went wrong, " + e);
      }
    };

    return { data, goToCharacterDetails, totalPages, filterCharacter };
  },
});
</script>

<style lang="scss">
.container {
  width: 90%;
  margin: 1rem auto;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  height: max-content;
  align-content: baseline;
}

.footer {
  display: flex;
  justify-content: end;
  padding: 1rem 3rem;

  .pagination {
    margin-left: 1rem;

    a:last-of-type {
      margin-left: 1rem;
    }
  }
}
</style>
