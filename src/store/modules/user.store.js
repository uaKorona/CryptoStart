import User from '../../models/User'
import {SET_USER_AUTHORIZED, SET_USER_NONAUTHORIZED, ADD_NEW_USER} from '../mutation-types'
import {LOGIN_USER_ACT, REGISTER_USER_ACT} from '../action-types'
import userList from './userList'

const state = {
  user: new User({}),
  userList: userList
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
  },
  [ADD_NEW_USER] (state, newUser) {
    state.userList.push(newUser)
  }
}

const actions = {

  [LOGIN_USER_ACT] ({ state, commit }, { userId, userPassword }) {
    const foundUser = state.userList.find(user => user.id === userId)

    if (!foundUser) {
      return rejectError('User is not found.')
    }

    if (foundUser.password !== userPassword) {
      return rejectError('Password is invalid.')
    }

    commit(SET_USER_AUTHORIZED)
    return Promise.resolve()
  },

  [REGISTER_USER_ACT] ( { state, commit }, { name, password } ) {
    const foundUser = state.userList.find(user => user.name === name)

    if (foundUser) {
      return rejectError('User with that name has already registered')
    }

    commit(ADD_NEW_USER, new User( { name, password } ))
    return Promise.resolve()
  }

}

function rejectError(message = 'unknown error') {
  return Promise.reject(new Error(message))
}

export default {
  state,
  getters,
  actions,
  mutations
}
