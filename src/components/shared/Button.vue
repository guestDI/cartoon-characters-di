<!-- @format -->

<template>
  <button :class="computedClass">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    type: {
      type: String,
      required: false,
      default: "primary",
    },
  },

  setup(props) {
    const computedClass = props.type === "default" ? "default" : "primary";

    return { computedClass };
  },
});
</script>

<style scoped lang="scss">
button {
  cursor: pointer;
  border: 1px solid #000;
  font-size: 0.8rem;
}
.primary {
  background-color: #000;
  color: #fff;
  padding: 8px;
  border-radius: 5px;

  &:hover {
    background-color: rgb(47, 44, 44);
  }
}

.default {
  padding: 5px 10px;
  line-height: 21px;
  border-left: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
