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
        <Button @click.prevent="btnAction">{{ btnText }}</Button>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import Button from "@/components/shared/Button.vue";

// interface Props {
//   option: SpeciesFilter;
//   checked: boolean;
// }

export default defineComponent({
  props: ["card", "primaryAction", "primaryActionText"],
  components: {
    Button,
  },

  setup(props) {
    const { primaryAction, primaryActionText } = toRefs(props);

    return {
      btnAction: primaryAction,
      btnText: primaryActionText,
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
