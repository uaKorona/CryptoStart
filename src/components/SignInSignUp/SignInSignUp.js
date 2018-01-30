const LOGIN_TAB = 'LOGIN_TAB'
const REGISTER_TAB = 'REGISTER_TAB'

const tabsOption = {
  LOGIN_TAB: {
    id: 'loginTab',
    name: 'Login',
    firstInputText: 'Enter User ID',
    firstInputId: 'userId',
    secondInputText: 'Enter User Password',
    secondInputId: 'userPassword',
    secondInputShowAsPassword: true
  },
  REGISTER_TAB: {
    id: 'registerTab',
    name: 'Register',
    firstInputText: 'Enter User Name',
    firstInputId: 'userName',
    secondInputText: 'Enter User Password',
    secondInputId: 'userPassword',
    secondInputShowAsPassword: false
  }
}

export default {
  name: 'SignInSignUp',
  data () {
    return {
      active: LOGIN_TAB,
      tabs: [LOGIN_TAB, REGISTER_TAB],
      tabsOption,
      passwordVisibility: tabsOption[LOGIN_TAB].secondInputShowAsPassword
    }
  },
  computed: {
    isLoginTabActive () {
      return this.active === LOGIN_TAB
    },
    isRegisterTabActive () {
      return !this.isLoginTabActive
    },
    currentTab () {
      return tabsOption[this.active]
    },
    secondInputType () {
      return this.passwordVisibility ? 'password' : 'text'
    }
  }

}
