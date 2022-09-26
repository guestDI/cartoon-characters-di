<!-- @format -->

<template>
  <div class="card">
    <div class="content">
      <div class="details">
        <h1 class="name">{{ character?.name }}</h1>
        <span class="desc"
          >{{ character?.species }} - {{ character?.status }}</span
        >
        <span class="desc"
          >Last known location: {{ character?.location?.name }}</span
        >
        <span class="desc"
          >First seen in {{ character?.episode?.number }} -
          {{ character?.episode?.name }}</span
        >
      </div>
      <Button @click.prevent="btnAction">{{ btnText }}</Button>
    </div>
    <img :alt="character?.name" :src="character?.image" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import Button from "@/components/shared/Button.vue";

export default defineComponent({
  components: {
    Button,
  },
  props: ["card", "primaryAction", "primaryActionText"],

  setup(props) {
    let character = ref(props.card);
    const { primaryAction, primaryActionText } = toRefs(props);

    return {
      character,
      btnAction: primaryAction,
      btnText: primaryActionText,
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
  box-shadow: 7px 2px 24px -19px rgba(66, 68, 90, 1);

  img {
    width: 13rem;
    height: 13rem;
    object-fit: cover;
  }

  .content {
    text-align: left;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    button {
      width: 14rem;
    }
    .details {
      display: flex;
      flex-direction: column;
      font-size: 0.9rem;
      padding-bottom: 0.5rem;
      line-height: 1.8;

      .name {
        margin: 0;
      }
    }
  }
}
</style>
