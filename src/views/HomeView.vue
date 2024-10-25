<script setup lang="ts">
import { ref } from 'vue'
import { usePokemonStore } from '@/stores/PokemonStore'

import SearchInput from '@/components/SearchInput.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import ArtworkCom from '@/components/ArtworkCom.vue'
import PokemonInfo from '@/components/PokemonInfo.vue'
import FavoriteCom from '@/components/FavoriteCom.vue'

const searchItem = ref<string>('')
const pokemonStore = usePokemonStore()

const capFirstLetter = (letter?: string): string => {
  if (!letter) {
    return ''
  }

  return letter.charAt(0).toUpperCase() + letter.slice(1)
}

const handleSearch = async (favName?: string) => {
  try {
    if (favName) {
      searchItem.value = capFirstLetter(favName)
    }

    const pokemonName = searchItem.value.toLowerCase()
    await pokemonStore.loadData(pokemonName)
  } catch (error) {
    console.log('Error Home:', error)
  }
}

const sendUserInput = (userInput: string) => {
  searchItem.value = userInput
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
          <!-- Search Bar -->
          <SearchInput
            :SearchItem="searchItem"
            :handleSearch="handleSearch"
            @sendUserInput="sendUserInput"
          ></SearchInput>

          <!-- Display -->
          <div class="search-info">
            <!-- Main Screen -->
            <div
              v-if="
                !pokemonStore.pokemonData.pkmName && !pokemonStore.isLoading
              "
            >
              <!--? Main Message -->
              <p v-if="!pokemonStore.hasError">
                Try search for Pokémon by their name
              </p>
              <!--? Error Message -->
              <p v-else class="error-text">Not Found</p>
            </div>

            <!-- Loading Screen -->
            <div v-else-if="pokemonStore.isLoading" class="loading-wrapper">
              <LoadingScreen></LoadingScreen>
            </div>

            <!-- Result -->
            <div v-else class="result">
              <!-- Error Message -->
              <p v-if="pokemonStore.hasError" class="error-text">Not Found</p>
              <!-- Success -->
              <div v-else class="grid-control">
                <!--? Left -->
                <ArtworkCom></ArtworkCom>
                <!--? Right -->
                <PokemonInfo :capFirstLetter="capFirstLetter"></PokemonInfo>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom -->
    <FavoriteCom
      :searchItem="searchItem"
      :handleSearch="handleSearch"
      :capFirstLetter="capFirstLetter"
      @sendFavName="handleSearch"
    ></FavoriteCom>
  </main>
</template>

<style scoped lang="scss">
// Root

@import '/src/scss/Colors.scss';
@import '/src/scss/Breakpoints.scss';

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

    .loading-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    // Showing info

    .result {
      overflow-y: hidden;
      .grid-control {
        animation: showing 0.5s ease-in-out;

        @include mobile {
          gap: 24px;
        }

        @include laptop {
          gap: 36px;
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

@keyframes moving-bg {
  0% {
    background-position: right 0%;
  }
  100% {
    background-position: bottom 100%;
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
