import CustomTab from './CustomTab/CustomTab.vue'
import TabOption from '../../models/TabOption'
import required from '../../common/validators/required';
import onlyNumbers from '../../common/validators/onlyNumbers';
import minLength from '../../common/validators/minLength';
import {LOGIN_USER_ACT} from '../../store/action-types'

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
    },
    submitButtonName: 'Login',
    submitButtonStyle: 'primary'
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
    },
    submitButtonName: 'Register',
    submitButtonStyle: 'green'
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
    submit (payLoad) {
      console.log(payLoad)
      this.isLoginTabActive ? this.login(payLoad) : this.register(payLoad)
    },
    login (payLoad) {
      this.$store
        .dispatch(LOGIN_USER_ACT, payLoad)
        .then(() => console.log('login success'))
        .catch(err => console.error(err))
    },
    register () {
      console.log('register')
    }
  }
}
