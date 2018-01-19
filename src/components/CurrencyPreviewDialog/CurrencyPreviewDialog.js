export default {
  name: 'CurrencyPreviewDialog',
  props: {
    currency: {
      type: Object,
      default: () => null
    },
    state: {
      type: Boolean,
      default: false
    }
  },
  data () {
    console.log(this.currency)
    return {
      dialogState: this.state
    }
  },
  methods: {
    closeDialog () {
      this.dialogState = false
    }
  }
}
