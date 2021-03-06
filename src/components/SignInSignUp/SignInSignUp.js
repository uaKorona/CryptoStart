import CustomTab from './CustomTab/CustomTab.vue'
import TabOption from '../../models/TabOption'
import required from '../../common/validators/required'
import onlyNumbers from '../../common/validators/onlyNumbers'
import minLength from '../../common/validators/minLength'
import {LOGIN_USER_ACT, REGISTER_USER_ACT} from '../../store/action-types'
import Navigator from '../../common/mixins/Navigator'
import {emitEvent, USER_LOGIN_SUCCESSFULLY} from '../../common/EventsBus/EventsBus'

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
      tabsOption,
      errors: {
        [LOGIN_TAB]: null,
        [REGISTER_TAB]: null
      }
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
    activeError () {
      return this.errors[this.active]
    }
  },
  mixins: [ Navigator ],
  methods: {
    submit (payLoad) {
      this.isLoginTabActive ? this.login(payLoad) : this.register(payLoad)
    },
    async login ({firstInput: userId, secondInput: userPassword}) {
      await this.doAction(LOGIN_USER_ACT, {userId, userPassword})
      emitEvent(USER_LOGIN_SUCCESSFULLY, {text: 'Login successful'})
    },
    async register ({firstInput: name, secondInput: password}) {
      await this.doAction(REGISTER_USER_ACT, {name, password})
      emitEvent(USER_LOGIN_SUCCESSFULLY, {text: 'Registration successful'})
    },
    async doAction (action, payLoad) {
      const result = await this.$store
        .dispatch(action, payLoad)
        .catch(this.errorHandler())

      this.clearErrors()
      this.toHome()
      return result
    },
    errorHandler () {
      return err => {
        this.errors[this.active] = (err && err.message) || 'unknown error ' + err
        throw err
      }
    },
    clearErrors () {
      this.errors[this.active] = null
    }
  }
}
