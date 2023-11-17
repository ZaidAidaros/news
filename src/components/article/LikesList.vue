<template>
  <v-virtual-scroll :items="likes" height="320" item-height="48">
    <template v-slot:default="{ item }">
      <v-card>
        <v-card-title :icon="item.like ? 'mdi-thumb-up' : 'mdi-thumb-down'">
          {{ item.user.name }}
        </v-card-title>
      </v-card>
    </template>
  </v-virtual-scroll>
</template>
<script>
export default {
  name: "LikesList",
  props: ["likes"],
};
</script>
