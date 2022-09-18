<!-- @format -->

<template>
  <div class="card">
    <div class="img">
      <img alt="Rick's Toxic Side" :src="card.image" />
    </div>
    <div class="content">
      <div class="details">
        <span class="name">{{ card.name }}</span>
        <span class="desc">{{ card.species }} - {{ card.status }}</span>
      </div>
      <button>Add to Favorites</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from "vue";

const props = defineProps(["card"]);

const { card } = toRefs(props);
</script>

<style scoped lang="scss">
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
