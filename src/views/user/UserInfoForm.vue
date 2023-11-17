<template>
  <v-card class="mx-auto py-4 px-8" elevation="8" max-width="448" rounded="lg">
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="black-lighten-2"
        prepend-icon="mdi-account"
        :to="{ name: 'UserProfile' }"
      >
        Back
      </v-btn>
    </v-card-actions>
    <v-form ref="userInfoForm" @submit.prevent="onSubmit">
      <v-text-field
        v-model="user.email"
        color="primary"
        label="Email"
        variant="underlined"
        :rules="[rules.email]"
      ></v-text-field>
      <v-text-field
        v-model="user.phone"
        color="primary"
        label="Phone"
        variant="underlined"
      ></v-text-field>
      <v-text-field
        v-model="user.newPassword"
        color="primary"
        label="New Password"
        placeholder="Enter your New Password"
        variant="underlined"
        :rules="[rules.password]"
      ></v-text-field>
      <v-text-field
        v-model="user.oldPassword"
        color="primary"
        label="Old Password"
        placeholder="Enter your Old Password"
        variant="underlined"
        :rules="[rules.required, rules.password]"
      ></v-text-field>
    </v-form>
    <v-divider></v-divider>
    <res-msg :msg="msg" :error="error" />
    <v-divider></v-divider>
    <v-btn
      :loading="loading"
      block
      color="green"
      size="large"
      type="submit"
      variant="elevated"
      @click="onSubmit"
    >
      Save
    </v-btn>
  </v-card>
</template>

<script>
import userController from "@/controllers/userController";
import ResMsg from "@/components/ResMsg.vue";

export default {
  name: "UserInfoForm",
  components: { ResMsg },
  data: () => ({
    error: false,
    msg: null,
    loading: false,
    user: {
      email: null,
      phone: null,
      newPassword: null,
      oldPassword: null,
    },
    oldUser: null,
    rules: {
      required: (value) => !!value || "Required.",
      password: (value) =>
        !value ||
        (value.length >= 6 && value.length <= 20) ||
        "Max 20 characters , Min 6",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),
  mounted() {
    this.oldUser = this.$store.getters.getUser;
    if (this.oldUser) {
      this.user.email = this.oldUser.email;
      this.user.phone = this.oldUser.phone;
    }
  },
  methods: {
    getUser: function () {
      let u = { isEdited: false };
      if (this.oldUser.email !== this.user.email) {
        u.email = this.user.email;
        u.isEdited = true;
      }
      if (this.oldUser.phone !== this.user.phone) {
        u.phone = this.user.phone;
        u.isEdited = true;
      }
      if (this.user.newPassword) {
        u.newPassword = this.user.newPassword;
        u.isEdited = true;
      }
      if (u.isEdited) {
        u.oldPassword = this.user.oldPassword;
        delete u.isEdited;
        return u;
      } else {
        return null;
      }
    },
    onSubmit: async function () {
      const valid = await this.$refs.userInfoForm.validate();

      if (valid.valid && this.getUser()) {
        this.loading = true;
        this.error = false;
        this.msg = null;
        const res = await userController.updateUserInfo(this.getUser());
        this.loading = false;
        this.msg = res.message;
        this.error = !res.state;
        if (res.state) {
          setTimeout(() => {
            this.msg = null;
            this.$router.push({ name: "UserProfile" });
          }, 2000);
        }
      } else {
        this.msg = "You must Fill Fields Correctly";
        this.error = true;
      }
    },
  },
};
</script>
