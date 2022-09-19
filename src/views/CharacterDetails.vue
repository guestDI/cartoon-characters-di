<!-- @format -->

<template>
  <div class="container">
    <CharacterDetailsCard />
  </div>
</template>

<script lang="ts">
import CharacterDetailsCard from "@/components/CharacterDetailsCard.vue";
import { useRouter } from "vue-router";
import { defineProps, toRefs, defineComponent } from "vue";

export default defineComponent({
  name: "CharactersView",
  components: {
    CharacterDetailsCard,
  },
});

const props = defineProps(["card"]);
const { card } = toRefs(props);

console.log(card);
</script>

<style scoped lang="scss">
.container {
  margin-top: 1rem;
}
</style>
