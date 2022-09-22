<!-- @format -->

<template>
  <div class="card">
    <div class="content">
      <div class="details">
        <h1 class="name">{{ character.name }}</h1>
        <span class="desc"
          >{{ character.species }} - {{ character.status }}</span
        >
        <span class="desc"
          >Last known location: {{ character.location.name }}</span
        >
        <span class="desc"
          >First seen in {{ character.episode?.number }} -
          {{ character.episode?.name }}</span
        >
      </div>
      <Button @click.prevent="btnProps.handler">{{ btnProps.text }}</Button>
    </div>
    <div class="img">
      <img :alt="character.name" :src="character.image" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import Button from "@/components/shared/Button.vue";

export default defineComponent({
  components: {
    Button,
  },
  props: ["card"],

  setup(props) {
    let character = ref(props.card);
    const store = useStore();

    const addToFavorites = () => {
      store.dispatch("addToFavourites", { value: character.value.id });
    };

    const removeFromFavorites = () => {
      store.dispatch("removeFromFavourites", { value: character.value.id });
    };

    const btnProps = computed(() => {
      return store.state.favourites.includes(character?.value.id)
        ? { handler: removeFromFavorites, text: "Remove from favorites" }
        : { handler: addToFavorites, text: "Add to favorites" };
    });

    return {
      character,
      btnProps,
    };
  },
});
</script>

<style scoped lang="scss">
.card {
  border: 1px solid #e5e5e5;
  border-radius: 2px;
  width: 90%;
  cursor: pointer;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;

  img {
    width: 13rem;
    height: 13rem;
    object-fit: cover;
  }

  .content {
    text-align: left;
    padding: 12px;
    .details {
      display: flex;
      flex-direction: column;
      font-size: 0.9rem;
      padding-bottom: 0.5rem;
      line-height: 1.8;

      .name {
        margin: 0;
      }
    }
  }
}
</style>
