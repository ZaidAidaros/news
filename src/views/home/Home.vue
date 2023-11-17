<template>
  <v-card class="pa-2">
    <!-- <ArgNews /> -->

    <HomeBody />
  </v-card>
</template>

<script>
import ArgNews from "@/components/ArgNews.vue";
import HomeBody from "./HomeBody.vue";

export default {
  name: "Home",
  components: { HomeBody, ArgNews },
};
</script>
