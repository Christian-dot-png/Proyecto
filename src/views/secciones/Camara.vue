<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Camera</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- Botones -->
      <div class="buttons-container">
        <ion-button color="primary" @click="takePicture">
          Take Picture
        </ion-button>

        <ion-button color="success" @click="openCamera">
          Open Camera
        </ion-button>
      </div>

      <!-- Cámara -->
      <div v-if="cameraActive" class="camera-box">
        <video
          ref="video"
          autoplay
          playsinline
          class="camera-video"
        ></video>

        <ion-button
          color="danger"
          class="capture-btn"
          @click="capturePhoto"
        >
          Capture Photo
        </ion-button>
      </div>

      <!-- Imagen -->
      <div v-if="imageSrc" class="image-box">
        <img :src="imageSrc" />
      </div>

      <canvas ref="canvas" style="display:none;"></canvas>

      <pre v-if="imageInfo" class="info">
{{ imageInfo }}
      </pre>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import { ref, nextTick } from 'vue'

import {
IonPage,
IonHeader,
IonToolbar,
IonTitle,
IonContent,
IonButton
} from '@ionic/vue'

import {
Camera,
CameraResultType,
CameraSource
} from '@capacitor/camera'

const imageSrc = ref<string>()
const imageInfo = ref<any>()

const video = ref<HTMLVideoElement>()
const canvas = ref<HTMLCanvasElement>()

const cameraActive = ref(false)

let stream: MediaStream | null = null


//  Foto con Capacitor
const takePicture = async () => {

  const image = await Camera.getPhoto({
    quality: 90,
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera
  })

  imageSrc.value = image.webPath
  imageInfo.value = image

}


//  Abrir cámara web
const openCamera = async () => {

  stream = await navigator.mediaDevices.getUserMedia({
    video: true
  })

  cameraActive.value = true

  await nextTick()

  if (video.value) video.value.srcObject = stream

}


//  Capturar foto
const capturePhoto = async () => {

  if (!video.value || !canvas.value) return

  const ctx = canvas.value.getContext('2d')!

  canvas.value.width = video.value.videoWidth
  canvas.value.height = video.value.videoHeight

  ctx.drawImage(video.value,0,0)

  const blob: Blob = await new Promise(r =>
    canvas.value!.toBlob(b => r(b!), 'image/png')
  )

  const url = URL.createObjectURL(blob)

  imageSrc.value = url
  imageInfo.value = { webPath: url, format: "png" }

  stream?.getTracks().forEach(t => t.stop())
  cameraActive.value = false

}

</script>

<style scoped>

.buttons-container{
  display:flex;
  gap:10px;
  margin-bottom:20px;
}

.camera-box{
  width:50%;
  margin-top:20px;
}

.camera-video{
  width:100%;
  border-radius:10px;
  border:2px solid #444;
}

.capture-btn{
  margin-top:10px;
}

.image-box img{
  margin-top:20px;
  max-width:50%;
  border-radius:10px;
}

.info{
  margin-top:20px;
  font-size:12px;
}

</style>