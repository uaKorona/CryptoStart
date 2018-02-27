import axios from 'axios'
import BCoin24 from '../../models/BCoin24'
import currencyFilter from '../../common/filters/currencyFilter'
const binanceApiUrl = (symbol) => `/binance/api/v1/ticker/24hr?symbol=${symbol}`

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
    setTimeout(() => this.getCurrencyDetail(), 50)

    return {
      dialogState: this.state,
      bCoin: null,
      loading: true,
      pairCoin: 'BTC'
    }
  },
  filters: {
    currencyFilter
  },
  methods: {
    closeDialog () {
      this.dialogState = false
    },
    updateState () {
      this.$emit('update:state', false)
    },
    getCurrencyDetail () {
      const btcSymbol = this.currency.symbol + this.pairCoin
      const url = binanceApiUrl(btcSymbol)

      return axios
        .get(url)
        .then(response => {
          this.bCoin = new BCoin24(response.data)
          this.loading = false
          console.log(this.bCoin)
        })
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
