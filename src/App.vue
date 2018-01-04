<template>
  <div id="app">
    <v-app>
      <v-toolbar dark fixed app>
        <v-toolbar-title>Application</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="login_register_btn mx-1">
          <v-icon>recent_actors</v-icon>
          <span class="ml-1">Login/Register</span>
        </v-btn>
      </v-toolbar>

      <v-content>
        <v-container fluid fill-height>
          <router-view></router-view>
        </v-container>
      </v-content>

      <v-footer dark app>
        <span class="white--text">&copy; 2018</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style></style>
