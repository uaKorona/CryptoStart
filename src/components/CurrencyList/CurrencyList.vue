<script>
  export default {
    data () {
      return {
        loading: false,
        headers: [
          {
            text: 'Name',
            align: 'left',
            value: 'name'
          },
          {text: 'symbol', value: 'symbol'},
          {text: 'price_usd', value: 'price_usd'}
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
</script>

<template>
  <v-container>

    <img src="https://files.coinmarketcap.com/generated/sparklines/1.png" alt="btc">
    <v-container v-if="loading">
      L O A D I N G
    </v-container>

    <v-card>
      <v-card-title>
        Something
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
    </v-card>

    <v-data-table
      v-if="!loading"
      v-bind:headers="headers"
      v-bind:items="currencyList"
      v-bind:search="search"
      v-bind:pagination.sync="pagination"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.symbol }}</td>
        <td class="text-xs-right">{{ props.item.price_usd }}</td>
      </template>

      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>

  </v-container>
</template>
