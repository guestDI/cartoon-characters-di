<!-- @format -->

<template>
  <div>
    <FiltersPanel
      @filter-characters="filterCharacter"
      @search-character="searchCharacter"
    />
    <div class="container">
      <CharacterCard v-for="(card, index) in data" :key="index" :card="card" />
    </div>
    <div class="footer">
      <div class="total">
        Page {{ `${route.query.page}` }} of {{ totalPages }}
      </div>
      <div class="pagination">
        <router-link
          :to="{
            path: '/',
            query: { page: parseInt(`${route.query.page}`) - 1 },
          }"
          v-if="parseInt(`${route.query.page}`) != 1"
          >&#60; Prev</router-link
        >
        <router-link
          :to="{
            path: '/',
            query: { page: parseInt(`${route.query.page}`) + 1 },
          }"
          >Next &#62;</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import CharacterCard from "@/components/CharacterCard.vue";
import FiltersPanel from "@/components/FiltersPanel.vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "CharactersView",
  components: {
    CharacterCard,
    FiltersPanel,
  },
  props: ["query"],

  setup(props) {
    const router = useRouter();
    const route = useRoute();

    const data: any = ref(null);
    const totalPages = ref(0);
    const selectedFilter = ref("All");

    const getCharacters = async (page: number) => {
      try {
        const json = await axios.get(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        totalPages.value = json.data.info.pages;
        data.value = json.data.results;
      } catch (e) {
        throw new Error("Something went wrong, " + e);
      }
    };

    watchEffect(() => {
      getCharacters(+route.query.page!);
    });

    const filterCharacter = async (value: string) => {
      selectedFilter.value = value;
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

    const searchCharacter = async (value: string) => {
      const searchQuery =
        selectedFilter.value !== "All"
          ? `?species=${value}&name=${value}`
          : `?name=${value}`;

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

    return {
      data,
      totalPages,
      filterCharacter,
      searchCharacter,
      route,
    };
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

    a {
      text-decoration: none;
    }

    a:last-of-type {
      margin-left: 1rem;
    }
  }
}
</style>
