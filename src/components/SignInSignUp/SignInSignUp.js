const LOGIN_TAB = 'LOGIN_TAB'
const REGISTER_TAB = 'REGISTER_TAB'

const tabsOption = {
  LOGIN_TAB: {
    id: 'loginTab',
    name: 'Login',
    firstInputText: 'Enter User ID'
  },
  REGISTER_TAB: {
    id: 'registerTab',
    name: 'Register',
    firstInputText: 'Enter User ID'
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
  },
  computed: {
    isLoginTabActive () {
      return this.active === LOGIN_TAB
    },
    isRegisterTabActive () {
      return !this.isLoginTabActive
    },
    firstInputText () {
      return tabsOption[this.active].firstInputText
    }
  }

}
