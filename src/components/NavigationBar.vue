<!-- @format -->

<template>
  <nav>
    <div>
      <router-link to="/">Characters</router-link> |
      <router-link to="/favourites">Favourites</router-link>
    </div>
    <span> 1 </span>
  </nav>
</template>

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
}
</style>
