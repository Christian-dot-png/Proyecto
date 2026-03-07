<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Camera</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-button @click="takePicture">
        Take Picture
      </ion-button>

      <ion-button @click="openCamera" color="success">
        Open Camera
      </ion-button>

      <div v-if="cameraActive" style="margin-top:16px;">
        <video ref="video" autoplay playsinline width="300"></video>
        <br><br>
        <ion-button @click="capturePhoto" color="danger">
          Capture Photo
        </ion-button>
      </div>

      <div v-if="imageSrc">
        <img :src="imageSrc" style="margin-top:16px; max-width:100%;" />
      </div>

      <canvas ref="canvas" style="display:none;"></canvas>

      <pre v-if="imageInfo" style="margin-top:16px;">
{{ imageInfo }}
      </pre>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonButton } from '@ionic/vue'
import { Camera, CameraResultType } from '@capacitor/camera'

const imageSrc = ref<string>()
const imageInfo = ref<any>()
const video = ref<HTMLVideoElement>()
const canvas = ref<HTMLCanvasElement>()
const cameraActive = ref(false)

let stream: MediaStream | null = null

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  })
  imageSrc.value = image.webPath
  imageInfo.value = image
}

const openCamera = async () => {
  stream = await navigator.mediaDevices.getUserMedia({ video: true })
  cameraActive.value = true
  await nextTick()
  if (video.value) video.value.srcObject = stream
}

const capturePhoto = async () => {
  if (!video.value || !canvas.value) return

  const ctx = canvas.value.getContext('2d')!
  canvas.value.width = video.value.videoWidth / 2
  canvas.value.height = video.value.videoHeight / 2

  ctx.drawImage(video.value,0,0,video.value.videoWidth,video.value.videoHeight,0,0,canvas.value.width,canvas.value.height)

  const blob: Blob = await new Promise(r => canvas.value!.toBlob(b => r(b!), 'image/png'))
  const url = URL.createObjectURL(blob)

  imageSrc.value = url
  imageInfo.value = { webPath: url, format: "png" }

  stream?.getTracks().forEach(t => t.stop())
  cameraActive.value = false
}
</script>