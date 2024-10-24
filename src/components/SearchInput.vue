<script setup lang="ts">
const props = defineProps<{
  handleSearch: (favName?: string) => void
}>()

import { ref, defineEmits } from 'vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'

const searchItem = ref<string>('')
const emit = defineEmits(['updateSearchItem'])
const emitSearchItem = () => {
  emit('updateSearchItem', searchItem.value)
}

const handleEnter = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    props.handleSearch()
  }
}
</script>

<template>
  <div class="search-input relative">
    <button
      type="submit"
      class="search-icon absolute"
      @click="props.handleSearch()"
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
      @input="emitSearchItem"
    />
    <p class="alphabet-count absolute">{{ searchItem.length }}/50</p>
  </div>
</template>

<style scoped lang="scss">
// Root

@import '/src/scss/Colors.scss';
@import '/src/scss/Breakpoints.scss';

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
    left: 6px;
    top: 0;
    bottom: 0;
    margin: auto;
    padding: 10px;
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
</style>
