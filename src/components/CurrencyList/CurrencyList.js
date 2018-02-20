import {GET_CURRENCY_LIST_ACT, GET_CURRENCY_LIST_BINANCE_ACT} from '../../store/action-types'
import {MUTATE_FIRST_ITEM} from '../../store/mutation-types'
import CurrencyPreviewDialog from '../CurrencyPreviewDialog/CurrencyPreviewDialog.vue'
import {asyncSetTimeout} from '../../common/mixins/AsyncSetTimeout';

export default {
  name: 'CurrencyList',
  components: {
    'currency-preview-dialog': CurrencyPreviewDialog
  },
  data () {
    return {
      currencyPreviewDialogState: false,
      selectedCurrency: null,
      loading: true,
      headers: [
        {text: '#', value: 'rank', align: 'left'},
        {text: 'Name', value: 'name', align: 'left'},
        {text: 'Market Cap', value: 'market_cap_usd'},
        {text: 'Price', value: 'price_usd'},
        {text: 'Binance', value: 'isOnBinance'},
        {text: 'Change (24h)', value: 'percent_change_24h'},
        {text: 'Price (7d)', value: 'imageSrc'}
      ],
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

    await asyncSetTimeout(300)
    await this.$store.dispatch(GET_CURRENCY_LIST_ACT, {start: 101});
    await asyncSetTimeout(300)
    await this.$store.dispatch(GET_CURRENCY_LIST_ACT, {start: 201});
    await asyncSetTimeout(300)
    await this.$store.dispatch(GET_CURRENCY_LIST_BINANCE_ACT)
  },
  computed: {
    currencyList: function () {
      return this.$store.state.currencyList.list
    }
  },
  filters: {
    currency
  },
  methods: {
    changeTheFirst () {
      this.$store
        .commit(MUTATE_FIRST_ITEM)
    },
    openDialog (item) {
      this.selectedCurrency = item
      this.currencyPreviewDialogState = true
    },
    searchCurrencies (items, search, filter, headers) {
      return items
        .filter(item => {
          const searchLowerCase = search.toLowerCase()

          return item.name.toLowerCase().includes(searchLowerCase) ||
            item.symbol.toLowerCase().includes(searchLowerCase)
        })
    }
  }

}

function currency (value) {
  if (!value) return ''

  const maxPartLength = 3
  const partSeparator = ','
  const isArrayMaxPart = index => !((index + 1) % maxPartLength)

  let [integerPart, fractionalPart] = value.split('.')
  let splittedString = integerPart
  const isNotLastIntegerSymbol = index => (index + 1) < integerPart.length

  fractionalPart = fractionalPart
    ? '.' + fractionalPart
    : ''

  if (integerPart.length > maxPartLength) {
    splittedString = integerPart
      .split('')
      .reverse()
      .map((letter, index) => {
        if (isArrayMaxPart(index) && isNotLastIntegerSymbol(index)) {
          return partSeparator + letter
        }
        return letter
      })
      .reverse()
      .join('')
  }

  return '$' + splittedString + fractionalPart
}
