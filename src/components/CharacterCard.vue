<!-- @format -->

<template>
  <div class="card">
    <div class="img">
      <img
        alt="Rick's Toxic Side"
        src="https://rickandmortyapi.com/api/character/avatar/361.jpeg"
      />
    </div>
    <div class="content">
      <div class="details">
        <span>Name</span>
        <span>Desc</span>
      </div>
      <button>Add to Favorites</button>
    </div>
  </div>
</template>

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
    padding: 10px;
    .details {
      display: flex;
      flex-direction: column;
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
