<script setup lang="ts">
import { ref } from 'vue'

import SearchIcon from '@/components/icons/SearchIcon.vue'
import XIcon from '@/components/icons/XIcon.vue'

const searchItem = ref<string>('')
// const windowWidth = window.innerWidth

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
    <section class="t-container">
      <!-- Logo -->
      <img src="/pokemon_logo.png" alt="pokemon_logo" id="pokemon-logo" />
      <!-- White box -->
      <div class="search-box">
        <div class="search-container">
          <!-- Search -->
          <div class="search-input relative">
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
          <div class="search-info">
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
          <!-- Window -->
          <ul class="grid-control grid">
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
// Root

$Yellow: #ffcb05;
$Blue: #00729f;
$Text: #6f7794;
$Black: #121419;
$Tag: #dbf5ff;
$Border: #b6bac8;

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
        padding: 8px 16px;
        padding-left: 40px;
        padding-right: 55px;
        font-size: 14px;
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

      @include mobile {
        height: 41.222vh;
        // background: #ffcb05;
      }

      @include laptop {
        height: 202px;
      }
      p {
        color: $Text;
        font-weight: 600;

        @include mobile {
          font-size: 16px;
        }

        @include laptop {
          font-size: 18px;
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
    }

    // Tags

    .fav-tag {
      .grid-control {
        gap: 8px 24px;

        @include mobile {
          @apply grid-cols-1;
        }

        @include laptop {
          @apply grid-cols-2;
        }

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
        font-size: 14px;
        line-height: 24px;
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
