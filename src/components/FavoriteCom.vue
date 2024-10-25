<script setup lang="ts">
const props = defineProps<{
  searchItem: string
  handleSearch: (favName?: string) => void
  capFirstLetter: (letter?: string) => string
}>()

import { ref, defineEmits } from 'vue'
import { usePokemonStore } from '@/stores/PokemonStore'

import XIcon from '@/components/icons/XIcon.vue'

const emit = defineEmits(['sendFavName'])
const pokemonStore = usePokemonStore()
const isDisabled = ref(false)

const deleteFav = (index: number, pokemonName: string) => {
  const favButton = document.querySelector('#fav-button') as HTMLButtonElement
  const favItem = document.querySelector(`#fav-item-${index}`) as HTMLElement

  // Prevent spamming
  isDisabled.value = true
  setTimeout(() => {
    isDisabled.value = false
  }, 400)

  // For Animation
  favItem.classList.add('fadeout-animation')
  setTimeout(() => {
    favItem.classList.remove('fadeout-animation')
    pokemonStore.deleteFavoriteItem(index)
  }, 400)

  // If user perform deletion while the pokemon is on display
  if (pokemonStore.pokemonData.pkmName === pokemonName) {
    setTimeout(() => {
      favButton.classList.toggle('flip-animation')
    }, 400)
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
            :id="`fav-item-${index}`"
          >
            <div class="fav-item">
              <div
                class="name-wrapper"
                @click="
                  () => {
                    props.handleSearch(pokemon.pkmName)
                    emit('sendFavName', pokemon.pkmName)
                  }
                "
              >
                {{ capFirstLetter(pokemon.pkmName) }}
              </div>
              <button
                class="x-icon absolute"
                aria-label="delete from favorite"
                :disabled="isDisabled"
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

.heading-wrapper {
  padding: 0 8px;
}

.fav-container {
  @apply flex justify-center;

  background: #fff;
  height: 100%;
  margin: 32px 16px;
  border-radius: 4px;

  @include laptop {
    margin-top: 48px;
    margin-bottom: 35px;
  }

  // White Box Wrapper

  .fav-box {
    width: 100%;

    @include laptop {
      width: 816px;
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
        overflow-y: hidden;
        padding: 0 8px;

        li {
          border-radius: 4px;
          animation: showing2 0.5s ease-in-out;
          overflow-y: hidden;

          &.fadeout-animation {
            animation: fadeout 0.5s ease-in-out;
            overflow-y: hidden;
          }

          .fav-item {
            border-radius: 4px;
            color: $Black;
            padding: 8px 16px;
            background: $Tag;

            .name-wrapper {
              font-size: 14px;
              line-height: 24px;
              overflow-y: hidden;
              cursor: pointer;
              transition:
                font-weight 0.1s ease-in-out,
                font-size 0.2s ease-in-out;

              &:hover {
                font-weight: 600;
                font-size: 16px;
              }
            }

            .x-icon {
              right: 6px;
              top: 0;
              bottom: 0;
              margin: auto 0;
              padding: 10px;
              transition: all 0.2s ease-in-out;

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

@keyframes showing2 {
  0% {
    scale: 0;
  }

  33% {
    scale: 1.05;
  }

  66% {
    scale: 0.95;
  }

  100% {
    scale: 1;
  }
}

@keyframes fadeout {
  0% {
    scale: 1;
  }

  50% {
    scale: 1.05;
  }

  100% {
    scale: 0;
  }
}
</style>
