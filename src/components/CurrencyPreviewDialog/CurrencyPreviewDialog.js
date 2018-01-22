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
    return {
      dialogState: this.state
    }
  },
  methods: {
    closeDialog () {
      this.dialogState = false
    },
    updateState () {
      this.$emit('update:state', false)
    }
  },
  watch: {
    dialogState (val) {
      if (val === false) {
        this.updateState()
      }
    }
  }
}
