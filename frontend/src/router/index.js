import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/Home.vue'
import Registre from '../components/Registre.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'Registre',
      component: Registre
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isHomePage = to.path === '/home'

  if (!token && isHomePage) {
    return next('/login')
  }

  next()
})
export default router