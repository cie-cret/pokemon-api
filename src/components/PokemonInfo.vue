<script setup lang="ts">
const props = defineProps<{
  capFirstLetter: (letter?: string) => string
  pokemon?: PokemonData
}>()

import { ref, computed } from 'vue'
import { usePokemonStore } from '@/stores/PokemonStore'
import type { PokemonData } from '@/stores/PokemonStore'

const pokemonStore = usePokemonStore()
const isDisabled = ref(false)

const filteredVersions = computed(() => {
  return pokemonStore.pokemonData.pkmVersion.slice(0, 3)
})

const toggleFav = () => {
  const favButton = document.querySelector('#fav-button') as HTMLButtonElement

  // Prevent spamming
  isDisabled.value = true
  setTimeout(() => {
    isDisabled.value = false
  }, 400)

  // For Animation
  const currentPkmName = pokemonStore.pokemonData.pkmName
  const index = pokemonStore.favPokemonList.findIndex(
    (pokemon: PokemonData) => pokemon.pkmName === currentPkmName,
  )
  const inFavList = pokemonStore.favPokemonList.find(
    (pokemon: PokemonData) => pokemon.pkmName === currentPkmName,
  )

  // Delete
  if (inFavList) {
    if (index !== -1) {
      const favItem = document.querySelector(
        `#fav-item-${index}`,
      ) as HTMLElement
      pokemonStore.isFavorite = false

      // For Animation
      favItem.classList.add('fadeout-animation')
      favButton.classList.toggle('flip-animation')
      setTimeout(() => {
        favItem.classList.remove('fadeout-animation')
        pokemonStore.deleteFavoriteItem(index)
      }, 400)
    }
  }

  // Save
  pokemonStore.saveFavorite()
  if (!pokemonStore.reachLimit) {
    favButton.classList.toggle('flip-animation')
  }
}
</script>

<template>
  <!-- Top Right -->
  <div class="info-wrapper">
    <div class="t-info">
      <div class="heading-name-wrapper">
        <h3>
          {{ props.capFirstLetter(pokemonStore.pokemonData.pkmName) }}
        </h3>
      </div>

      <!-- Favorite Button -->
      <button
        @click="toggleFav"
        id="fav-button"
        :disabled="isDisabled"
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
            :fill="pokemonStore.isFavorite ? '#FFF8DD' : '#F5F7FB'"
          />
          <path
            d="M14.7805 7.82918C15.1397 6.72361 16.7038 6.72361 17.063 7.82918L18.3465 11.7793C18.5072 12.2738 18.9679 12.6085 19.4878 12.6085H23.6412C24.8037 12.6085 25.287 14.0961 24.3466 14.7793L20.9864 17.2207C20.5658 17.5262 20.3898 18.0679 20.5504 18.5623L21.8339 22.5125C22.1931 23.618 20.9278 24.5374 19.9873 23.8541L16.6271 21.4128C16.2065 21.1072 15.637 21.1072 15.2164 21.4128L11.8562 23.8541C10.9158 24.5374 9.65038 23.618 10.0096 22.5125L11.2931 18.5623C11.4537 18.0679 11.2777 17.5262 10.8572 17.2207L7.49696 14.7793C6.5565 14.0961 7.03983 12.6085 8.2023 12.6085H12.3557C12.8756 12.6085 13.3364 12.2738 13.497 11.7793L14.7805 7.82918Z"
            :fill="pokemonStore.isFavorite ? '#FFCB05' : '#D7D9E1'"
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
      <section class="tag-wrapper">
        <ul>
          <li
            v-for="(item, index) in filteredVersions"
            :key="index"
            class="version-tag"
          >
            {{ props.capFirstLetter(item.version.name) }}
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
// Root

@import '/src/scss/Colors.scss';
@import '/src/scss/Breakpoints.scss';

// Right
.info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 100%;

  // Top Right

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
      ul {
        display: flex;
        flex-direction: row;
        gap: 4px;
      }
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

h4 {
  font-size: 12px;
  font-weight: 600;
  line-height: 24px;
  color: $Text;
}
</style>
