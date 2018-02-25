import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu/MainMenu.vue'
import CurrencyList from '@/components/CurrencyList/CurrencyList.vue'
import SignInSignUp from '@/components/SignInSignUp/SignInSignUp.vue'
import {CURRENCY_LIST_ROUTE, LOGIN_ROUTE, SETTINGS_ROUTE} from './routeNames'
import Settings from '../components/Settings/Settings.vue'
import store from '../store'

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
        },
        {
          path: 'settings',
          name: SETTINGS_ROUTE,
          component: Settings,
          beforeEnter: (to, from, next) => {
            if (!store.getters.isUserAuthorized) {
              console.warn(' There is an area for authorized users only!')
              return next(false)
            }
            return next()
          }
        }
      ]
    }
  ]
})
