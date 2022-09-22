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
        <Button @click.prevent="btnProps.handler">{{ btnProps.text }}</Button>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from "vue";
import { useStore } from "vuex";
import Button from "@/components/shared/Button.vue";

export default defineComponent({
  props: ["card"],
  emits: ["remove"],
  components: {
    Button,
  },

  setup(props, context) {
    const store = useStore();

    const { card } = toRefs(props);

    const addToFavorites = (id: number) => {
      store.dispatch("addToFavourites", { value: id });
    };

    const removeFromFavorites = (id: number) => {
      store.dispatch("removeFromFavourites", { value: id });
      context.emit("remove", id);
    };

    const btnProps = computed(() => {
      return store.state.favourites.includes(card?.value.id)
        ? {
            handler: () => removeFromFavorites(card?.value.id),
            text: "Remove from favorites",
          }
        : {
            handler: () => addToFavorites(card?.value.id),
            text: "Add to favorites",
          };
    });

    return {
      btnProps,
    };
  },
});
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
.card {
  border: 1px solid #e5e5e5;
  border-radius: 2px;
  width: 13rem;
  cursor: pointer;

  img {
    width: 13rem;
    height: 13rem;
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
}
</style>
