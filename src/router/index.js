import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu/MainMenu.vue'
import CurrencyList from '@/components/CurrencyList/CurrencyList.vue'
import SignInSignUp from '@/components/SignInSignUp/SignInSignUp.vue'
import {CURRENCY_LIST_ROUTE, LOGIN_ROUTE} from './routeNames'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MainMenu,
      children: [
        {
          path: '',
          name: CURRENCY_LIST_ROUTE,
          component: CurrencyList
        },
        {
          path: 'login',
          name: LOGIN_ROUTE,
          component: SignInSignUp
        }
      ]
    }
  ]
})
