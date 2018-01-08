export default {
  data () {
    return {
      loading: false,
      headers: [
        {text: 'Name', align: 'left', value: 'name'},
        {text: 'symbol', value: 'symbol'},
        {text: 'price_usd', value: 'price_usd'},
        {text: 'Price Graph (7d)', value: 'imageSrc'}
      ],
      pagination: {sortBy: 'name'},
      search: ''
    }
  },
  created () {
    this.loading = true

    this.$store
      .dispatch('getCurrencyList')
      .finally(() => {
        this.loading = false
      })
  },
  computed: {
    currencyList: function () {
      return this.$store.state.currencyList.list
    }
  }

}
