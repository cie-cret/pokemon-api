// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'

// "official-artwork": {
//   "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemonRawData: [{}],
    favPokemon: [{}],
  }),
  actions: {
    async loadData(pokemonName: string) {
      try {
        const response = await axios.get(`${BASE_URL}/${pokemonName}`)
        this.pokemonRawData = response.data

        const convertedData = {
          pkmName: this.pokemonRawData.name,
          pkmWeight: this.pokemonRawData.weight,
          pkmHeight: this.pokemonRawData.height,
          pkmArtwork:
            this.pokemonRawData.sprites.other['official-artwork'].front_default,
          pkmVersion: this.pokemonRawData.game_indices,
        }

        this.pokemonRawData = convertedData
        // console.log(this.pokemonRawData)
        return this.pokemonRawData
      } catch (error) {
        console.log('Error Store:', error)
      }
    },
  },
})
