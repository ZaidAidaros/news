<template>
  <v-main class="my-4 mt-12">
    <router-view />
  </v-main>
  <AppFooter />
</template>

<script setup>
import AppFooter from "@/components/AppFooter.vue";
</script>
