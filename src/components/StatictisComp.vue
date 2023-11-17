<template>
  <v-card min-height="150px" min-width="150px" class="ma-4 pa-8">
    <strong>{{ title }}: {{ value }}</strong>
  </v-card>
</template>
<script>
export default {
  name: "StatictisComp",
  props: ["title", "value"],
};
</script>
