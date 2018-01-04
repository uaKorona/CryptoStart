<script>
  export default {
    created () {
      this.$store.dispatch('getCurrencyList')
    }
  }
</script>

<template>
  <v-layout>
    List
  </v-layout>
</template>


