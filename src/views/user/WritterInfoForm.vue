<template>
  <v-card flat max-width="400px" class="mx-auto pa-8" justify-center>
    <v-card-text><image-comp src="src/assets/logo.png" /></v-card-text>
    <v-card-text>{{ pageTitle }}</v-card-text>
    <v-card-text>
      <v-form ref="writterForm" @submit.prevent="onSubmit" class="my-2">
        <v-text-field
          v-model="writter.firstName"
          color="primary"
          label="First Name"
          variant="underlined"
          :rules="[required]"
        ></v-text-field>
        <v-text-field
          v-model="writter.middelName"
          color="primary"
          label="Middle"
          variant="underlined"
          :rules="[required]"
        ></v-text-field>
        <v-text-field
          v-model="writter.lastName"
          color="primary"
          label="Last Name"
          variant="underlined"
          :rules="[required]"
        ></v-text-field>
        <v-text-field
          v-model="writter.familyName"
          color="primary"
          label="Family Name"
          variant="underlined"
          :rules="[required]"
        ></v-text-field>
        <v-text-field
          v-model="writter.nickName"
          color="primary"
          label="Nick Name"
          variant="underlined"
          :rules="[required]"
        ></v-text-field>
        <v-text-field
          v-model="writter.address"
          color="primary"
          label="Address"
          variant="underlined"
          :rules="[required]"
        ></v-text-field>
        <v-text-field
          v-model="writter.nic"
          color="primary"
          label="NIC"
          variant="underlined"
          :rules="[required]"
        ></v-text-field>
        <v-text-field
          v-model="writter.references"
          color="primary"
          label="References"
          variant="underlined"
          :rules="[required]"
        ></v-text-field>
        <v-checkbox
          v-if="!isEdit"
          v-model="terms"
          label="I agree to writter site terms and conditions"
        ></v-checkbox>
        <res-msg :msg="msg" :error="error" />
        <v-divider></v-divider>
      </v-form>
    </v-card-text>
    <v-card-actions class="d-flex flex-row justify-center">
      <v-btn
        :loading="loading"
        block
        color="green"
        size="large"
        type="submit"
        variant="elevated"
        large
        @click="onSubmit"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ImageComp from "@/components/ImageComp.vue";
import ResMsg from "@/components/ResMsg.vue";
import userController from "@/controllers/userController.js";
export default {
  name: "WritterInfoForm",
  components: { ResMsg, ImageComp },
  data: () => ({
    pageTitle: "Upgrade Your Account To Be Writter",
    loading: false,
    error: false,
    msg: null,
    writter: {
      firstName: null,
      middelName: null,
      lastName: null,
      familyName: null,
      nickName: null,
      nic: null,
      address: null,
      references: null,
    },
    terms: false,
    isEdit: false,
  }),
  mounted() {
    const w = this.$store.getters.getWritter;
    if (w) {
      this.writter = w;
      this.isEdit = true;
    }
  },
  methods: {
    required: (value) => !!value || "Required.",
    onSubmit: async function () {
      const valid = await this.$refs.writterForm.validate();

      if (valid.valid && (this.terms || this.isEdit)) {
        this.loading = true;
        this.error = false;
        this.msg = null;
        let res = null;
        if (this.isEdit) {
          res = await userController.updateWritterInfo(this.writter);
        } else {
          res = await userController.upToWritterReq(this.writter);
        }
        this.loading = false;
        this.msg = res.message;
        this.error = !res.state;
        if (res.state) {
          this.$store.dispatch("setWritter", null);
          setTimeout(() => {
            this.msg = null;
            this.$router.back();
          }, 2000);
        }
      } else {
        if (!this.terms && !this.isEdit) {
          this.msg = "You must accept our terms";
          this.error = true;
          return;
        }
        this.msg = "You must Fill Fields Correctly";
        this.error = true;
      }
    },
  },
};
</script>
