<template>
  <v-card class="mx-auto py-4 px-8" elevation="8" max-width="448" rounded="lg">
    <v-row>
      <v-card-title> {{ pageTitle }}</v-card-title>
      <v-spacer></v-spacer>
      <v-btn
        end
        flat
        class="text-caption text-decoration-none text-blue"
        :to="{ name: 'SignUp' }"
      >
        Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
      </v-btn>
    </v-row>
    <image-comp src="src/assets/logo.png" />
    <v-form ref="logInForm" @submit.prevent="logIn">
      <v-checkbox
        v-model="usePhone"
        color="secondary"
        label="Use Phone Number"
      ></v-checkbox>
      <v-card v-if="usePhone">
        <v-card-text class="text-subtitle-1 text-medium-emphasis"
          >Phone
        </v-card-text>
        <v-text-field
          v-model="phone"
          :rules="[rules.required]"
          density="compact"
          placeholder="Phone"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>
      </v-card>
      <v-card v-else flat>
        <v-card-text class="text-subtitle-1 text-medium-emphasis"
          >Email
        </v-card-text>
        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.email]"
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>
      </v-card>
      <v-row>
        <v-card-text class="text-subtitle-1 text-medium-emphasis"
          >Passwrod
        </v-card-text>
        <v-btn
          flat
          @click="foregetPassword"
          :loading="forgetloading"
          class="text-caption text-decoration-none text-blue"
        >
          Forgot login password?</v-btn
        >
      </v-row>

      <v-text-field
        v-model="password"
        :rules="[rules.required, rules.password]"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>
    </v-form>
    <res-msg :msg="msg" :error="error" />
    <v-divider />
    <v-card-actions>
      <v-btn
        @click="logIn"
        :loading="loading"
        block
        class="mb-4"
        color="blue"
        size="large"
        type="submit"
      >
        Log In
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import router from "@/router";
import {
  signIn,
  sendForegetPasswordReq,
} from "@/controllers/authController.js";
import ResMsg from "@/components/ResMsg.vue";
import ImageComp from "@/components/ImageComp.vue";

export default {
  name: "LogIn",
  components: { ResMsg, ImageComp },
  data: () => ({
    pageTitle: "Log In",
    visible: false,
    loading: false,
    forgetloading: false,
    error: false,
    msg: null,
    usePhone: false,
    email: null,
    phone: null,
    password: null,
    rules: {
      required: (value) => !!value || "Required.",
      password: (value) =>
        (value.length >= 6 && value.length <= 20) ||
        "Max 20 characters , Min 6",
      phone: (value) => {
        if (value?.length <= 10) return true;
        return "Name must be less than 10 characters.";
      },
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),
  methods: {
    logIn: async function () {
      const valid = await this.$refs.logInForm.validate();
      if (valid.valid) {
        this.loading = true;
        this.error = false;
        this.msg = null;
        const res = await signIn({
          phoneEmail: this.usePhone ? this.phone : this.email,
          password: this.password,
        });
        console.log(res);
        this.loading = false;
        this.msg = res.message;
        this.error = !res.state;
        if (res.state && res.isVerified) {
          this.$store.dispatch("logIn", res);
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
        }
      } else {
        this.msg = "Must Fill All Fields Correctly";
        this.error = true;
      }
    },
    foregetPassword: async function () {
      if (this.usePhone) {
        if (this.roules.phone(this.phone)===true) {
          this.forgetloading = true;
          this.error = false;
          this.msg = null;
          const res = await sendForegetPasswordReq(this.phone);
          this.msg = res.message+" \n "+res.emailMsg;
          this.error = !res.state;
        
        } else {
          this.error = true;
          this.msg = "Must provide phone number";
        }
      } else {
        if (this.rules.email(this.email)===true) {
          this.forgetloading = true;
          this.error = false;
          this.msg = null;
          const res = await sendForegetPasswordReq(this.email);
          this.forgetloading = false;
          this.msg = res.message+" \n "+res.emailMsg;;
          this.error = !res.state;
          
        } else {
          this.error = true;
          this.msg = "Must provide email";
        }
      }
    },
  },
};
</script>
