<template>
  <v-card flat class="pa-8">
    <v-row v-if="statictis" class="d-flex flex-row pa-4">
      <StatictisComp title="Users" :value="statictis.usersCount" />
      <StatictisComp title="Writters" :value="statictis.writtersCount" />
      <StatictisComp title="Articles" :value="statictis.articlesCount" />
      <StatictisComp title="Likes" :value="statictis.likesCount" />
      <StatictisComp title="Comments" :value="statictis.commentsCount" />
    </v-row>
    <LoadingAndErrorSc :isLoading="loading" :msg="msg" :error="error" />
  </v-card>
</template>
<script>
import LoadingAndErrorSc from "@/components/LoadingAndErrorSc.vue";
import StatictisComp from "@/components/StatictisComp.vue";
import adminController from "@/controllers/adminController";

export default {
  name: "StatictisView",
  data() {
    return {
      loading: true,
      error: false,
      msg: null,
      statictis: null,
    };
  },
  async mounted() {
    this.loading = true;
    this.error = false;
    this.msg = null;
    const res = await adminController.getStatictis();
    this.loading = false;
    this.error = !res.state;
    this.msg = res.message;
    if (res.state) {
      this.statictis = res.statictisInfo;
    }
  },
  components: { LoadingAndErrorSc, StatictisComp },
};
</script>
