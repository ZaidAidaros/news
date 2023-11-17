<template>
  <v-footer class="d-flex pa-4 bg-black">
    <v-row class="mx-2 pa-2 bg-black">
      <v-card class="my-4 bg-black">
        <v-card-text>
          <strong>Follow us on social networks!</strong>
        </v-card-text>
        <v-card-actions>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            :icon="icon"
            variant="plain"
            size="small"
          ></v-btn>
        </v-card-actions>
      </v-card>
      <v-spacer />
      <vister-msg />
    </v-row>
  </v-footer>
</template>
<script>
import VisterMsg from "./VisterMsg.vue";

export default {
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
  components: { VisterMsg },
};
</script>
