<template>
  <v-app>
    <app-bar />
    <component :is="$store.getters.getLayout" />
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import GustLayout from "./layouts/GustLayout.vue";
import UserLayout from "./layouts/user/UserLayout.vue";
import WritterLayout from "./layouts/writter/WritterLayout.vue";
import AdminLayout from "./layouts/admin/AdminLayout.vue";
export default {
  name: "App",
  components: { AppBar, GustLayout, UserLayout, WritterLayout, AdminLayout },
};
</script>
