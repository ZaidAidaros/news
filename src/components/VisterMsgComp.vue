<template>
  <v-card class="ma-2 pa-4">
    <ResMsg :msg="msg" :error="error" />
    <v-row>
      <v-card-title>Name: {{ visterMsg.name }}</v-card-title>
      <v-spacer />
      <v-card-actions>
        <v-btn
          v-if="!visterMsg.isReaded"
          @click="setMsgReaded"
          :loading="readEx"
          color="green-lighten-2"
          variant="text"
          prepend-icon="mdi-check"
        >
          Mark Readed
        </v-btn>
        <v-btn
          v-if="visterMsg.isReaded"
          @click="deleteVisterMsg"
          :loading="deleteEx"
          color="red-lighten-2"
          variant="text"
          prepend-icon="mdi-note-remove"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-row>
    <v-card-subtitle>Contact: {{ visterMsg.contact }}</v-card-subtitle>
    <v-card-text class="grey mx-4 ps-2">
      Message: {{ visterMsg.content }}
    </v-card-text>
    <v-row>
      <v-card-subtitle
        >Sent At:
        <strong>
          {{ new Date(visterMsg.createdAt).toLocaleString() }}
        </strong>
      </v-card-subtitle>
      <v-card-subtitle v-if="visterMsg.isReaded">
        Readed At:
        <strong>
          {{ new Date(visterMsg.updatedAt).toLocaleString() }}
        </strong>
      </v-card-subtitle>
    </v-row>
  </v-card>
</template>
<script>
import adminController from "@/controllers/adminController";
import ResMsg from "./ResMsg.vue";
export default {
  name: "VisterMsgComp",
  props: ["visterMsg"],
  emits: ["onDeleted", "onUpdated"],
  data() {
    return {
      deleteEx: false,
      readEx: false,
      error: false,
      msg: null,
    };
  },
  methods: {
    setMsgReaded: async function () {
      this.readEx = true;
      this.error = false;
      this.msg = null;
      const res = await adminController.setVisterMsgReaded(this.visterMsg.Id);
      this.readEx = false;
      this.error = !res.state;
      this.msg = res.message;
      if (res.state) {
        this.visterMsg.isReaded = true;
        this.$emit("onUpdated", this.visterMsg);
      }
      setTimeout(() => {
        this.msg = null;
      }, 1000);
    },
    deleteVisterMsg: async function () {
      this.deleteEx = true;
      this.error = false;
      this.msg = null;
      const res = await adminController.deleteVisterMsg(this.visterMsg.Id);
      this.deleteEx = false;
      this.error = !res.state;
      this.msg = res.message;
      if (res.state) {
        this.$emit("onDeleted", this.visterMsg.Id);
      }
      setTimeout(() => {
        this.msg = null;
      }, 1000);
    },
  },
  components: { ResMsg },
};
</script>
