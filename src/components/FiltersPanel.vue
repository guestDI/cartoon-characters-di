<!-- @format -->

<template>
  <div class="panel">
    <div class="radio-toolbar">
      <RadioButton
        option="All"
        @input="inputHandler"
        :checked="isChecked('All')"
      />
      <RadioButton
        option="Human"
        @input="inputHandler"
        :checked="isChecked('Human')"
      />
      <RadioButton
        option="Animal"
        @input="inputHandler"
        :checked="isChecked('Animal')"
      />
      <RadioButton
        option="Alien"
        @input="inputHandler"
        :checked="isChecked('Alien')"
      />
    </div>
    <div class="filters">{{ selectedFilter }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import RadioButton from "@/components/RadioButton.vue";
export default defineComponent({
  components: {
    RadioButton,
  },

  setup() {
    let selectedFilter = ref("All");

    const inputHandler = (value: string) => {
      selectedFilter.value = value;
    };

    const isChecked = (val: string) => {
      return val === selectedFilter.value;
    };

    return {
      inputHandler,
      selectedFilter,
      isChecked,
    };
  },
});
</script>

<style lang="scss">
.panel {
  display: flex;
  text-align: left;
  background: #e5e5e5;
  padding: 1rem;
}
</style>
