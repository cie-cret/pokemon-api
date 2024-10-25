// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL

export interface Version {
  version: {
    name: string
  }
}

export interface PokemonData {
  pkmName: string
  pkmWeight: number
  pkmHeight: number
  pkmArtwork: string
  pkmVersion: Version[] // Adjust the type if needed
}

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    isLoading: false,
    hasError: false,
    isFavorite: false,
    reachLimit: false,
    pokemonData: {} as PokemonData,
    favPokemonList:
      JSON.parse(localStorage.getItem('favorite-save') as string) || [],
  }),
  actions: {
    async loadData(pokemonName: string) {
      try {
        this.hasError = false
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

        return this.pokemonData
      } catch (error) {
        this.hasError = true
        // setTimeout(() => (this.hasError = false), 5000)
        console.log('Store Error:', error)
      } finally {
        this.isLoading = false
        // setTimeout(() => (this.isLoading = false), 1000)
      }
    },
    saveFavorite() {
      const favoriteSave = localStorage.getItem('favorite-save')
      this.favPokemonList = favoriteSave ? JSON.parse(favoriteSave) : []

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
        (pokemon: PokemonData) => pokemon.pkmName === pokemonName,
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
