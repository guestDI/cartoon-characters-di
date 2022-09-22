<!-- @format -->

<template>
  <div class="panel">
    <div class="radio-toolbar">
      <RadioButton
        option="All"
        @input="changeFilter"
        :checked="isChecked('All')"
      />
      <RadioButton
        option="Human"
        @input="changeFilter"
        :checked="isChecked('Human')"
      />
      <RadioButton
        option="Animal"
        @input="changeFilter"
        :checked="isChecked('Animal')"
      />
      <RadioButton
        option="Alien"
        @input="changeFilter"
        :checked="isChecked('Alien')"
      />
    </div>
    <div class="search">
      <input placeholder="Search by name..." type="text" v-model="keyword" />
      <Button @click="search" type="default">Search</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import RadioButton from "@/components/RadioButton.vue";
import Button from "@/components/shared/Button.vue";
import { SpeciesFilter } from "@/types";

export default defineComponent({
  components: {
    RadioButton,
    Button,
  },
  emits: ["filter", "search"],

  setup(_, { emit }) {
    let selectedFilter = ref("All");
    let keyword = ref("");

    const changeFilter = (value: SpeciesFilter) => {
      selectedFilter.value = value;
      emit("filter", value);
    };

    const search = () => {
      emit("search", keyword.value);
    };

    const isChecked = (value: SpeciesFilter) => value === selectedFilter.value;

    return {
      keyword,
      changeFilter,
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
      min-width: 11rem;
    }
  }
}

@media (max-width: 580px) {
  .panel {
    flex-direction: column;
    align-items: flex-end;

    .search {
      margin-top: 1rem;
    }
  }
}
</style>
