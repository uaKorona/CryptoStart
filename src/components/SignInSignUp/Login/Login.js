import TabOption from '../../../models/TabOption'

export default {
  name: 'Login',
  data () {
    return {
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
    currentTab: {
      type: Object,
      default: function () {
        return new TabOption()
      }
    }
  }
}
