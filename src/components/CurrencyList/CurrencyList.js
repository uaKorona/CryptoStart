import {GET_CURRENCY_LIST_ACT} from '../../store/action-types'
import {MUTATE_FIRST_ITEM} from '../../store/mutation-types'
import CurrencyPreviewDialog from "../CurrencyPreviewDialog/CurrencyPreviewDialog.vue";

export default {
  name: 'CurrencyList',
  components: {
    'currency-preview-dialog': CurrencyPreviewDialog
  },
  data () {
    return {
      currencyPreviewDialogState: false,
      loading: true,
      headers: [
        {text: '#', value: 'rank', align: 'left'},
        {text: 'Name', value: 'name', align: 'left'},
        {text: 'Price', value: 'price_usd'},
        {text: 'Market Cap', value: 'market_cap_usd'},
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
  created () {
    this.loading = true

    this.$store
      .dispatch(GET_CURRENCY_LIST_ACT)
      .finally(() => {
          this.loading = false
      })
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
      console.log('item', item)
      this.currencyPreviewDialogState = true;
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
