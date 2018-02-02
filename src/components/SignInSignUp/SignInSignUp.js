import CustomTab from './CustomTab/CustomTab.vue'
import TabOption from '../../models/TabOption'
import required from '../../common/validators/required';
import onlyNumbers from '../../common/validators/onlyNumbers';
import minLength from '../../common/validators/minLength';

const LOGIN_TAB = 'LOGIN_TAB'
const REGISTER_TAB = 'REGISTER_TAB'

const tabsOption = {
  LOGIN_TAB: new TabOption({
    id: 'loginTab',
    name: 'Login',
    firstInputText: 'Enter User ID',
    secondInputText: 'Enter User Password',
    firstInputValidators: {
      required,
      onlyNumbers
    },
    secondInputValidators: {
      required
    }
  }),
  REGISTER_TAB: new TabOption({
    id: 'registerTab',
    name: 'Register',
    firstInputText: 'Enter User Name',
    secondInputText: 'Enter User Password',
    firstInputValidators: {
      required
    },
    secondInputValidators: {
      required,
      minLength: minLength(5)
    }
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
