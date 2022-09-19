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
        <span class="desc">First seen in </span>
      </div>
      <button>Add to Favorites</button>
    </div>
    <div class="img">
      <img :alt="character.name" :src="character.image" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref } from "vue";

export default defineComponent({
  props: ["card"],

  setup(props) {
    let character = ref(props.card);

    watchEffect(() => {
      character = ref(props.card);
    });

    // console.log(character);

    // const characterCard = ref(props.card);

    return {
      character,
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
    width: 150px;
    height: 150px;
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

      .name {
        margin: 0;
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
