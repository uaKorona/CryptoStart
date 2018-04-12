import User from '../../models/User'
import {SET_USER_AUTHORIZED, SET_USER_NONAUTHORIZED, ADD_NEW_USER} from '../mutation-types'
import {LOGIN_USER_ACT, REGISTER_USER_ACT, LOGOUT_USER_ACT} from '../action-types'
import userList from './userList'

const state = {
  user: new User(),
  userList: userList
}

const getters = {
  isUserAuthorized ({user}) {
    return user.isUserAuthorized()
  },
  getMaxUserId ({userList}) {
    const ids = userList.map(user => +user.id)
    return Math.max.apply(null, ids)
  },
  currentUser ({user}) {
    return user
  }
}

const mutations = {
  [SET_USER_AUTHORIZED] (state, foundUser) {
    const update = new User(foundUser)
    update.setAuthorized()
    state.user = update
  },
  [SET_USER_NONAUTHORIZED] (state) {
    state.user = new User()
  },
  [ADD_NEW_USER] (state, newUser) {
    state.userList.push(newUser)
  }
}

const actions = {

  async [LOGIN_USER_ACT] ({ state, commit }, { userId, userPassword }) {
    const foundUser = state.userList.find(user => user.id === userId)

    if (!foundUser) {
      return rejectError('User is not found.')
    }

    if (foundUser.password !== userPassword) {
      return rejectError('Password is invalid.')
    }

    commit(SET_USER_AUTHORIZED, foundUser)
    return Promise.resolve()
  },

  async [REGISTER_USER_ACT] ({state, commit, getters, dispatch}, { name, password }) {
    const foundUser = state.userList.find(user => user.name === name)

    if (foundUser) {
      return rejectError('User with that name has already registered')
    }

    const id = User.createUserId(getters.getMaxUserId)
    commit(ADD_NEW_USER, new User({ id, name, password }))

    return dispatch(LOGIN_USER_ACT, {
      userId: id,
      userPassword: password
    })
  },

  async [LOGOUT_USER_ACT] ({ commit }) {
    commit(SET_USER_NONAUTHORIZED)
    return Promise.resolve()
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}

function rejectError (message = 'unknown error') {
  return Promise.reject(new Error(message))
}
