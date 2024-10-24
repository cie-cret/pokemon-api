<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePokemonStore } from '@/stores/PokemonStore'
import axios from 'axios'

import SearchIcon from '@/components/icons/SearchIcon.vue'
import XIcon from '@/components/icons/XIcon.vue'
// import FavIcon from '@/components/icons/FavIcon.vue'

const searchItem = ref<string>('')
const isFavorite = ref<boolean>(false)
const pokemonStore = usePokemonStore()
const filteredVersions = computed(() => {
  return pokemonStore.pokemonData.pkmVersion.slice(0, 3)
})

const capitalizeFirstLetter = (letter: string): string => {
  return letter.charAt(0).toUpperCase() + letter.slice(1)
}

const handleSearch = async (favName?: string) => {
  try {
    if (favName) {
      searchItem.value = capitalizeFirstLetter(favName)
    }
    const pokemonName = searchItem.value.toLowerCase()
    await pokemonStore.loadData(pokemonName)
  } catch (error) {
    console.log('Error Home:', error)
  }
}

const handleEnter = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch()
  }
}

const toggleFav = () => {
  const favButton = document.querySelector('#fav-button')
  pokemonStore.saveFavorite()

  if (!pokemonStore.reachLimit) {
    favButton.classList.toggle('flip-animation')
  }
}

const deleteFav = (index: number, pokemonName: string) => {
  pokemonStore.deleteFavoriteItem(index)

  if (pokemonStore.pokemonData.pkmName === pokemonName) {
    const favButton = document.querySelector('#fav-button')
    favButton.classList.toggle('flip-animation')
  }
}
</script>

