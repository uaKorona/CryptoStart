import axios from 'axios'
import { GET_CURRENCY_LIST } from '../mutation-types'

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
    state.list = currencyList
  }
}

export default {
  state,
  actions,
  mutations
}
