<script setup lang="ts">
const props = defineProps<{
  searchItem: string
  handleSearch: (favName?: string) => void
  capFirstLetter: (letter?: string) => string
}>()

import { usePokemonStore } from '@/stores/PokemonStore'

import XIcon from '@/components/icons/XIcon.vue'

const pokemonStore = usePokemonStore()

const deleteFav = (index: number, pokemonName: string) => {
  pokemonStore.deleteFavoriteItem(index)

  if (pokemonStore.pokemonData.pkmName === pokemonName) {
    const favButton = document.querySelector('#fav-button') as HTMLButtonElement
    favButton.classList.toggle('flip-animation')
  }
}
</script>

<template>
  <!-- Bottom -->
  <section class="fav-container">
    <div class="fav-box">
      <!-- Heading -->
      <div class="heading-wrapper"><h2>Favorite</h2></div>
      <div class="fav-tag">
        <!-- Window -->
        <ul class="grid-control">
          <!-- Tags -->
          <li
            v-for="(pokemon, index) in pokemonStore.favPokemonList"
            :key="index"
            class="relative"
          >
            <div class="fav-item">
              <div
                class="name-wrapper"
                @click="props.handleSearch(pokemon.pkmName)"
              >
                {{ capFirstLetter(pokemon.pkmName) }}
              </div>
              <button
                class="x-icon absolute"
                aria-label="delete from favorite"
                @click="deleteFav(index, pokemon.pkmName)"
              >
                <XIcon></XIcon>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
// Root

@import '/src/scss/Colors.scss';
@import '/src/scss/Breakpoints.scss';

// Bottom

.fav-container {
  @apply flex justify-center;

  background: #fff;
  height: 100%;
  margin: 32px 16px;

  @include laptop {
    margin-top: 48px;
    margin-bottom: 35px;
  }

  // White Box Wrapper

  .fav-box {
    width: 100%;

    @include laptop {
      width: 800px;
    }

    h2 {
      font-weight: 600;
      color: $Black;
      margin-bottom: 8px;
      overflow-y: hidden;
    }

    // Tags

    .fav-tag {
      .grid-control {
        gap: 8px 24px;

        li {
          border-radius: 4px;
          overflow-y: hidden;

          .fav-item {
            border-radius: 4px;
            color: $Black;
            padding: 8px 16px;
            background: $Tag;

            .name-wrapper {
              // display: inline;
              font-size: 14px;
              line-height: 24px;
              cursor: pointer;
              transition: all 0.2s ease-in-out;

              &:hover {
                font-size: 15px;
              }
            }

            .x-icon {
              right: 6px;
              top: 0;
              bottom: 0;
              margin: auto 0;
              padding: 10px;

              &:hover {
                scale: 1.2;
              }
            }
          }
        }
      }
    }
  }
}

.grid-control {
  display: grid;
  @include mobile {
    @apply grid-cols-1;
  }

  @include laptop {
    @apply grid-cols-2;
  }
}
</style>
