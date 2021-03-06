import {GET_CURRENCY_LIST_ACT, GET_CURRENCY_LIST_BINANCE_ACT} from '../../store/action-types'
import {MUTATE_FIRST_ITEM} from '../../store/mutation-types'
import CurrencyPreviewDialog from '../CurrencyPreviewDialog/CurrencyPreviewDialog.vue'
import {asyncSetTimeout} from '../../common/mixins/AsyncSetTimeout';
import currencyFilter from '../../common/filters/currencyFilter'

export default {
  name: 'CurrencyList',
  components: {
    'currency-preview-dialog': CurrencyPreviewDialog
  },
  data () {
    const headers = this.headersFilter()

    return {
      currencyPreviewDialogState: false,
      selectedCurrency: null,
      loading: true,
      headers,
      pagination: {
        sortBy: 'rank',
        rowsPerPage: 50
      },
      paginationFilter: [
        20, 50, 100,
        {text: 'All', value: -1}
      ],
      search: ''
    }
  },
  async created () {
    this.loading = true
    await this.$store.dispatch(GET_CURRENCY_LIST_ACT)
    this.loading = false
  },
  computed: {
    currencyList: function () {
      return this.$store.state.currencyList.list
    }
  },
  filters: {
    currencyFilter
  },
  methods: {
    isUserAuthorized () {
      return this.$store.getters.isUserAuthorized
    },
    changeTheFirst () {
      this.$store
        .commit(MUTATE_FIRST_ITEM)
    },
    openDialog (item) {
      if (this.isUserAuthorized() && item.isOnBinance) {
        this.selectedCurrency = item
        this.currencyPreviewDialogState = true
      }
    },
    searchCurrencies (items, search, filter, headers) {
      return items
        .filter(item => {
          const searchLowerCase = search.toLowerCase()

          return item.name.toLowerCase().includes(searchLowerCase) ||
            item.symbol.toLowerCase().includes(searchLowerCase)
        })
    },
    headersFilter () {
      return [
        {text: '#', value: 'rank', align: 'left'},
        {text: 'Name', value: 'name', align: 'left'},
        {text: 'Market Cap', value: 'market_cap_usd'},
        {text: 'Price', value: 'price_usd'},
        {text: 'Binance', value: 'isOnBinance'},
        {text: 'Change (24h)', value: 'percent_change_24h'},
        {text: 'Price (7d)', value: 'imageSrc'}
      ].filter(header => {
        if (this.isUserAuthorized()) {
          return true
        }
        return header.text !== 'Binance'
      })
    }
  }

}


