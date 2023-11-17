<template>
  <v-progress-circular
    v-if="isLoading"
    color="primary"
    indeterminate
    size="34"
  ></v-progress-circular>
  <ResMsg :msg="msg" :error="error" />

  <v-card v-if="!isLoading && !error && article" flat class="pa-2">
    <v-card-title>{{ article.title }}</v-card-title>
    <v-card-subtitle v-if="article.writter">
      Writter: {{ article.writter.name }}
    </v-card-subtitle>
    <v-card-subtitle>{{ article.updatedAt }} </v-card-subtitle>
    <v-card-text>
      {{ article.shortContent }}
    </v-card-text>
    <ImageComp
      :src="article.image"
      :alt="article.title"
      mx_h="300px"
    />
    <v-card-text> {{ article.content }}</v-card-text>
    <v-card-actions class="px-4">
      <v-spacer />
      <v-btn
        icon="mdi-comment-text-multiple"
        @click="onShowComments"
        class="mx-4"
      ></v-btn>
      <like-comp :article-likes="likes" :article-id="article.Id" />
    </v-card-actions>
    <v-divider />
    <CommentsList v-if="showComments" :articleId="article.Id" />
  </v-card>
</template>
<script>
import ImageComp from "../ImageComp.vue";
import LikeComp from "../LikeComp.vue";
import CommentsList from "./CommentsList.vue";
import ResMsg from "../ResMsg.vue";
import homeController from "@/controllers/homeController";

export default {
  name: "ArticlePage",
  components: { LikeComp, CommentsList, ImageComp, ResMsg },
  data: () => ({
    isLoading: false,
    error: false,
    msg: null,
    showComments: false,
    article: null,
  }),
  async mounted() {
    const art = this.$store.getters.getArticle;
    if (art) {
      this.article = art;
    } else {
      this.isLoading = true;
      this.error = false;
      this.msg = null;
      const res = await homeController.loadArticle(this.$route.params.id);
      this.isLoading = false;
      if (res.state) {
        this.article = res.article;
      } else {
        this.error = true;
        this.msg = res.message;
      }
    }
  },
  computed: {
    likes() {
      return this.article.articleLikes ? this.article.articleLikes : [];
    },
    comments() {
      return this.article.articleComments ? this.article.articleComments : [];
    },
    commentsCount() {
      return this.comments.length;
    },
  },
  methods: {
    onShowComments: function () {
      this.showComments = !this.showComments;
    },
  },
};
</script>
