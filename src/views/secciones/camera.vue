<template>
  <div class="camara">
    <h1>Cámara</h1>
    <video autoplay playsinline></video>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(async () => {
  const video = document.querySelector('video') as HTMLVideoElement
  if (navigator.mediaDevices.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video:true })
      video.srcObject = stream
    } catch(err) {
      console.error('Error al acceder a la cámara', err)
    }
  }
})
</script>

<style scoped>
.camara { text-align:center; margin-top:50px; }
video { width:80%; max-width:600px; border:1px solid #ccc; border-radius:8px; margin-top:20px; }
</style>
