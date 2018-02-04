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
      if (this.$refs.form.validate()) {
        const {firstInput, secondInput} = this
        this.$emit('submitCurrentTab', {firstInput, secondInput})
      }
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
