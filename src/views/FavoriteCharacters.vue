<!-- @format -->

<template>
  <div class="container">
    <div v-if="store.getters.favouritesCount === 0" class="empty">
      <h3>No favourite characters</h3>
      <Button @click="router.back">Go back</Button>
    </div>
    <CharacterCard
      v-for="(card, index) in data"
      :key="index"
      :card="card"
      @remove="onRemove"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import CharacterCard from "@/components/CharacterCard.vue";
import { useStore } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";
import Button from "@/components/Button.vue";
import { Character } from "@/types";

export default defineComponent({
  components: {
    CharacterCard,
    Button,
  },

  setup() {
    const router = useRouter();
    const store = useStore();
    let data: Ref<Character[]> = ref([]);

    const getCharacters = async (ids: string) => {
      try {
        const json = await axios.get(
          `https://rickandmortyapi.com/api/character/${ids}`
        );

        if (!Array.isArray(json.data)) {
          data.value = [json.data];
        } else {
          data.value = json.data;
        }
      } catch (e) {
        throw new Error("Something went wrong, " + e);
      }
    };

    if (store.getters.favouritesCount) {
      getCharacters(store.state.favourites);
    }

    const onRemove = (val: number) => {
      const index = data.value.findIndex((card: Character) => card.id === val);

      data.value.splice(index, 1);
    };

    return { data, router, store, onRemove };
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
