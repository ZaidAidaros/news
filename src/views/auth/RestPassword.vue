<template>
  <div class="justify-center">
    <v-card
      class="mx-auto py-4 px-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-img
        class="mx-auto my-8"
        max-width="100"
        max-height="100"
        src="@/assets/logo.png"
      ></v-img>

      <v-form ref="restPassForm">
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
        <v-text-field
          v-model="confirmPassword"
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
      <v-divider></v-divider>
      <!-- <v-card
        v-if="errorMsg"
        class="mb-4"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          {{ errorMsg }}
        </v-card-text>
      </v-card> -->
      <res-msg :msg="msg" :error="error" />
      <v-divider></v-divider>

      <v-btn
        @click="submit"
        :loading="loading"
        block
        class="mb-4"
        color="blue"
        size="large"
        type="submit"
        variant="elevated"
      >
        Rest Your Password
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import ResMsg from "@/components/ResMsg.vue";
import { restPassword } from "@/controllers/authController.js";
export default {
  data: () => ({
    visible: false,
    loading: false,
    error: false,
    msg: null,
    password: null,
    confirmPassword: null,
    rules: {
      required: (value) => !!value || "Required.",
      password: (value) =>
        (value.length >= 6 && value.length <= 20) ||
        "Max 20 characters , Min 6",
    },
  }),
  methods: {
    submit: async function () {
      const valid = await this.$refs.restPassForm.validate();
      if (valid.valid) {
        if (this.password === this.confirmPassword) {
          this.loading = true;
          this.error = false;
          this.msg = null;
          const res = await restPassword({
            newPassword: this.password,
            token: this.$route.query.token,
          });
          this.loading = false;
          this.error = !res.state;
          this.msg = res.message;
          if (res.state) {
            this.msg += "\n Wait Will Redirect You To Log In Page";
            setTimeout(() => {
              this.$router.push("/login");
            }, 2000);
          }
        } else {
          this.msg = "The Passwords Not Matched";
        }
      }
    },
  },
  components: { ResMsg },
};
</script>
