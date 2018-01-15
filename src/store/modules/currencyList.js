import axios from 'axios'
// import Vue from 'vue'
import {GET_CURRENCY_LIST, MUTATE_FIRST_ITEM} from '../mutation-types'
import currencyListImageHash from './currencyListImageHash'
import Currency from '../../models/Currency'
import {GET_CURRENCY_LIST_ACT} from '../action-types'

const state = {
  list: []
}

const actions = {

  [GET_CURRENCY_LIST_ACT] ({ commit }) {
    axios
      .get('https://api.coinmarketcap.com/v1/ticker/?limit=100')
      .then(response => {
        console.log(response)
        const currencyList = response.data
        commit(GET_CURRENCY_LIST, { currencyList })
      })
  }

}

const getters = {
  getFirstCurrency ({list}) {
    return list[0]
  }
}

const mutations = {
  [GET_CURRENCY_LIST] (state, {currencyList}) {
    state.list = parseCurrencyList(currencyList)
  },
  [MUTATE_FIRST_ITEM] (state) {
    state.list[0].name = null // Modifying en existent object property - ok
    // Vue.set(state.list[0], 'newName', Date.now()) // Adding new object property via Vue.set - ok

    // state.list[0].newName = Date.now() // Adding new object property directly - Error
    // Object.assign(state.list[0], {newName: Date.now()}) // Adding new object property directly - Error
    // state.list[0] = {...state.list[0], newName: Date.now()} // Replace that Object with a fresh one - Error

    state.list.splice(0, 1, {...state.list[0], newName: Date.now()})
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}

function parseCurrencyList (currencyList = []) {
  return currencyList
    .map(currencyData => {
      const currency = new Currency(currencyData)
      currency.imageSrc = currencyListImageHash[currency.id] || null
      return currency
    })
}
