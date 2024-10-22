<script setup lang="ts">
import { ref } from 'vue'

import SearchIcon from '@/components/icons/SearchIcon.vue'
import XIcon from '@/components/icons/XIcon.vue'

const searchItem = ref<string>('')

const handleSearch = () => {
  if (searchItem.value !== '') {
    console.log('Yeah!')
    // Send Request
  }
}

const handleEnter = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch()
    // Send Request
  }
}
</script>

<template>
  <main class="main-container">
    <!-- Top -->
    <section class="t-container flex flex-col">
      <!-- Logo -->
      <img src="/pokemon_logo.png" alt="pokemon_logo" id="pokemon-logo" />
      <!-- White box -->
      <div class="search-box">
        <div class="search-container">
          <!-- Search -->
          <div class="search-input relative flex justify-center">
            <button
              type="submit"
              class="search-icon absolute"
              @click="handleSearch()"
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
          <div class="search-info flex justify-center items-center">
            <p>Try search for Pokémon by their name</p>
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
          <ul class="grid-control grid grid-cols-2">
            <!-- Tags -->
            <li
              v-for="item in ['pikachu', 'eevee', 'raichu']"
              :key="item"
              class="relative"
            >
              {{ item.charAt(0).toUpperCase() + item.slice(1) }}
              <button class="x-icon absolute"><XIcon></XIcon></button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
$Yellow: #ffcb05;
$Blue: #00729f;
$Text: #6f7794;
$Black: #121419;
$Tag: #dbf5ff;
$Border: #b6bac8;

@mixin modern-border($pColor, $sColor) {
  background: #fff;
  outline: 2px solid $pColor;
  outline-offset: 1px;
  border: 2px solid $sColor;
  border-radius: 8px;
  box-shadow:
    0 0 0 1px #fff,
    0 4px 8px 0 rgba(46, 46, 46, 0.7);
}

// Top

.t-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 73.265vh;
  background: linear-gradient(281.22deg, #0e749d 0%, #30a7d7 100%);

  // Moving Animation
  // background-size: 140%;
  // animation: moving-bg 2s linear infinite alternate;

  #pokemon-logo {
    height: 60px;
    object-fit: contain;
    margin: 24px; // 1.5rem?
  }

  // White Box Wrapper

  .search-box {
    @include modern-border($Yellow, $Blue);
    height: 332px;
    width: 664px;
    margin: 24px;

    // Search Input Wrapper

    .search-container {
      margin: 32px;
      height: 100%;
    }

    // Input

    .search-input {
      margin-bottom: 24px;
      input {
        width: 100%;
        border: 1px solid $Border;
        border-radius: calc(8px - 2px);
        padding: 8px 16px;
        padding-left: 40px;
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
      color: $Text;
      font-weight: 600;
      height: 202px;
    }
  }
}

// Bottom

.b-container {
  background: #fff;
  height: 100%;

  // White Box Wrapper

  .fav-box {
    margin-top: 48px;
    width: 800px;
    justify-self: center;

    h2 {
      font-weight: 600;
      color: $Black;
    }

    // Tags

    .fav-tag {
      .grid-control {
        margin: 8px 0;
        gap: 8px 24px;

        .x-icon {
          right: 16px;
          top: 0;
          bottom: 0;
          margin: auto 0;
        }
      }

      li {
        background: $Tag;
        border-radius: 4px;
        color: $Black;
        padding: 8px 16px;
      }
    }
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
</style>
