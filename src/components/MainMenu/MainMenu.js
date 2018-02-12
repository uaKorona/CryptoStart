import Navigator from '../../common/mixins/Navigator'
import {onEvent, USER_LOGIN_SUCCESSFULLY} from '../../common/EventsBus/EventsBus'

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
  created () {
    onEvent(USER_LOGIN_SUCCESSFULLY, ({text, color}) => {
      this.showSnackBar(text, color)
    })
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
    showSnackBar (text, color = 'success') {
      this.snackBarText = text
      this.snackBarColor = color
      this.snackBarShowStatus = true
    },
    hideSnackBar () {
      this.snackBarShowStatus = false
    }
  }
}
