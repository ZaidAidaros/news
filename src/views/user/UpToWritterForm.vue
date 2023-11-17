<template>
  <v-container>
    {{ pageTitle }}
    <v-card flat max-width="330px" class="mx-auto bg-green" justify-center>
      <v-form ref="writterForm" @submit.prevent="onSubmit" class="my-4 pa-3">
        <v-text-field
          v-model="firstName"
          color="primary"
          label="First Name"
          variant="underlined"
          :rules="[required]"
        ></v-text-field>
        <v-text-field
          v-model="midleName"
          color="primary"
          label="Middle"
          variant="underlined"
          :rules="[required]"
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          color="primary"
          label="Last Name"
          variant="underlined"
          :rules="[required]"
        ></v-text-field>
        <v-text-field
          v-model="familyName"
          color="primary"
          label="Family Name"
          variant="underlined"
          :rules="[required]"
        ></v-text-field>
        <v-text-field
          v-model="nickName"
          color="primary"
          label="Nick Name"
          variant="underlined"
          :rules="[required]"
        ></v-text-field>
        <v-text-field
          v-model="address"
          color="primary"
          label="Address"
          variant="underlined"
          :rules="[required]"
        ></v-text-field>
        <v-text-field
          v-model="nic"
          color="primary"
          label="NIC"
          variant="underlined"
          :rules="[required]"
        ></v-text-field>
        <v-checkbox
          v-model="terms"
          color="secondary"
          label="I agree to writter site terms and conditions"
        ></v-checkbox>
        <res-msg :msg="msg" :error="error" />
        <v-divider></v-divider>
        <v-card-actions class="d-flex flex-row justify-center">
          <v-btn color="red" type="cancel" variant="elevated" @click="onCancel">
            Cancel
          </v-btn>
          <v-btn
            class="px-8"
            :loading="loading"
            color="green"
            type="submit"
            variant="elevated"
            @click="onSubmit"
          >
            UpGrade
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import ResMsg from "@/components/ResMsg.vue";
import userController from "./userController.js";
export default {
  name: "UpToWritterForm",
  data: () => ({
    pageTitle: "Upgrade Your Account To Be Writter",
    loading: false,
    error: false,
    msg: null,
    firstName: null,
    midleName: null,
    lastName: null,
    familyName: null,
    nickName: null,
    nic: null,
    address: null,
    terms: false,
  }),
  methods: {
    required: (value) => !!value || "Required.",
    onSubmit: async function () {
      const valid = await this.$refs.form.validate();
      if (!valid || !this.terms) return;
      this.loading = true;
      const res = await userController.upToWritterReq({
        firstName: this.firstName,
        midleName: this.midleName,
        lastName: this.lastName,
        familyName: this.familyName,
        nickName: this.nickName,
        nic: this.nic,
        address: this.address,
      });
      this.loading = false;
      this.msg = res.message;
      if (res.status === "success") {
      } else {
        this.error = true;
      }
    },
    onCancel: function () {
      this.$emit("close");
    },
  },
  components: { ResMsg },
};
</script>
