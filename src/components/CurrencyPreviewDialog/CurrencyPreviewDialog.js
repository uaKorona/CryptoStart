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
      dialogState: false
    }
  },
  methods: {
    closeDialog () {
      this.dialogState = false;
    }
  },
  watch: {
    state (val) {
      this.dialogState = val
    },
    dialogState (val) {
      if (val === false) {
        this.$emit('update:state', false)
      }
    }
  }
}
