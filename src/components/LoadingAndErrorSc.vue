<template>
  <v-card
    v-if="isLoading || msg"
    class="mx-auto my-8"
    max-width="250px"
    flat
    justify-content-center
  >
    <v-progress-circular
      v-if="isLoading"
      color="primary"
      indeterminate
      size="50"
      class="mx-auto"
      justify-center
    ></v-progress-circular>
    <ResMsg v-else :msg="msg" :error="error" />
  </v-card>
</template>
<script>
import ResMsg from "./ResMsg.vue";
export default {
  props: ["isLoading", "msg", "error"],
  components: { ResMsg },
};
</script>
