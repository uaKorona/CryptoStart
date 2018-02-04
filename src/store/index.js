import Vue from 'vue'
import Vuex from 'vuex'
import currencyList from './modules/currencyList.store'
import user from './modules/user.store'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    currencyList,
    user
  },
  strict: debug
})
