// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    isLoading: false,
    hasError: false,
    isFavorite: false,
    reachLimit: false,
    pokemonData: {},
    favPokemonList: JSON.parse(localStorage.getItem('favorite-save')) || [],
  }),
  actions: {
    async loadData(pokemonName: string) {
      try {
        this.isLoading = true
        const response = await axios.get(`${BASE_URL}/${pokemonName}`)
        const rawData = response.data

        const convertedData = {
          pkmName: rawData.name,
          pkmWeight: rawData.weight / 10, // kg
          pkmHeight: rawData.height * 10, // cm
          pkmArtwork: rawData.sprites.other['official-artwork'].front_default,
          pkmVersion: rawData.game_indices,
        }

        this.pokemonData = convertedData

        // Check Favorite
        const existingIndex = this.getFavoriteIndex(this.pokemonData.pkmName)

        if (existingIndex === -1) {
          this.isFavorite = false
        } else {
          this.isFavorite = true
        }

        // console.log(this.pokemonData)
        return this.pokemonData
      } catch (error) {
        this.hasError = true
        setTimeout(() => (this.hasError = false), 5000)
        console.log('Store Error:', error.status)
      } finally {
        // this.isLoading = false
        setTimeout(() => (this.isLoading = false), 1000)
      }
    },
    saveFavorite() {
      const existingIndex = this.getFavoriteIndex(this.pokemonData.pkmName)
      const numberOfFavs = Object.keys(this.favPokemonList).length // REVISE HERE

      if (existingIndex === -1) {
        if (numberOfFavs < 4) {
          this.reachLimit = false
          this.favPokemonList.push(this.pokemonData)
          this.isFavorite = true
        } else {
          this.reachLimit = true
          alert('Limit up to 4 Pokémons')
        }
      } else {
        this.favPokemonList.splice(existingIndex, 1)
        this.isFavorite = false
      }

      localStorage.setItem('favorite-save', JSON.stringify(this.favPokemonList))
    },
    getFavoriteIndex(pokemonName: string) {
      return this.favPokemonList.findIndex(
        pokemon => pokemon.pkmName === pokemonName,
      )
    },
    deleteFavoriteItem(index: number) {
      this.favPokemonList.splice(index, 1)
      localStorage.setItem('favorite-save', JSON.stringify(this.favPokemonList))

      // For Animation
      const existingIndex = this.getFavoriteIndex(this.pokemonData.pkmName)

      if (existingIndex === -1) {
        this.isFavorite = false
      } else {
        this.isFavorite = true
      }
    },
  },
})
