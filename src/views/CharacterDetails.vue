<!-- @format -->

<template>
  <div class="container">
    <CharacterDetailsCard v-if="!isLoaded" :card="data" />
  </div>
</template>

<script lang="ts">
import CharacterDetailsCard from "@/components/CharacterDetailsCard.vue";
import { Character } from "@/types";
import axios from "axios";
import { defineComponent, Ref, ref } from "vue";

export default defineComponent({
  name: "CharactersView",
  components: {
    CharacterDetailsCard,
  },
  props: ["id", "card"],

  setup(props) {
    let isLoaded: Ref<boolean> = ref(false);
    const data: Ref<Character | null> = ref(null);

    const getCharacter = async () => {
      try {
        isLoaded.value = true;
        const json = await axios.get(
          `https://rickandmortyapi.com/api/character/${props.id}`
        );
        data.value = json.data;
        isLoaded.value = false;
      } catch (e) {
        isLoaded.value = false;
        throw new Error("Something went wrong, " + e);
      }
    };

    getCharacter();

    return { data, isLoaded };
  },
});
</script>

<style scoped lang="scss">
.container {
  margin-top: 1rem;
}
</style>
