<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Registro</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-label position="floating">Usuario</ion-label>
        <ion-input v-model="userStore.registro.usuario" :class="{ 'ion-invalid': $v.usuario.$error }" />
        <ion-note v-if="$v.usuario.$error" slot="error">Usuario es requerido</ion-note>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input v-model="userStore.registro.email" type="email" :class="{ 'ion-invalid': $v.email.$error }" />
        <ion-note v-if="$v.email.$error" slot="error">Email inválido</ion-note>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Contraseña</ion-label>
        <ion-input v-model="userStore.registro.password" type="password" :class="{ 'ion-invalid': $v.password.$error }" />
        <ion-note v-if="$v.password.$error" slot="error">Contraseña debe tener al menos 6 caracteres</ion-note>
      </ion-item>
      <ion-button expand="full" @click="registrarse" :disabled="$v.$invalid">Registrarse</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
  alertController
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

const router = useRouter();
const userStore = useUserStore();

const rules = {
  usuario: { required },
  email: { required, email },
  password: { required, minLength: minLength(6) }
};

const $v = useVuelidate(rules, userStore.registro);

function registrarse() {
  $v.value.$touch();
  if (!$v.value.$invalid) {
    userStore.$registro().then(response => {
      console.log(response);
      router.push('/tabs/tab1');
    }).catch(error => {
      alertController.create({
        header: 'Error',
        message: error.response.data.message,
        buttons: ['Continuar']
      }).then(alert => alert.present());
    });
  }
}
</script>