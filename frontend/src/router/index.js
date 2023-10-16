import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/Home.vue'
import Registre from '../components/Registre.vue'
import Login from '../components/Login.vue'

Vue.use(Router)

export default new Router({
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
