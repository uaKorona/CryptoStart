import Vue from 'vue'
import Router from 'vue-router'
import CurrencyList from '@/components/CurrencyList/CurrencyList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CurrencyList',
      component: CurrencyList
    }
  ]
})
