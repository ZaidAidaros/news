<template>
  <v-card class="ma-2 pa-4">
    <v-card-title>
      <v-row>
        
      {{ user.name }}
        <v-spacer/>
     <slot />
     </v-row>
    </v-card-title>
   
    <ResMsg :msg="msg" :error="error" />
    <v-card-subtitle>
      Registered At:
      <strong>{{ new Date(user.createdAt).toLocaleString() }}</strong>
    </v-card-subtitle>
    <v-card-subtitle>
      Last Update At:
      <strong>{{ new Date(user.createdAt).toLocaleString() }}</strong>
    </v-card-subtitle>
    <v-card-actions>
      <v-btn @click="show = !show" color="green"> Show Detials </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider />
        <v-row>
          <v-card-text>
            <strong>Email: </strong>
            {{ user.email }}
            <strong>
              - {{ user.isEmailVerified ? "Verified" : "Not Verified" }}
            </strong>
          </v-card-text>
          <v-card-text>
            <strong>Phone: </strong>
            {{ user.phone }}
            <strong>
              - {{ user.isPVerified ? "Verified" : "Not Verified" }}
            </strong>
          </v-card-text>
        </v-row>
        <v-card-actions>
          <v-text-field
            v-model="uNotification"
            color="primary"
            label="Send Notification"
            variant="underlined"
          ></v-text-field>
          <v-btn @click="userIsStopedToggel" color="red">
            {{ user.isStoped ? "UnStop User" : "Stop User" }}
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
  name: "UserComp",
  components: { ResMsg },
  props: ["user"],
  emits: ["onDelete", "onStop"],
  data() {
    return {
      show: false,
      loading: false,
      error: false,
      msg: null,
      uNotification: null,
    };
  },
  methods: {
    userIsStopedToggel: async function () {
      this.loading = true;
      this.error = false;
      this.msg = null;
      const data = {
        Id: this.user.Id,
        isStoped: !this.user.isStoped,
        notification : this.uNotification,
      };
      
      const res = await adminController.updateUser(data);
      this.loading = false;
      this.error = !res.state;
      this.msg = res.message;
      if (res.state) {
        this.user.isStoped = !this.user.isStoped;
        this.$emit("onStop", this.user);
      }
      setTimeout(() => {
        this.msg = null;
      }, 1000);
    },
    deleteUser: async function () {
      this.loading = true;
      this.error = false;
      this.msg = null;
      const res = await adminController.deleteUser(this.user.Id);
      this.loading = false;
      this.error = !res.state;
      this.msg = res.message;
      if (res.state) {
        this.$emit("onDelete", this.user.Id);
      }
      setTimeout(() => {
        this.msg = null;
      }, 1000);
    },
  },
};
</script>
