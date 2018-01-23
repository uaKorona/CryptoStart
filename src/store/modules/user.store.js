import User from "../../models/User"
import {SET_USER_AUTHORIZED, SET_USER_NONAUTHORIZED} from "../mutation-types";

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
  [LOGIN_USER_ACT] () {

  }
}

export default {
  state,
  getters,

  mutations
}
