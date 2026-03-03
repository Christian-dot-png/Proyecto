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

      <div v-if="imageSrc">
        <img :src="imageSrc" alt="Taken picture" style="margin-top: 16px; max-width: 100%;" />
      </div>

      <pre v-if="imageInfo" style="margin-top: 16px;">
{{ imageInfo }}
      </pre>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from '@ionic/vue'

import { Camera, CameraResultType, type Photo } from '@capacitor/camera'

const imageSrc = ref<string | undefined>()
const imageInfo = ref<Photo | undefined>()

const takePicture = async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    })

    imageSrc.value = image.webPath
    imageInfo.value = image

  } catch (error) {
    console.error('Error al tomar la foto:', error)
  }
}
</script>