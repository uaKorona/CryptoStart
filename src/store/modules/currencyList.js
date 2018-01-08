import axios from 'axios'
import { GET_CURRENCY_LIST } from '../mutation-types'
import currencyListImageHash from './currencyListImageHash'
import Currency from '../../models/Currency'

const state = {
  list: []
}

const actions = {

  getCurrencyList ({ commit }) {
    axios
      .get('https://api.coinmarketcap.com/v1/ticker/?limit=100')
      .then(response => {
        console.log(response)
        const currencyList = response.data
        commit(GET_CURRENCY_LIST, { currencyList })
      })
  }

}

const mutations = {
  [GET_CURRENCY_LIST] (state, {currencyList}) {
    state.list = parseCurrencyList(currencyList)
  }
}

export default {
  state,
  actions,
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
