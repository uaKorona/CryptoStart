import Login from './Login/Login.vue'
import TabOption from '../../models/TabOption'

const LOGIN_TAB = 'LOGIN_TAB'
const REGISTER_TAB = 'REGISTER_TAB'

const tabsOption = {
  LOGIN_TAB: new TabOption({
    id: 'loginTab',
    name: 'Login',
    firstInputText: 'Enter User ID',
    firstInputId: 'userId',
    secondInputText: 'Enter User Password',
    secondInputId: 'userPassword'
  }),
  REGISTER_TAB: new TabOption({
    id: 'registerTab',
    name: 'Register',
    firstInputText: 'Enter User Name',
    firstInputId: 'userName',
    secondInputText: 'Enter User Password',
    secondInputId: 'userPassword'
  })
}

export default {
  name: 'SignInSignUp',
  components: {
    'login-tab': Login
  },
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
    currentTab () {
      return tabsOption[this.active]
    }
  },
  methods: {

    login () {
      console.log('login')
    },
    register () {
      console.log('register')
    }
  }

}
