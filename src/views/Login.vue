<template>

<ion-page>

<ion-header>
<ion-toolbar>

<ion-title>Login</ion-title>

<ion-buttons slot="end">
<ion-button fill="solid" @click="router.push({ name: 'Registro' })">
Registrarse
</ion-button>
</ion-buttons>

</ion-toolbar>
</ion-header>

<ion-content class="ion-padding">

<ion-item lines="none">
<ion-input
label="Usuario"
:disabled="loading"
label-placement="floating"
fill="outline"
v-model="userStore.login.username">
</ion-input>
</ion-item>

<ion-item lines="none">
<ion-input
label="Contraseña"
:disabled="loading"
label-placement="floating"
fill="outline"
type="password"
v-model="userStore.login.password"
@keyup.enter="handleLogin">
</ion-input>
</ion-item>

<ion-item lines="none">

<ion-button
slot="end"
@click="handleLogin"
:disabled="loading">

<span v-if="!loading">Ingresar</span>
<ion-spinner v-if="loading"></ion-spinner>

</ion-button>

</ion-item>

</ion-content>

</ion-page>

</template>

<script setup lang="ts">

import {
IonPage,
IonHeader,
IonToolbar,
IonTitle,
IonContent,
IonItem,
IonInput,
IonButton,
IonButtons,
IonSpinner,
alertController
} from '@ionic/vue'

import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)

function handleLogin(){

loading.value = true

userStore.$login()

.then(()=>{

loading.value = false

router.push('/seccion/seccion1')

})

.catch(error=>{

loading.value = false

alertController.create({
header:'Error',
message:error.response?.data?.message || 'Error al iniciar sesión',
buttons:['Aceptar']
}).then(a=>a.present())

})

}

</script>