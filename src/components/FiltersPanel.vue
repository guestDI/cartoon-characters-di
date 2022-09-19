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
    <div class="search">
      <input placeholder="Search by name..." type="text" v-model="keyword" />
      <button @click="search">Search</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import RadioButton from "@/components/RadioButton.vue";
export default defineComponent({
  components: {
    RadioButton,
  },
  emits: ["filter-characters", "search-character"],

  setup(_, { emit }) {
    let selectedFilter = ref("All");
    let keyword = ref("");

    const inputHandler = (value: string) => {
      selectedFilter.value = value;
      emit("filter-characters", value);
    };

    const search = () => {
      emit("search-character", keyword.value);
    };

    const isChecked = (val: string) => {
      return val === selectedFilter.value;
    };

    return {
      keyword,
      inputHandler,
      selectedFilter,
      isChecked,
      search,
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
  align-items: center;

  .search {
    margin-left: 1rem;

    input[type="text"] {
      padding: 4px 10px;
      line-height: 21px;
      min-width: 10rem;
    }

    button {
      padding: 5px 10px;
      line-height: 21px;
      border: 1px solid #000;
      border-left: none;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>
