import TabOption from '../../../models/TabOption'

export default {
  name: 'CustomTab',
  data () {
    return {
      firstInput: '',
      secondInput: '',
      passwordVisibility: false,
      formValidity: true
    }
  },
  methods: {
    switchPasswordVisibility () {
      this.passwordVisibility = !this.passwordVisibility
    },
    submit () {
      console.log(this.firstInput, this.secondInput);
      if (this.$refs.form.validate()) {
        console.log('valid');
      }
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
