<template>
  <v-app-bar :order="order" flat>
    <v-app-bar-nav-icon v-if="$store.getters.isAuth" @click="togleDrawer" />

    <v-app-bar-title>{{ $store.getters.getAppName }}</v-app-bar-title>
    <v-card-text>{{ new Date().toDateString() }}</v-card-text>

    <v-card-actions>
      <v-btn
        :prepend-icon="
          $store.getters.isSearch ? 'mdi-magnify-close' : 'mdi-magnify-plus'
        "
        @click="$store.dispatch('togleIsSearch')"
        size="large"
        >Search</v-btn
      >
      <v-spacer />
      <v-tabs
        v-if="!$store.getters.isAuth"
        v-model="currentTab"
        fixed-tabs
        color="grey"
      >
        <v-tab
          prepend-icon="mdi-home"
          value="home"
          @click="currentTab = 'home'"
          :to="{ name: 'Home' }"
          >Home</v-tab
        >
        <v-tab
          prepend-icon="mdi-login"
          value="logIn"
          @click="currentTab = 'logIn'"
          :to="{ name: 'LogIn' }"
          >Log In</v-tab
        >
        <v-tab
          prepend-icon="mdi-logout"
          value="signUp"
          @click="currentTab = 'signUp'"
          :to="{ name: 'SignUp' }"
          >Sign Up</v-tab
        >
      </v-tabs>
    </v-card-actions>
  </v-app-bar>
</template>
<script>
export default {
  name: "AppBar",
  data() {
    return {
      currentTab: "home",
      menu: "open menu",
      order: 0,
    };
  },
  methods: {
    togleDrawer: function () {
      this.$store.commit("togleDrawer");
      if (this.$store.getters.drawerState) {
        //this.order = 1;
        this.menu = "open menu";
      } else {
        // this.order = 0;
        this.menu = "close menu";
      }
    },
  },
};
</script>
