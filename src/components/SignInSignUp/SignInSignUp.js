import CustomTab from './CustomTab/CustomTab.vue'
import TabOption from '../../models/TabOption'

const LOGIN_TAB = 'LOGIN_TAB'
const REGISTER_TAB = 'REGISTER_TAB'

const tabsOption = {
  LOGIN_TAB: new TabOption({
    id: 'loginTab',
    name: 'Login',
    firstInputText: 'Enter User ID',
    secondInputText: 'Enter User Password',
    firstInputValidators: {
      required: (value) => !!value || 'Required.',
      email: (value) => {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
    }
  }),
  REGISTER_TAB: new TabOption({
    id: 'registerTab',
    name: 'Register',
    firstInputText: 'Enter User Name',
    secondInputText: 'Enter User Password'
  })
}

export default {
  name: 'SignInSignUp',
  components: {
    'custom-tab': CustomTab
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
