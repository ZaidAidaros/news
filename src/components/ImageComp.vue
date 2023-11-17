<template>
  <v-img
    v-if="src"
    :src="'http://localhost:4444'+src"
    :alt="alt"
    aspect-ratio="1"
    fit
    :max-height="mx_h"
    :max-width="mx_w"
  >
    <template v-slot:placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
    <template v-slot:error>
      <v-card flat>
        <v-img max-width="100" aspect-ratio="1" src="@/assets/logo.png"></v-img>
        <v-card-text>Faild To Load The Image</v-card-text>
      </v-card>
    </template>
  </v-img>
</template>
<script>
export default {
  name: "ImageComp",
  props: ["src", "alt", "mx_h", "mx_w"],
};
</script>
