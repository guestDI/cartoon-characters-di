<!-- @format -->

<template>
  <nav>
    <div>
      <router-link to="/">Characters</router-link> |
      <router-link to="/favourites">Favourites</router-link>
    </div>
    <div class="stat">
      <img src="@/assets/heart.svg" width="20" height="20" />
      <span> {{ store.getters.favouritesCount }} </span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();
</script>

<style lang="scss">
nav {
  padding: 1rem 2rem;
  background-color: #0a1b22;
  display: flex;
  justify-content: space-between;

  a {
    font-weight: bold;
    color: #acacac;
    text-decoration: none;

    &.router-link-exact-active {
      color: #fff;
    }
  }

  .stat {
    display: flex;
    align-items: center;
    color: #fff;

    img {
      margin-right: 0.6rem;
    }
  }
}
</style>
