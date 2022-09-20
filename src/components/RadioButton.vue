<!-- @format -->

<template>
  <input
    type="radio"
    :id="option"
    name="radioCharacter"
    :value="option"
    :checked="checked"
    @change="emit('input', ($event?.target as HTMLInputElement).value)"
  />
  <label :for="option">{{ option }}</label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { SpeciesFilter } from "@/types";

interface Props {
  option: SpeciesFilter;
  checked: boolean;
}

defineProps<Props>();
const emit = defineEmits(["input"]);
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
