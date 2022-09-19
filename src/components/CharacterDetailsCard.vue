<!-- @format -->

<template>
  <div class="card">
    <div class="content">
      <div class="details">
        <h1 class="name">name</h1>
        <span class="desc">status</span>
        <span class="desc">Last known location</span>
        <span class="desc">First seen in </span>
      </div>
      <button>Add to Favorites</button>
    </div>
    <div class="img">
      <img
        alt="Rick's Toxic Side"
        src="https://rickandmortyapi.com/api/character/avatar/3.jpeg"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// import { computed } from "vue";
// import { useStore } from "vuex";

// const store = useStore();

// const btnText = computed(() => {
//   return store.state.favourites.includes(card?.value.id)
//     ? "Remove from favorites"
//     : "Add to favorites";
// });
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
