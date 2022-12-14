<!-- @format -->

<template>
  <div>
    <FiltersPanel @filter="filterCharacter" @search="searchCharacter" />
    <Spinner v-if="isLoading" />
    <h3 v-else-if="!data.length">Oops. There is nothing to see.</h3>
    <div v-else class="container">
      <CharacterCard
        v-for="(card, index) in data"
        :key="index"
        :card="card"
        :primary-action="getPrimaryActionHandler(card)"
        :primary-action-text="getPrimaryActionText(card)"
      />
    </div>
    <div v-if="!isLoading" class="footer">
      <div class="total">
        Page {{ `${route.query.page || 1} ` }} of {{ totalPages }}
      </div>
      <div class="pagination">
        <router-link
          :to="{
            path: '/',
            query: { page: parseInt(`${route.query.page}`) - 1 },
          }"
          :class="isPrevDisabled && 'disabled'"
          ><span>&#171;</span> Prev</router-link
        >
        <router-link
          :to="{
            path: '/',
            query: { page: (parseInt(`${route.query.page}`) || 1) + 1 },
          }"
          :class="isNextDisabled && 'disabled'"
          >Next <span>&#187;</span></router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watchEffect, computed } from "vue";
import CharacterCard from "@/components/CharacterCard.vue";
import FiltersPanel from "@/components/FiltersPanel.vue";
import CharacterService from "@/services/CharacterService";
import { useRoute, useRouter } from "vue-router";
import { Character, SpeciesFilter } from "../types";
import { useStore } from "vuex";
import Spinner from "@/components/shared/Spinner.vue";

export default defineComponent({
  name: "CharactersView",
  components: {
    CharacterCard,
    FiltersPanel,
    Spinner,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const data: Ref<Character[]> = ref([]);
    const totalPages = ref(0);
    const isLoading = ref(false);
    const filter = ref("");
    const searchKeyword = ref("");

    watchEffect(() => {
      isLoading.value = true;
      CharacterService.filterCharacters(
        parseInt(route.query.page?.toString() || "1"),
        `${filter.value} ${searchKeyword.value}`
      )
        .then((response) => {
          totalPages.value = response.data.info.pages;
          data.value = response.data.results;
          isLoading.value = false;
        })
        .catch(() => {
          isLoading.value = false;
        });
    });

    const isNextDisabled = computed(() => {
      return parseInt(`${route.query.page}`) === totalPages.value && "disabled";
    });

    const isPrevDisabled = computed(() => {
      return (
        (!parseInt(`${route.query.page}`) ||
          parseInt(`${route.query.page}`) === 1) &&
        "disabled"
      );
    });

    const filterCharacter = (value: SpeciesFilter) => {
      filter.value = value === "All" ? "" : `&species=${value}`;
      router.push({ query: { page: 1 } });
    };

    const searchCharacter = (value: string) => {
      searchKeyword.value = !value.length ? "" : `&name=${value}`;
      router.push({ query: { page: 1 } });
    };

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
      totalPages,
      filterCharacter,
      searchCharacter,
      route,
      isNextDisabled,
      isPrevDisabled,
      isLoading,
      getPrimaryActionHandler,
      getPrimaryActionText,
    };
  },
});
</script>

<style lang="scss">
.container {
  width: 90%;
  margin: 1rem auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer {
  display: flex;
  justify-content: end;
  padding: 1rem 4rem;
  font-size: 0.9rem;
  font-weight: 500;

  .pagination {
    margin-left: 1rem;

    a {
      text-decoration: none;
      color: inherit;

      &:visited {
        text-decoration: none;
        color: inherit;
      }
    }

    a.disabled {
      pointer-events: none;
      cursor: default;
      text-decoration: none;
      color: rgb(130, 130, 130);
    }

    a:last-of-type {
      margin-left: 1rem;
    }
  }
}
</style>
