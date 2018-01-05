<script>
  export default {
    data () {
      return {}
    },
    created () {
      this.$store.dispatch('getCurrencyList')
    },
    computed: {
      currencyList: function () {
        return this.$store.state.currencyList.list
      }
    }

  }
</script>

<template>
  <v-layout>
    <h3>List</h3>
    <ul>
      <li v-for="currency in currencyList">{{currency.name}}</li>
    </ul>
  </v-layout>
</template>

