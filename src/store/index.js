import Vue from 'vue'
import Vuex from 'vuex'
import currencyList from './modules/currencyList.store'

Vue.use(Vuex)

// eslint-disable-next-line
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    currencyList
  },
  strict: true
})
