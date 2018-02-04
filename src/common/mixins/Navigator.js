import {CURRENCY_LIST_ROUTE, LOGIN_ROUTE} from '../../router/routeNames'

export default {
  methods: {
    toHome () {
      this.navigateTo(CURRENCY_LIST_ROUTE)
    },
    toLogin () {
      this.navigateTo(LOGIN_ROUTE)
    },
    navigateTo (name) {
      return this.$router.push({name})
    }
  }
}
