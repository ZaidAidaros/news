<template>
  <v-card class="mx-auto py-4 px-8" elevation="8" max-width="448" rounded="lg">
    <v-row>
      <v-card-title> {{ pageTitle }}</v-card-title>
      <v-spacer></v-spacer>
      <v-btn
        end
        flat
        class="text-caption text-decoration-none text-blue"
        :to="{ name: 'LogIn' }"
      >
        Log In<v-icon icon="mdi-chevron-right"></v-icon>
      </v-btn>
    </v-row>
    <v-img src="@/assets/logo.png" />
    <v-container>
      <v-form ref="signUpForm" @submit.prevent="signUP">
        <v-text-field
          v-model="userName"
          color="primary"
          label="User name"
          variant="underlined"
          :rules="[rules.required, rules.name]"
        ></v-text-field>

        <v-text-field
          v-model="email"
          color="primary"
          label="Email"
          variant="underlined"
          :rules="[phone ? true : rules.required, rules.email]"
        ></v-text-field>
        <v-text-field
          v-model="phone"
          color="primary"
          label="Phone"
          variant="underlined"
          :rules="[email ? true : rules.required]"
        ></v-text-field>
        <v-text-field
          v-model="password"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
          :rules="[rules.required, rules.password]"
        ></v-text-field>
        <v-checkbox
          v-model="terms"
          color="secondary"
          label="I agree to site terms and conditions"
        ></v-checkbox>
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
        @click="signUP"
      >
        Sign Up
      </v-btn>
    </v-container>
  </v-card>
</template>

<script>
import ResMsg from "@/components/ResMsg.vue";
import ImageComp from "@/components/ImageComp.vue";
import { signUp } from "@/controllers/authController.js";

export default {
  name: "SignUp",
  components: { ResMsg, ImageComp },
  data: () => ({
    pageTitle: "Sign Up",
    error: false,
    msg: null,
    loading: false,
    userName: null,
    email: null,
    phone: null,
    password: null,
    terms: false,
    rules: {
      name: (value) => {
        if (value?.length <= 10) return true;
        return "Name must be less than 10 characters.";
      },
      required: (value) => !!value || "Required.",
      password: (value) =>
        (value.length >= 6 && value.length <= 20) ||
        "Max 20 characters , Min 6",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),
  methods: {
    signUP: async function () {
      const valid = await this.$refs.signUpForm.validate();
      if (!this.terms) {
        this.msg = "You must accept our terms";
        this.error = true;
        return;
      }
      if (valid.valid && this.terms) {
        this.loading = true;
        this.msg = null;
        this.error = false;
        const { state, message } = await signUp({
          UName: this.userName,
          phone: this.phone,
          email: this.email,
          password: this.password,
        });
        this.loading = false;
        this.msg = message;
        if (state) {
          this.msg += `\n Wait Will Redirect You To Log In .. `;
          setTimeout(() => {
            this.$router.push("/login");
          }, 1000);
        } else {
          this.error = true;
        }
      } else {
        this.msg = "You must Fill All Fields Correctly";
        this.error = true;
      }
    },
  },
};
</script>
