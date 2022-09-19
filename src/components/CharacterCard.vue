<!-- @format -->

<template>
  <router-link :to="{ name: 'CharacterDetails', params: { id: card.id } }">
    <div class="card">
      <div class="img">
        <img :alt="card.name" :src="card.image" />
      </div>
      <div class="content">
        <div class="details">
          <span class="name">{{ card.name }}</span>
          <span class="desc">{{ card.species }} - {{ card.status }}</span>
        </div>
        <button @click.stop.prevent="btnProps.handler(card.id)">
          {{ btnProps.text }}
        </button>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps, toRefs, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps(["card"]);

const { card } = toRefs(props);

const addToFavorites = (id: number) => {
  store.commit("addToFavourites", { value: id });

  // console.log(store.state.favourites);

  localStorage.setItem(
    "favourites",
    JSON.stringify([...store.state.favourites])
  );
};

const removeFromFavorites = (id: number) => {
  store.commit("removeFromFavourites", { value: id });

  // console.log(store.state.favourites);

  localStorage.setItem(
    "favourites",
    JSON.stringify([...store.state.favourites])
  );
};

const btnProps = computed(() => {
  return store.state.favourites.includes(card?.value.id)
    ? { handler: removeFromFavorites, text: "Remove from favorites" }
    : { handler: addToFavorites, text: "Add to favorites" };
});
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
.card {
  border: 1px solid #e5e5e5;
  border-radius: 2px;
  width: 100%;
  cursor: pointer;

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }

  .content {
    text-align: left;
    padding: 12px;

    .details {
      color: #000;
      display: flex;
      flex-direction: column;
      font-size: 0.9rem;
      padding-bottom: 0.5rem;

      .name {
        font-weight: 700;
      }
    }
  }

  button {
    background-color: #000;
    color: #fff;
    cursor: pointer;
    padding: 8px;
    border: 1px solid #000;
    border-radius: 5px;
    font-size: 0.8rem;

    &:hover {
      background-color: rgb(47, 44, 44);
    }
  }
}
</style>
