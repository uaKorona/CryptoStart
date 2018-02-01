import TabOption from '../../../models/TabOption'

export default {
  name: 'CustomTab',
  data () {
    return {
      firstInput: '',
      secondInput: '',
      passwordVisibility: false
    }
  },
  methods: {
    switchPasswordVisibility () {
      this.passwordVisibility = !this.passwordVisibility
    },
    submit () {
      console.log(this.firstInput, this.secondInput);
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
