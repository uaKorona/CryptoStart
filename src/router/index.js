import Vue from 'vue'
import Router from 'vue-router'
import CurrencyList from '@/components/CurrencyList/CurrencyList.vue'
import SignInSignUp from '@/components/SignInSignUp/SignInSignUp.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CurrencyList',
      component: CurrencyList
    },
    {
      path: '/login',
      name: 'Login',
      component: SignInSignUp
    }
  ]
})
