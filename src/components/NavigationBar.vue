<!-- @format -->

<template>
  <nav>
    <div>
      <router-link to="/">Characters</router-link> |
      <router-link to="/favourites">Favourites</router-link>
    </div>
    <div class="favourites">
      <img src="@/assets/heart.svg" width="20" height="20" />
      <span> {{ store.state.favourites.length }} </span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();
</script>

<style lang="scss">
nav {
  padding: 20px;
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

  .favourites {
    display: flex;
    align-items: center;

    img {
      margin-right: 0.6rem;
    }

    span {
      color: #fff;
    }
  }
}
</style>
