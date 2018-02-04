import User from '../../models/User'
import {SET_USER_AUTHORIZED, SET_USER_NONAUTHORIZED} from '../mutation-types'
import {LOGIN_USER_ACT} from '../action-types'
import userList from './userList'

const state = {
  user: new User({})
}

const getters = {
  isUserAuthorized ({user}) {
    return user.isUserAuthorized()
  }
}

const mutations = {
  [SET_USER_AUTHORIZED] (state) {
    state.user.setAuthorized()
  },
  [SET_USER_NONAUTHORIZED] (state) {
    state.user.setNonAuthorized()
  }
}

const actions = {
  [LOGIN_USER_ACT] ({ commit }, { userId, userPassword }) {
    const foundUser = userList.find(user => user.id === userId)

    if (!foundUser) {
      return Promise.reject(new Error('User is not found.'))
    }

    if (foundUser.password !== userPassword) {
      return Promise.reject(new Error('Password is invalid.'))
    }

    commit(SET_USER_AUTHORIZED)
    return Promise.resolve()
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
