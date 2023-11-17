<template>
  <v-virtual-scroll
    v-if="articleComments.length"
    :items="articleComments"
    max-height="400px"
  >
    <template v-slot:default="{ item }">
      <CommentComp
        :comment="item"
        :userId="myId"
        @onDeleted="onCommentDeleted"
        @onEdit="onEditComment"
      />
    </template>
  </v-virtual-scroll>
  <v-card v-if="isLoading">
    <v-progress-circular
      color="primary"
      indeterminate
      size="34"
      justify-center
      justify-content-center
    ></v-progress-circular>
  </v-card>
  <ResMsg :msg="msg" :error="error" />
  <CommentForm
    v-if="myId"
    :articleId="articleId"
    :comment="coment"
    @onSubmit="onCommentSubmit"
  />
</template>
<script>
import homeController from "@/controllers/homeController";
import CommentForm from "./CommentForm.vue";
import CommentComp from "./CommentComp.vue";
import ResMsg from "../ResMsg.vue";
export default {
  name: "CommentsList",
  props: ["articleId"],
  components: { CommentForm, CommentComp, ResMsg },
  data() {
    return {
      isLoading: true,
      error: false,
      page: 0,
      msg: null,
      myId: null,
      coment: null,
      articleComments: [],
    };
  },
  async mounted() {
    if (this.$store.getters.isAuth) {
      this.myId = this.$store.getters.getUser.Id;
    }
    await this.loadArticleComments();
  },
  methods: {
    onCommentDeleted: function (comment) {
      const comments = this.articleComments.filter(
        (el) => el.Id !== comment.Id
      );
      this.articleComments = comments;
    },
    onEditComment: function (comment) {
      this.coment = comment;
    },
    onCommentSubmit: function (comment) {
      if (this.coment) {
        const comments = this.articleComments.filter(
          (el) => el.Id !== comment.Id
        );
        this.articleComments = comments;
        this.articleComments.push(comment);
        this.coment = null;
      } else {
        this.articleComments.push(comment);
      }
    },
    loadArticleComments: async function () {
      this.isLoading = true;
      this.msg = null;
      this.error = false;
      const res = await homeController.loadArticleComments(
        this.page,
        this.articleId
      );
      this.isLoading = false;
      if (res.state && res.comments) {
        this.articleComments.push(...res.comments);
      } else {
        this.error = true;
        this.msg = res.message;
      }
    },
  },
};
</script>
