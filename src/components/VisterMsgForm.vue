<template>
  <v-card end class="d-flex flex-column ma-4 pa-4 bg-black" max-width="300px">
    <v-card-title>Send Us Message</v-card-title>
    <v-spacer />
    <v-form ref="form" @submit.prevent="submit">
      <v-text-field
        v-model="name"
        color="primary"
        label="Your Name"
        placeholder="Enter your name"
        variant="underlined"
        :rules="[required]"
      ></v-text-field>
      <v-text-field
        v-model="contact"
        color="primary"
        label="To Contact you"
        placeholder="Enter your Email Or Phone number"
        variant="underlined"
        :rules="[required]"
      ></v-text-field>
      <v-text-field
        v-model="message"
        color="primary"
        label="Your Message"
        placeholder="Enter your Message"
        variant="underlined"
        :rules="[required]"
      ></v-text-field>
    </v-form>
    <res-msg :msg="msg" :error="error" />
    <v-card-actions class="justify-end">
      <v-btn
        class="px-2"
        :loading="loading"
        color="green"
        type="submit"
        size="small"
        @click="submit"
      >
        Send
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import homeController from "@/controllers/homeController";
import ResMsg from "./ResMsg.vue";
export default {
  data() {
    return {
      loading: false,
      error: false,
      message: null,
      name: null,
      contact: null,
      msg: null,
    };
  },
  methods: {
    submit: async function () {
      const valid = await this.$refs.form.validate();
      if (!valid.valid) {
        this.msg = "Must Fill All Fields Correctly..";
        this.error = true;
        return;
      } else {
        this.loading = true;
        this.error = false;
        const res = await homeController.sendVisterMsg({
          name: this.name,
          contact: this.contact,
          content: this.message,
        });
        this.name = null;
        this.contact = null;
        this.message = null;
        this.loading = false;
        this.msg = res.message;
        this.error = !res.state;
        setTimeout(() => {
          this.msg = null;
          this.error = false;
        }, 3000);
      }
    },
    required: (value) => !!value || "Required.",
  },
  components: { ResMsg },
};
</script>
