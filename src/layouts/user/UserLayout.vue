<template>
  <user-drawer class="my-8" />
  <v-main class="my-4 mt-12">
    <router-view />
  </v-main>
</template>

<script setup>
import UserDrawer from "./UserDrawer.vue";
</script>
