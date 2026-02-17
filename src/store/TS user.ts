import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {

  const chuckNorris = ref({
    icon_url: null,
    value: null
  })

  async function getChisteChuckNorris() {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/random')
      chuckNorris.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  return {
    chuckNorris,
    getChisteChuckNorris
  }
})

