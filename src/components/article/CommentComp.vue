<template>
  <v-card class="ma-2 pa-2">
    <v-row>
      <v-card-text>{{ comment.user.name }}</v-card-text>
      <v-spacer />
      <v-card-actions v-if="comment.userId === userId">
        <v-btn
          color="orange-lighten-2"
          variant="text"
          prepend-icon="mdi-note-edit"
          @click="onEditComment"
        >
          Edit
        </v-btn>
        <v-btn
          @click="deleteComment"
          :loading="isLoading"
          color="red-lighten-2"
          variant="text"
          prepend-icon="mdi-note-remove"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-row>
    <res-msg :msg="msg" :error="error" />
    <v-card-text class="grey mx-4 ps-2">
      {{ comment.comment }}
    </v-card-text>
    <v-card-subtitle>{{ comment.updatedAt }}</v-card-subtitle>
  </v-card>
</template>
<script>
import userController from "@/controllers/userController";
import ResMsg from "../ResMsg.vue";
export default {
  props: ["comment", "userId"],
  emits: ["onDeleted", "onEdit"],
  components: { ResMsg },
  data: () => ({
    isLoading: false,
    error: false,
    msg: null,
  }),
  methods: {
    deleteComment: async function () {
      if (this.userId === this.comment.userId) {
        this.isLoading = true;
        this.error = false;
        this.msg = null;
        const res = await userController.deleteArticleComment(this.comment.Id);
        this.isLoading = false;
        if (res.state) {
          this.$emit("onDeleted", this.comment);
        }
        this.error = !res.state;
        this.msg = res.message;
        setTimeout(() => {
          this.msg = null;
          this.error = false;
        }, 2000);
      }
    },
    onEditComment: function () {
      this.$emit("onEdit", this.comment);
    },
  },
};
</script>
