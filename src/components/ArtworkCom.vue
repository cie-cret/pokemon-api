<script setup lang="ts">
import { usePokemonStore } from '@/stores/PokemonStore'
const pokemonStore = usePokemonStore()
</script>

<template>
  <div class="artwork-wrapper">
    <img
      :src="pokemonStore.pokemonData.pkmArtwork"
      :alt="`${pokemonStore.pokemonData.pkmName} artwork`"
    />
  </div>
</template>

<style scoped lang="scss">
// Root

@import '/src/scss/Colors.scss';
@import '/src/scss/Breakpoints.scss';

// Left

.artwork-wrapper {
  background-color: $ImageBg;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    scale: 1.05;
    transition: scale 0.2s ease-in-out;
  }

  @include mobile {
    min-height: 200px;
    min-width: 279px;
  }

  @include laptop {
    min-height: 202px;
    min-width: 281px;
  }

  img {
    max-width: 160px;
    max-height: 160px;
    object-fit: scale-down;
    transition: all 0.2s ease-in-out;
  }
}
</style>
