<template>
  <v-card class="ma-2 pa-4">
    <v-card-title>{{ writter.fullName }}</v-card-title>
    <ResMsg :msg="msg" :error="error" />
    <v-card-subtitle>
      Sent At:
      <strong>{{ new Date(writter.createdAt).toLocaleString() }}</strong>
    </v-card-subtitle>
    <v-card-subtitle>
      Last Update At:
      <strong>{{ new Date(writter.updatedAt).toLocaleString() }}</strong>
    </v-card-subtitle>
    <v-card-actions>
      <v-btn @click="show = !show" color="green"> Show Detials </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider />
        <v-row>
          <v-card-text>
            <strong>Nick Name: </strong>
            {{ writter.nickName }}
          </v-card-text>
          <v-card-text>
            <strong>Family Name: </strong>
            {{ writter.familyName }}
          </v-card-text>
          <v-card-text>
            <strong>NIC: </strong>
            {{ writter.nic }}
          </v-card-text>
          <v-card-text>
            <strong>Address: </strong>
            {{ writter.address }}
          </v-card-text>
        </v-row>
        <v-divider />
        <v-card-text>
          <strong>References: </strong>
          {{ writter.references }}
        </v-card-text>
        <v-text-field
          v-model="wNotification"
          color="primary"
          label="Send Notification"
          variant="underlined"
        ></v-text-field>
        <v-card-actions>
          <v-btn
            v-if="writter.isApproved"
            color="green"
            :to="{ name: 'WArticles', params: { id: writter.Id } }"
          >
            His Articles
          </v-btn>
          <v-spacer />

          <v-btn
            v-if="!writter.isApproved"
            @click="handleWritterReq(true)"
            color="blue"
          >
            Approve
          </v-btn>
          <v-btn
            v-if="writter.isApproved === null"
            @click="handleWritterReq(false)"
            color="red"
          >
            Reject
          </v-btn>
          <v-btn
            v-if="writter.isApproved"
            @click="writterIsStopedToggel"
            color="red"
          >
            {{ writter.isStoped ? "UnStop Writter" : "Stop Writter" }}
          </v-btn>
        </v-card-actions>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
import adminController from "@/controllers/adminController.js";
import ResMsg from "./ResMsg.vue";
export default {
  name: "WritterComp",
  components: { ResMsg },
  props: ["writter"],
  emits: ["onDelete", "onApprove", "onStop"],
  data() {
    return {
      show: false,
      loading: false,
      error: false,
      msg: null,
      wNotification: null,
    };
  },
  methods: {
    handleWritterReq: async function (isApproved) {
      this.loading = true;
      this.error = false;
      this.msg = null;
      const data = {
        Id: this.writter.Id,
        isApproved,
        userId: this.writter.userId,
      };
      if (this.wNotification) {
        data.notification = this.wNotification;
      }
      const res = await adminController.updateWritter(data);
      this.loading = false;
      this.error = !res.state;
      this.msg = res.message;
      if (res.state) {
        this.writter.isApproved = isApproved;
        this.$emit("onApprove", this.writter);
      }
      setTimeout(() => {
        this.msg = null;
      }, 1000);
    },
    writterIsStopedToggel: async function () {
      this.loading = true;
      this.error = false;
      this.msg = null;
      const data = {
        Id: this.writter.Id,
        isStoped: !this.writter.isStoped,
        userId: this.writter.userId,
      };
      if (this.wNotification) {
        data.notification = this.wNotification;
      }
      const res = await adminController.updateWritter(data);
      this.loading = false;
      this.error = !res.state;
      this.msg = res.message;
      if (res.state) {
        this.writter.isStoped = !this.writter.isStoped;
        this.$emit("onStop", this.writter);
      }
      setTimeout(() => {
        this.msg = null;
      }, 1000);
    },
    deleteWritter: async function () {
      this.loading = true;
      this.error = false;
      this.msg = null;
      const res = await adminController.deleteWritter(this.writter.Id);
      this.loading = false;
      this.error = !res.state;
      this.msg = res.message;
      if (res.state) {
        this.$emit("onDelete", this.writter.Id);
      }
      setTimeout(() => {
        this.msg = null;
      }, 1000);
    },
  },
};
</script>
