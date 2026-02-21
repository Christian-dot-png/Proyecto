<template>
  <div style="padding:40px; text-align:center">

    <h1>Chiste de Chuck Norris</h1>

    <button @click="cargarChiste">
      Obtener Chiste
    </button>

    <div v-if="store.chuckNorris.value" style="margin-top:20px">
      <img 
        :src="store.chuckNorris.icon_url"
        width="120"
      />

      <p style="margin-top:15px">
        {{ store.chuckNorris.value }}
      </p>
    </div>

    <div v-else>
      Presiona el botón para ver un chiste
    </div>

  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'

const store = useUserStore()

function cargarChiste() {
  store.getChisteChuckNorris()
}
</script>
