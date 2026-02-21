import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {

  const chuckNorris = ref({
    icon_url: null,
    value: null
  })

  const registro = ref({
    usuario: '',
    email: '',
    password: ''
  })

  async function getChisteChuckNorris() {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/random')
      chuckNorris.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  async function $registro() {
  
    console.log('Registrando usuario:', registro.value)
    return { data: { message: 'Registro exitoso' } }
  }

  return {
    chuckNorris,
    registro,
    getChisteChuckNorris,
    $registro
  }
})

