<!-- @format -->

<template>
  <!-- <div class="radio-toolbar"> -->
  <input
    type="radio"
    :id="option"
    name="radioCharacter"
    :value="option"
    :checked="checked"
    @change="$emit('input', ($event?.target as HTMLInputElement).value)"
  />
  <label :for="option">{{ option }}</label>

  <!--   <input type="radio" id="radioBanana" name="radioFruit" value="banana" />
    <label for="radioBanana">Banana</label>

    <input type="radio" id="radioOrange" name="radioFruit" value="orange" />
    <label for="radioOrange">Orange</label> -->
  <!-- </div> -->
</template>

<script lang="ts">
export default {
  props: {
    option: {
      required: true,
      type: String,
    },
    checked: {
      required: true,
      type: Boolean,
    },
  },
  emits: ["input"],
};
</script>

<style scoped lang="scss">
input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

label {
  display: inline-block;
  padding: 6px 14px;
  font-size: 14px;
  border: 1px solid #000;
  cursor: pointer;
  font-weight: 600;

  &:last-of-type {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:first-of-type {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:hover {
    background-color: rgb(47, 44, 44);
    color: #fff;
  }
}

input[type="radio"]:checked + label {
  background-color: #000;
  color: #fff;
}
</style>
