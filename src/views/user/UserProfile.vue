<template>
  <loading-and-error-sc :isLoading="loading" :error="error" :msg="msg" />
  <v-card
    v-if="user"
    flat
    min-width="300px"
    class="mx-auto pa-8"
    justify-center
  >
    <v-row>
      <v-card-title>User Name: {{ user.name }}</v-card-title>
      <v-btn
        color="orange-lighten-2"
        prepend-icon="mdi-note-edit"
        @click="gotoEtidtUserInfoForm"
      >
        Edit
      </v-btn>
    </v-row>
    <v-card v-if="user.notification" color="red-lighten-2" class="my-2">
      <v-card-text> Notification: {{ user.notification }} </v-card-text>
    </v-card>
    <v-card-subtitle>Email: {{ user.email }}</v-card-subtitle>
    <v-card-subtitle>Phone: {{ user.phone }}</v-card-subtitle>
  </v-card>
  <v-card v-if="writter" flat min-width="300px" class="mx-auto pa-8">
    <v-row>
      <v-card-title>Name: {{ writter.fullName }}</v-card-title>
      <v-btn
        color="orange-lighten-2"
        prepend-icon="mdi-note-edit"
        @click="gotoEtidtWritterInfoForm"
      >
        Edit
      </v-btn>
    </v-row>
    <v-divider />
    <v-card v-if="writter.notification" color="red-lighten-2" class="my-2">
      <v-card-text> Notification: {{ writter.notification }} </v-card-text>
    </v-card>
    <v-card-text class="ma-2 pa-0">
      Family Name: {{ writter.familyName }}
    </v-card-text>
    <v-card-text class="ma-2 pa-0">
      Nick Name: {{ writter.nickName }}
    </v-card-text>
    <v-divider />
    <v-row>
      <v-card-text>NIC: {{ writter.nic }}</v-card-text>
      <v-card-text>Address: {{ writter.address }}</v-card-text>
    </v-row>
    <v-divider />
    <v-card-text>References: {{ writter.references }}</v-card-text>
    <v-divider />
  </v-card>
</template>
<script>
import LoadingAndErrorSc from "@/components/LoadingAndErrorSc.vue";
import userController from "@/controllers/userController";
export default {
  components: { LoadingAndErrorSc },
  data() {
    return {
      user: null,
      writter: null,
      loading: false,
      error: false,
      msg: null,
    };
  },
  async mounted() {
    await this.loadProfileData();
  },
  methods: {
    gotoEtidtUserInfoForm: async function () {
      await this.$store.dispatch("setUser", this.user);
      this.$router.push({ name: "UserInfoForm" });
    },
    gotoEtidtWritterInfoForm: async function () {
      await this.$store.dispatch("setWritter", this.writter);
      this.$router.push({ name: "WritterInfoForm" });
    },
    loadProfileData: async function () {
      this.error = false;
      this.msg = null;
      this.loading = true;
      const res = await userController.getProfileData();
      this.msg = res.message;
      this.error = !res.state;
      this.user = res.user;
      this.writter = res.writter;
      this.loading = false;
    },
  },
};
</script>
