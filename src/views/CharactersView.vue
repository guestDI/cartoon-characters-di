<!-- @format -->

<template>
  <div>
    <FiltersPanel />
    <div class="container">
      <CharacterCard />
      <CharacterCard />
      <CharacterCard />
      <CharacterCard />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CharacterCard from "@/components/CharacterCard.vue";
import FiltersPanel from "@/components/FiltersPanel.vue";

export default defineComponent({
  name: "CharactersView",
  components: {
    CharacterCard,
    FiltersPanel,
  },
});
</script>

<style lang="scss">
.container {
  display: flex;
  gap: 2rem;
  padding: 1rem 5rem;
}
</style>
