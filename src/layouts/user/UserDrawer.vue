<template>
  <v-navigation-drawer permanent expand-on-hover rail v-model="drawer">
    <v-list>
      <v-list-item
        prepend-avatar="@/assets/logo.png"
        :title="$store.getters.getUser.name"
        :subtitle="
          $store.getters.getUser.email ?? $store.getters.getUser.phone ?? ''
        "
      ></v-list-item>
    </v-list>
    <v-divider />
    <v-list density="compact" nav>
      <v-list-item
        v-for="item in items"
        :key="item.name"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
        @click="item.onClick"
        :to="item.to"
      ></v-list-item>
    </v-list>
    <v-divider />
    <v-spacer />
    <v-list-item @click="logOut" prepend-icon="mdi-logout" title="Log Out" />
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Home",
          icon: "mdi-home",
          to: { name: "Home" },
          value: "home",
        },
        {
          title: "My Profile",
          icon: "mdi-account",
          to: { name: "UserProfile" },
          value: "myProfile",
        },
        {
          title: "Be Writter",
          icon: "mdi-pen",
          to: { name: "WritterInfoForm" },
          value: "beWritter",
        },
      ],
    };
  },
  computed: {
    drawer() {
      return this.$store.getters.drawerState;
    },
  },
  methods: {
    logOut: function () {
      this.$store.dispatch("logOut");
      this.$router.push("/");
    },
  },
};
</script>
