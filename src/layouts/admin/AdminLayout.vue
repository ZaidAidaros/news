<template>
  <admin-drawer class="my-8" />
  <v-main class="my-4 mt-12">
    <app-fast-nav-btn />
    <router-view />
  </v-main>
</template>

<script setup>
import AppFastNavBtn from "@/components/AppFastNavBtn.vue";
import AdminDrawer from "./AdminDrawer.vue";
</script>
