<template>

<ion-page>

<ion-header>
<ion-toolbar>

<ion-title>Registro</ion-title>

<ion-buttons slot="end">
<ion-button fill="solid" @click="router.push({ name: 'Login' })">
Login
</ion-button>
</ion-buttons>

</ion-toolbar>
</ion-header>

<ion-content class="ion-padding">

<ion-item lines="none">
<ion-input
label="Usuario"
label-placement="floating"
fill="outline"
v-model="userStore.registro.usuario">
</ion-input>
</ion-item>

<ion-item lines="none">
<ion-input
label="Email"
label-placement="floating"
fill="outline"
v-model="userStore.registro.email">
</ion-input>
</ion-item>

<ion-item lines="none">
<ion-input
label="Contraseña"
type="password"
label-placement="floating"
fill="outline"
v-model="userStore.registro.password">
</ion-input>
</ion-item>

<ion-item lines="none">

<ion-button
slot="end"
@click="handleRegister"
:disabled="loading">

<span v-if="!loading">Registrarse</span>
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

function handleRegister(){

loading.value = true

userStore.$registro()

.then(()=>{

loading.value = false

alertController.create({
header:'Registro exitoso',
message:'Ahora puedes iniciar sesión',
buttons:['Continuar']
}).then(a=>{
a.present()
router.push('/login')
})

})

.catch(error=>{

loading.value = false

alertController.create({
header:'Error',
message:error.response?.data?.message || 'Error en registro',
buttons:['Aceptar']
}).then(a=>a.present())

})

}

</script>