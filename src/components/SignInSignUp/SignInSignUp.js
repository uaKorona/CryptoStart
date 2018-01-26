const LOGIN_TAB = 'LOGIN_TAB'
const REGISTER_TAB = 'REGISTER_TAB'

const tabsOption = {
  LOGIN_TAB: {
    id: 'loginTab',
    name: 'Login'
  },
  REGISTER_TAB: {
    id: 'registerTab',
    name: 'Register'
  }
}

export default {
  name: 'SignInSignUp',
  data () {
    return {
      active: LOGIN_TAB,
      tabs: [LOGIN_TAB, REGISTER_TAB],
      tabsOption
    }
  }
}
