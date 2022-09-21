<!-- @format -->

<template>
  <div class="container">
    <CharacterDetailsCard v-if="!isLoaded" :card="data" />
  </div>
</template>

<script lang="ts">
import CharacterDetailsCard from "@/components/CharacterDetailsCard.vue";
import CharacterService from "@/services/CharacterService";
import EpisodeService from "@/services/EpisodeService";
import { Character } from "@/types";
import { defineComponent, Ref, ref, watchEffect } from "vue";

export default defineComponent({
  name: "CharactersView",
  components: {
    CharacterDetailsCard,
  },
  props: ["id", "card"],

  setup(props) {
    let isLoaded: Ref<boolean> = ref(false);
    const data: Ref<Character | null> = ref(null);

    const getEpisodeId = (url: string) => {
      const index = url.lastIndexOf("/");

      return url.substring(index + 1);
    };

    watchEffect(() => {
      isLoaded.value = true;
      CharacterService.getCharacter(props.id)
        .then((response) => {
          data.value = response.data;
          isLoaded.value = false;

          EpisodeService.getEpisode(
            getEpisodeId(response.data.episode[0])
          ).then((res) => {
            if (data.value) {
              data.value.episode = {
                name: res.data.name,
                number: res.data.episode,
              };
            }
          });
        })
        .catch((error) => {
          isLoaded.value = false;
          throw new Error(error);
        });
    });

    return { data, isLoaded };
  },
});
</script>

<style scoped lang="scss">
.container {
  margin-top: 1rem;
}
</style>
