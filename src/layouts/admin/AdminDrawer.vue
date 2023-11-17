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
        // {
        //   title: "Dashboard",
        //   icon: "mdi-view-dashboard",
        //   to: { name: "AdminDashboard" },
        //   value: "adminDashboard",
        // },
        {
          title: "Statictis View",
          icon: "mdi-apps",
          to: { name: "StatictisView" },
          value: "statictisView",
        },
        {
          title: "Users Manage",
          icon: "mdi-account-multiple",
          to: { name: "UsersManage" },
          value: "usersManage",
        },
        {
          title: "Writters Manage",
          icon: "mdi-pen",
          to: { name: "WrittersManage" },
          value: "writtersManage",
        },
        {
          title: "Article Categories Manage",
          icon: "mdi-shape",
          to: { name: "ArticleCategoriesManage" },
          value: "articleCategoriesManage",
        },

        {
          title: "Visters Messages",
          icon: "mdi-message-text",
          to: { name: "VistersMsgs" },
          value: "vistersMsgs",
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
