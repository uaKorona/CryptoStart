import Navigator from '../../common/mixins/Navigator'
import {onEvent, USER_LOGIN_SUCCESSFULLY, emitEvent, USER_LOGOUT_SUCCESSFULLY} from '../../common/EventsBus/EventsBus'
import {LOGOUT_USER_ACT} from '../../store/action-types';

export default {
  name: 'MainMenu',
  data () {
    return {
      snackBarShowStatus: false,
      snackBarColor: 'success',
      mode: '',
      timeout: 6000,
      snackBarText: ''
    }
  },
  computed: {
    isUserAuthorized () {
      return this.$store.getters.isUserAuthorized
    },
    currentUser () {
      return this.$store.getters.currentUser
    }
  },
  mixins: [ Navigator ],
  methods: {
    eventHandler () {
      return ({text, color}) => {
        this.showSnackBar(text, color)
      }
    },
    showSnackBar (text, color = 'success') {
      this.snackBarText = text
      this.snackBarColor = color
      this.snackBarShowStatus = true
    },
    hideSnackBar () {
      this.snackBarShowStatus = false
    },
    async logout () {
      await this.$store.dispatch(LOGOUT_USER_ACT)
      emitEvent(USER_LOGOUT_SUCCESSFULLY, {text: 'Logout successful'})
      this.toHome()
    }
  },

  /** Lifecycle Hooks */
  created () {
    onEvent(USER_LOGIN_SUCCESSFULLY, this.eventHandler())
    onEvent(USER_LOGOUT_SUCCESSFULLY, this.eventHandler())
  },
}
