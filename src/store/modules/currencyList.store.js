import axios from 'axios'
import {GET_CURRENCY_LIST, MUTATE_FIRST_ITEM, UPDATE_CURRENCY_LIST_BY_BINANCE} from '../mutation-types'
import currencyListImageHash from './currencyListImageHash'
import Currency from '../../models/Currency'
import {GET_CURRENCY_LIST_ACT, GET_CURRENCY_LIST_BINANCE_ACT} from '../action-types'
import BCoinSimple from '../../models/BCoinSimple'

const state = {
  list: []
}

const actions = {

  [GET_CURRENCY_LIST_ACT] ({ commit }) {
    axios
      .get('https://api.coinmarketcap.com/v1/ticker/?limit=100')
      .then(response => {
        const currencyList = response.data
        commit(GET_CURRENCY_LIST, { currencyList })
      })
  },

  [GET_CURRENCY_LIST_BINANCE_ACT] ({ commit }) {
    axios
      .get('/binance/api/v3/ticker/price')
      .then(response => {
        console.log(response)
        const binanceHash = getHashFromBinanceList(response.data || [])
        commit(UPDATE_CURRENCY_LIST_BY_BINANCE, { binanceHash })
      })
      .catch((err) => {
        console.log(err)
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
  },
  [UPDATE_CURRENCY_LIST_BY_BINANCE] (state, {binanceHash = {}}) {
    state.list.forEach(coin => {
      const btcSymbol = coin.symbol + 'BTC'
      const ethSymbol = coin.symbol + 'ETH'
      const isFound = !!(binanceHash[btcSymbol] || binanceHash[ethSymbol])
      coin.isOnBinance = isFound
    })
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

function getHashFromBinanceList (binanceList = []) {
  const hash = {}
  binanceList
    .forEach(bCoin => {
      hash[bCoin.symbol] = new BCoinSimple(bCoin)
    })
  return hash
}
