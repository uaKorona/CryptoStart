import TabOption from '../../../models/TabOption'

export default {
  name: 'Login',
  data () {
    return {
      currentTab: this.tabOption,
      passwordVisibility: false
    }
  },
  methods: {
    switchPasswordVisibility () {
      this.passwordVisibility = !this.passwordVisibility
    },
    submit () {
      // this.isLoginTabActive ? this.login() : this.register()
    }
  },
  props: {
    tabOption: {
      type: Object,
      default: function () {
        return new TabOption()
      }
    }
  }
}
