<template>
  <v-card flat class="d-flex flex" max-height="100px">
    <v-card-text>
      <v-form ref="commentForm" @submit.prevent="onSubmit">
        <v-text-field
          v-model="commentContent"
          color="primary"
          label="Title Of Article"
          variant="underlined"
          :rules="[required]"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions end>
      <v-btn
        :loading="loading"
        class="ma-4"
        append-icon="mdi-send"
        color="green"
        type="submit"
        end
        @click="onSubmit"
      >
        Send
      </v-btn>
    </v-card-actions>
  </v-card>
  <res-msg :msg="msg" :error="error" />
</template>
<script>
import userController from "@/controllers/userController";
import ResMsg from "../ResMsg.vue";
export default {
  components: { ResMsg },
  props: ["articleId", "comment"],
  emits: ["onSubmit"],
  data() {
    return {
      loading: false,
      error: false,
      msg: null,
      commentContent: null,
    };
  },
  updated() {
    if (this.comment) {
      this.commentContent = this.comment.comment;
    }
  },
  methods: {
    required: (value) => !!value || "Required.",
    onSubmit: async function () {
      const valid = await this.$refs.commentForm.validate();
      const isAuth = this.$store.getters.isAuth;
      if (valid.valid && isAuth) {
        this.error = false;
        this.msg = null;
        this.loading = true;
        let res = null;
        if (this.comment) {
          this.comment.comment = this.commentContent;
          res = await userController.updateArticleComment(this.comment);
          if (res.state) {
            res.comment = this.comment;
          }
        } else {
          res = await userController.sendArticleComment({
            articleId: this.articleId,
            comment: this.commentContent,
          });
          if (res.state) {
            res.comment.user = this.$store.getters.getUser;
          }
        }
        this.loading = false;
        if (res.state) {
          this.$emit("onSubmit", res.comment);
          this.commentContent = null;
        }
        this.error = !res.state;
        this.msg = res.message;
        setTimeout(() => {
          this.error = false;
          this.msg = null;
        }, 2000);
      } else {
        this.error = true;
        this.msg = "Can Not Send Empty Comment";
        setTimeout(() => {
          this.msg = null;
          this.error = false;
        }, 2000);
      }
    },
  },
};
</script>
