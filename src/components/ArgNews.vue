<template>
  <v-card flat class="text-red pa-2" color="grey" height="50px">
    <v-row>
      <v-card-title>Arg:</v-card-title>
      <transition v-if="news" name="fade">
        <v-card-title> {{ news }}</v-card-title>
      </transition>
    </v-row>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      news: "lvdfvej  eujdvsdv afg e et ",
    };
  },
  mounted() {
    setInterval(() => {
      this.news = null;
      let t = Date.now();
      this.news = t + "GTqtg t";
    }, 2000);
  },
};
</script>

<style>
.fade-enter-from {
  transform: translateX(500);
  opacity: 0;
}

.fade-leave-to {
  transform: translateX(-500);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}
</style>
