import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue'
import { useUserStore } from '@/stores/user'

const Login = () => import('@/views/Login.vue')
const Registro = () => import('@/views/Registro.vue')
const Seccion1 = () => import('@/views/secciones/seccion1.vue')
const Seccion = () => import('@/views/secciones/seccion.vue')
const Camera = () => import('@/views/secciones/Camara.vue')

const routes: Array<RouteRecordRaw> = [

{
path: '/',
redirect: '/login'
},

{
path: '/login',
name: 'Login',
component: Login,
meta: { requiresAuth: false }
},

{
path: '/registro',
name: 'Registro',
component: Registro,
meta: { requiresAuth: false }
},

{
path: '/camara',
name: 'Camara',
component: Camera,
meta: { requiresAuth: false }  // 👈 importante
},

{
path: '/seccion',
component: BaseLayout,
meta: { requiresAuth: true },
children: [

{
path: '',
redirect: '/seccion/seccion1'
},

{
path: 'seccion1',
name: 'Seccion1',
component: Seccion1
},

{
path: ':name',
name: 'Seccion',
component: Seccion
}

]
}

]

const router = createRouter({
history: createWebHistory(),
routes
})

router.beforeEach((to, from, next) => {

const userStore = useUserStore()
const isAuthenticated = !!userStore.authToken

// si requiere login y no está logueado
if (to.meta.requiresAuth && !isAuthenticated) {
next('/login')
return
}

// si está logueado y entra a login o registro
if (isAuthenticated && (to.name === 'Login' || to.name === 'Registro')) {
next('/seccion/seccion1')
return
}

next()

})

export default router