<template>
  <main class="main-container">
    <!-- Top -->
    <section class="t-container">
      <!-- Logo -->
      <img src="/pokemon_logo.png" alt="pokemon_logo" id="pokemon-logo" />
      <!-- Hero -->
      <div class="search-box">
        <div class="search-container">
          <!-- Search -->
          <div class="search-input relative">
            <button
              type="submit"
              class="search-icon absolute"
              @click="handleSearch()"
              aria-label="search"
            >
              <SearchIcon></SearchIcon>
            </button>
            <input
              type="search"
              placeholder="Search"
              v-model="searchItem"
              maxlength="50"
              @keyup="handleEnter"
            />
            <p class="alphabet-count absolute">{{ searchItem.length }}/50</p>
          </div>

          <!-- Display -->
          <div class="search-info">
            <!-- Main Screen -->
            <div
              v-if="
                !pokemonStore.pokemonData.pkmName && !pokemonStore.isLoading
              "
            >
              <p v-if="!pokemonStore.hasError">
                Try search for Pokémon by their name
              </p>
              <!-- Error -->
              <p v-else class="error-text">Not Found</p>
            </div>
            <!-- Loading Screen -->
            <div v-else-if="pokemonStore.isLoading" class="loading-wrapper">
              <div class="loading-spinner-wrapper">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.41598 26.9833C4.74727 27.7205 4.4182 28.5867 3.681 28.918C2.94379 29.2493 2.07761 28.9202 1.74632 28.183C0.600507 25.6332 0 22.857 0 20C0 8.95453 8.95453 0 20 0C31.0455 0 40 8.95453 40 20C40 31.0455 31.0455 40 20 40C15.3068 40 10.8594 38.3761 7.30534 35.4561C6.68085 34.9431 6.59052 34.0209 7.10359 33.3964C7.61665 32.7719 8.53882 32.6816 9.16331 33.1947C12.1987 35.6885 15.991 37.0732 20 37.0732C29.429 37.0732 37.0732 29.429 37.0732 20C37.0732 10.571 29.429 2.92683 20 2.92683C10.571 2.92683 2.92683 10.571 2.92683 20C2.92683 22.4415 3.43894 24.8091 4.41598 26.9833Z"
                    fill="#30A7D7"
                  />
                </svg>
              </div>
              <div class="loading-text-wrapper">
                <h3>Sending Request</h3>
                <p>
                  Please wait<span class="dot1">.</span
                  ><span class="dot2">.</span><span class="dot3">.</span>
                </p>
              </div>
            </div>

            <!-- Success -->
            <div v-else class="grid-control result">
              <!-- Left -->
              <div class="artwork-wrapper">
                <img
                  :src="pokemonStore.pokemonData.pkmArtwork"
                  :alt="`${pokemonStore.pokemonData.pkmName} artwork`"
                />
              </div>
              <div class="flex-control">
                <div class="info-wrapper">
                  <!-- Right -->
                  <!-- Top Right -->
                  <div class="t-info">
                    <div class="heading-name-wrapper">
                      <h3>
                        {{
                          capitalizeFirstLetter(
                            pokemonStore.pokemonData.pkmName,
                          )
                        }}
                      </h3>
                    </div>

                    <!-- Favorite Button -->
                    <button
                      @click="toggleFav"
                      id="fav-button"
                      aria-label="save to favorite"
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="32"
                          height="32"
                          rx="16"
                          :fill="
                            pokemonStore.isFavorite ? '#FFF8DD' : '#F5F7FB'
                          "
                        />
                        <path
                          d="M14.7805 7.82918C15.1397 6.72361 16.7038 6.72361 17.063 7.82918L18.3465 11.7793C18.5072 12.2738 18.9679 12.6085 19.4878 12.6085H23.6412C24.8037 12.6085 25.287 14.0961 24.3466 14.7793L20.9864 17.2207C20.5658 17.5262 20.3898 18.0679 20.5504 18.5623L21.8339 22.5125C22.1931 23.618 20.9278 24.5374 19.9873 23.8541L16.6271 21.4128C16.2065 21.1072 15.637 21.1072 15.2164 21.4128L11.8562 23.8541C10.9158 24.5374 9.65038 23.618 10.0096 22.5125L11.2931 18.5623C11.4537 18.0679 11.2777 17.5262 10.8572 17.2207L7.49696 14.7793C6.5565 14.0961 7.03983 12.6085 8.2023 12.6085H12.3557C12.8756 12.6085 13.3364 12.2738 13.497 11.7793L14.7805 7.82918Z"
                          :fill="
                            pokemonStore.isFavorite ? '#FFCB05' : '#D7D9E1'
                          "
                        />
                      </svg>
                    </button>
                  </div>
                  <!-- Mid Right -->
                  <div class="m-info">
                    <div class="mid-info-wrapper">
                      <div class="weight-wrapper">
                        <h4>Weight</h4>
                        <p>{{ pokemonStore.pokemonData.pkmWeight }} kg</p>
                      </div>
                      <div class="height-wrapper">
                        <h4>Height</h4>
                        <p>{{ pokemonStore.pokemonData.pkmHeight }} cm</p>
                      </div>
                    </div>
                  </div>
                  <!-- Bottom Right -->
                  <div class="b-info">
                    <div class="version-wrapper"><h4>Versions</h4></div>
                    <!-- Tags -->
                    <div class="tag-wrapper">
                      <ul
                        v-for="item in filteredVersions"
                        :key="item.game_index"
                      >
                        <li class="version-tag">
                          {{ capitalizeFirstLetter(item.version.name) }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom -->
    <section class="b-container">
      <div class="fav-box">
        <!-- Heading -->
        <div class="heading-wrapper"><h2>Favorite</h2></div>
        <div class="fav-tag">
          <!-- Window -->
          <ul class="grid-control">
            <!-- Tags -->
            <li
              v-for="(pokemon, index) in pokemonStore.favPokemonList"
              :key="pokemon.index"
              class="relative"
            >
              <div class="fav-item">
                <div
                  class="name-wrapper"
                  @click="handleSearch(pokemon.pkmName)"
                >
                  {{ capitalizeFirstLetter(pokemon.pkmName) }}
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
  </main>
</template>

<style scoped lang="scss">
// Root

$Yellow: #ffcb05;
$Blue: #00729f;
$Text: #6f7794;
$Black: #121419;
$Tag: #dbf5ff;
$Border: #b6bac8;
$ImageBg: #f5f7fb;

@mixin mobile {
  @media (min-width: 375px) {
    @content;
  }
}

@mixin laptop {
  @media (min-width: 1280px) {
    @content;
  }
}

@mixin modern-border($pColor, $sColor) {
  background: #fff;
  outline: 2px solid $pColor;
  outline-offset: 1px;
  border: 2px solid $sColor;
  border-radius: 8px;
  box-shadow:
    0 0 0 1px #fff,
    0 4px 8px 0 rgba(46, 46, 46, 0.7);
  box-sizing: content-box;
}

@mixin grid-control {
  @apply grid

  @include mobile {
    @apply grid-cols-1;
  }

  @include laptop {
    @apply grid-cols-2;
  }
}

// SCSS Start Here

// Top

.t-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // height: 73.265vh;

  background: linear-gradient(281.22deg, #0e749d 0%, #30a7d7 100%);

  @include mobile {
    height: 662px;
    padding: 32px 16px;
  }

  @include laptop {
    height: 570px;
    padding: 60px;
  }

  // Moving Animation
  // background-size: 140%;
  // animation: moving-bg 2s linear infinite alternate;

  #pokemon-logo {
    height: 60px;
    object-fit: contain;

    @include mobile {
      margin-bottom: 32px;
    }

    @include laptop {
      margin-bottom: 48px;
    }
  }

  // White Box Wrapper

  .search-box {
    @include modern-border($Yellow, $Blue);

    @include mobile {
      height: 502px;
      width: 339px;
    }

    @include laptop {
      height: 328px;
      width: 658px;
      margin-bottom: 12px;
    }

    // Search Input Wrapper

    .search-container {
      margin: 30px;
    }

    // Input

    .search-input {
      margin-bottom: 24px;

      input {
        width: 100%;
        border: 1px solid $Border;
        border-radius: calc(8px - 2px);
        padding: 7px 16px;
        padding-left: 40px;
        padding-right: 55px;
        font-size: 14px;
        line-height: 24px;

        &:focus {
          outline: 2px solid $Yellow;
        }
      }

      // Search Icon

      .search-icon {
        left: 16px;
        top: 0;
        bottom: 0;
        margin: auto;
      }

      // Alphabet Count

      .alphabet-count {
        color: $Text;
        font-size: 12px;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    // Display

    .search-info {
      @apply flex justify-center items-center;

      overflow-y: hidden;

      @include mobile {
        height: 378px;
      }

      @include laptop {
        height: 202px;
      }

      p {
        color: $Text;
        font-weight: 600;
        overflow-y: hidden;

        @include mobile {
          font-size: 14px;
        }

        @include laptop {
          font-size: 18px;
        }

        &.error-text {
          font-size: 14px;
          color: $Border;
        }
      }

      // Loading Screen

      // Loading Spinner

      .loading-spinner-wrapper {
        margin: 4px;
        justify-self: center;
        margin-bottom: 28px;
        animation: spin 1s linear infinite;
      }

      .loading-text-wrapper {
        line-height: 24px;
        h3 {
          font-weight: 600;
          font-size: 18px;
          color: $Black;
          overflow-y: hidden;
        }

        p {
          font-weight: 400;
          font-size: 14px;
          color: $Text;
          justify-self: center;
          margin-top: 4px;

          span {
            animation: appear 2s linear infinite;
            &.dot1 {
              opacity: 0;
              animation-delay: 0s;
            }
            &.dot2 {
              opacity: 0;
              animation-delay: 0.3s;
            }
            &.dot3 {
              opacity: 0;
              animation-delay: 0.6s;
            }
          }
        }
      }

      // Showing info

      .grid-control {
        animation: showing 0.5s ease-in-out;
        @include mobile {
          gap: 24px;
        }

        @include laptop {
          gap: 36px;
        }

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
      }

      // Right

      .flex-control {
        display: flex;
      }

      .info-wrapper {
        // Top Right
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 100%;

        .t-info {
          display: flex;
          justify-content: space-between;

          #fav-button {
            transform: rotateY(0);
            transition: transform 0.3s;
            &.flip-animation {
              transform: rotateY(180deg);
            }
          }

          h3 {
            color: $Black;
            font-size: 24px;
            font-weight: 600;
            max-height: 32px;
            overflow-y: hidden;
          }
        }
      }

      // Mid Right
      .mid-info-wrapper {
        @apply grid grid-cols-2;

        p {
          font-size: 14px;
          font-weight: 400;
          line-height: 24px;
          color: $Black;
        }
      }

      // Bottom Right

      .b-info {
        @apply flex flex-col;

        .tag-wrapper {
          display: flex;
          flex-direction: row;
          gap: 4px;
        }

        .version-tag {
          background: $Tag;
          border-radius: 10px;
          padding: 1px 8px;
          font-size: 12px;
          font-weight: 600;
        }
      }
    }
  }
}

// Bottom

.b-container {
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
    justify-self: center;

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
              right: 16px;
              top: 0;
              bottom: 0;
              margin: auto 0;

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

// Multiple uses

.grid-control {
  display: grid;
  @include mobile {
    @apply grid-cols-1;
  }

  @include laptop {
    @apply grid-cols-2;
  }
}

h4 {
  font-size: 12px;
  font-weight: 600;
  line-height: 24px;
  color: $Text;
}

@keyframes moving-bg {
  0% {
    background-position: right 0%;
  }
  100% {
    background-position: bottom 100%;
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }

  10% {
    opacity: 1;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes showing {
  0% {
    scale: 0;
  }

  25% {
    scale: 1.1;
  }

  50% {
    scale: 0.9;
  }

  75% {
    scale: 1.05;
  }

  90% {
    scale: 0.99;
  }

  100% {
    scale: 1;
  }
}
</style>
