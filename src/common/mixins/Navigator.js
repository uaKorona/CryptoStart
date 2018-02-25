import {CURRENCY_LIST_ROUTE, LOGIN_ROUTE, SETTINGS_ROUTE} from '../../router/routeNames'

export default {
  methods: {
    toHome () {
      this.navigateTo(CURRENCY_LIST_ROUTE)
    },
    toLogin () {
      this.navigateTo(LOGIN_ROUTE)
    },
    toSettings () {
      this.navigateTo(SETTINGS_ROUTE)
    },
    navigateTo (name) {
      return this.$router.push({name})
    }
  }
}
