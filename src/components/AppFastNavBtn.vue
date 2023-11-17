<template>
  <v-card flat>
    <v-card-title>
      <v-row>
        <v-spacer />
        <v-btn
          v-if="$route.name !== 'Home'"
          @click="$router.back()"
          color="grey"
          prepend-icon="mdi-nrow"
        >
          Back
        </v-btn>
        <v-btn
          v-if="$route.name !== 'Home'"
          @click="$router.push({ name: 'Home' })"
          color="orange"
          prepend-icon="mdi-home"
        >
          Home
        </v-btn>
      </v-row></v-card-title
    >
  </v-card>
</template>
<script setup></script>
