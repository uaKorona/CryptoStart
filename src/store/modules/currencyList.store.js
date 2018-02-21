import axios from 'axios'
import {GET_CURRENCY_LIST, MUTATE_FIRST_ITEM, UPDATE_CURRENCY_LIST_BY_BINANCE, APPEND_TO_CURRENCY_LIST} from '../mutation-types'
import currencyListImageHash from './currencyListImageHash'
import Currency from '../../models/Currency'
import {GET_CURRENCY_LIST_ACT, GET_CURRENCY_LIST_BINANCE_ACT, APPEND_TO_CURRENCY_LIST_ACT} from '../action-types'
import BCoinSimple from '../../models/BCoinSimple'
import {asyncSetTimeout} from '../../common/mixins/AsyncSetTimeout'

const state = {
  list: []
}

const actions = {

  async [GET_CURRENCY_LIST_ACT] ({ commit, dispatch, state }) {
    if (state.list.length) {
      return Promise.resolve()
    }
    const url = getCoinmarketUrl()
    const currencyList = await doCoinmarketRequest(url)
    commit(GET_CURRENCY_LIST, { currencyList })

    const delay = 300
    setTimeout(async () => {
      await dispatch(APPEND_TO_CURRENCY_LIST_ACT)
      await asyncSetTimeout(delay)
      await dispatch(APPEND_TO_CURRENCY_LIST_ACT)
      await asyncSetTimeout(delay)
      await dispatch(GET_CURRENCY_LIST_BINANCE_ACT)
    }, delay)
  },

  async [APPEND_TO_CURRENCY_LIST_ACT] ({ commit, state }) {
    const url = getCoinmarketUrl(state.list.length)
    const currencyListUpdate = await doCoinmarketRequest(url)
    commit(APPEND_TO_CURRENCY_LIST, { currencyListUpdate })
  },

  [GET_CURRENCY_LIST_BINANCE_ACT] ({ commit }) {
    axios
      .get('/binance/api/v3/ticker/price')
      .then(response => {
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
  [APPEND_TO_CURRENCY_LIST] (state, {currencyListUpdate}) {
    parseCurrencyList(currencyListUpdate)
      .forEach(coin => state.list.push(coin))
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
      coin.isOnBinance = !!(binanceHash[btcSymbol] || binanceHash[ethSymbol])
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

function getCoinmarketUrl (start) {
  const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=100'
  if (start && parseInt(start)) {
    return url + '&start=' + (+start + 1)
  }
  return url
}

async function doCoinmarketRequest (url) {
  const response = await axios.get(url)
  return response.data
}
