<template>
  <v-card class="ma-2 pa-2">
    <v-row>
      <v-card-title> {{ article.title }} </v-card-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="isEditable"
        color="orange-lighten-2"
        variant="text"
        prepend-icon="mdi-note-edit"
        @click="goToEditArticleForm"
      >
        Edit
      </v-btn>
      <v-btn
        v-if="isEditable"
        @click="deleteArticle"
        :loading="isLoading"
        color="red-lighten-2"
        variant="text"
        prepend-icon="mdi-note-remove"
      >
        Delete
      </v-btn>
    </v-row>
    <res-msg :msg="msg" :error="error" />
    <v-card-subtitle v-if="article.writter">
      Writter: {{ article.writter.name }}
    </v-card-subtitle>
    <v-card-subtitle>{{ article.updatedAt }} </v-card-subtitle>
    <v-card flat max-height="250">
      <v-row>
        <v-col cols="8">
          <v-card-text>
            {{ article.shortContent }}
          </v-card-text>
        </v-col>
        <v-col cols="4">
          <image-comp
            :src="article.image"
            :alt="article.title"
            mx_h="200px"
          />
        </v-col>
      </v-row>
    </v-card>
    <v-card-actions>
      <v-btn color="green-lighten-2" variant="text" @click="goToArticlePage"
        >Explore<v-icon end>{{
          show ? "mdi-chevron-up" : "mdi-gesture-tap"
        }}</v-icon>
      </v-btn>
      <!-- <v-spacer />
      <v-btn color="blue-lighten-2" variant="text" @click="shareArticle"
        >Share<v-icon end>mdi-share-variant</v-icon>
      </v-btn> -->
      <v-spacer />
      <like-comp
        :article-likes="article.articleLikes"
        :article-id="article.Id"
      />
    </v-card-actions>
  </v-card>
</template>
<script>
import writterController from "@/controllers/writterController";
import LikeComp from "../LikeComp.vue";
import ResMsg from "../ResMsg.vue";
import ImageComp from "../ImageComp.vue";

export default {
  name: "ArticleComp",
  props: ["article", "isEditable"],
  data: () => ({
    isLoading: false,
    error: false,
    msg: null,
    show: false,
    comm: false,
    like: false,
    newComment: null,
  }),
  mounted() {
    this.article.comments = [];
  },
  computed: {
    comments() {
      return this.article.comments ? this.article.comments : [];
    },
  },
  methods: {
    shareArticle: function () {},
    deleteArticle: async function () {
      this.isLoading = true;
      this.error = false;
      this.msg = null;
      const res = await writterController.deleteArticle(this.article.Id);
      this.isLoading = false;
      this.error = !res.state;
      this.msg = res.message;
      setTimeout(() => {
        this.msg = null;
        this.error = false;
      }, 2000);
      if (res.state) {
        this.$emit("onArticleDeleted", this.article.Id);
      }
    },
    goToEditArticleForm: async function () {
      await this.$store.dispatch("setArticle", this.article);
      this.$router.push({ name: "ArticleForm" });
    },
    goToArticlePage: async function () {
      await this.$store.dispatch("setArticle", this.article);
      this.$router.push({
        name: "ArticlePage",
        params: { id: this.article.Id },
      });
    },
  },
  components: { LikeComp, ResMsg, ImageComp },
};
</script>
