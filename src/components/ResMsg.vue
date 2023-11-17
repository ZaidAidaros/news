<template>
  <v-card
    v-if="msg"
    class="mb-4 text-green"
    color="surface-variant"
    variant="tonal"
  >
    <v-card-text :class="{ 'text-red': error }">
      {{ msg }}
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "ResMsg",
  props: ["msg", "error"],
};
</script>
