<template>
  <v-card flat>
    <v-card v-if="$store.getters.isSearch" class="ma-2 pa-2">
      <v-card-text>
        <v-row justify="center">
          <v-text-field
            v-model="sVal"
            color="blue"
            label="Search"
            variant="underlined"
            :clearable="true"
            @update:model-value="onSChange"
          ></v-text-field>
          <v-btn @click="onSearch" color="blue" class="ma-3">Search</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
    <v-virtual-scroll
      ref="scrollRef"
      v-if="!isLoading && !msg"
      :items="sVal ? fArticles : articles"
      max-height="700px"
    >
      <template v-slot:default="{ item }">
        <ArticleComp :article="item" :isEditable="isEditable" />
      </template>
    </v-virtual-scroll>
  </v-card>
  <LoadingAndErrorSc :isLoading="isLoading" :msg="msg" :error="error" />
  <v-card-actions v-if="pageCount > 1 && page !== pageCount">
    <v-spacer />
    <v-btn @click="loadArticles">More..</v-btn>
    <v-card-text>{{ page }}/{{ pageCount }}</v-card-text>
  </v-card-actions>
</template>
<script>
import homeController from "@/controllers/homeController.js";
import ArticleComp from "./ArticleComp.vue";
import LoadingAndErrorSc from "../LoadingAndErrorSc.vue";
import { ref } from "vue";

export default {
  name: "ArticlesList",
  props: ["categoryId", "isEditable"],
  components: { ArticleComp, LoadingAndErrorSc },
  data() {
    return {
      isLoading: true,
      error: false,
      page: 0,
      pageSize: 0,
      pageCount: 1,
      count: 0,
      msg: null,
      sVal: null,
      articles: [],
      fArticles: [],
    };
  },
  async mounted() {
    await this.loadArticles();
  },
  methods: {
    filterArticles: function () {
      this.fArticles = this.articles.filter((el) => {
        return (
          el.title.includes(this.sVal) ||
          el.shortContent.includes(this.sVal) ||
          el.content.includes(this.sVal)
        );
      });
    },
    onSChange: function (val) {
      this.sVal = val;
      this.msg = null;
      this.error = false;
      this.filterArticles();
    },
    onSearch: async function () {
      if (this.sVal) {
        this.isLoading = true;
        this.msg = null;
        this.error = false;
        this.page = 0;
        const res = await homeController.search(
          this.sVal,
          this.page,
          this.categoryId
        );

        this.isLoading = false;
        this.error = !res.state;
        this.msg = res.message;

        if (res.state) {
          if (res.articles.length) {
            this.fArticles = res.articles;
            if (res.count) {
              this.count = res.count;
              this.pageCount = res.pageCount;
            }
          } else {
            this.msg = "No Articles ...";
          }
        }
      }
    },
    goToArticlePage: function (item) {
      this.$router.push({
        name: "ArticlePage",
        props: { article: item, isEditable: false },
      });
    },
    loadArticles: async function () {
      this.isLoading = true;
      this.msg = null;
      this.error = false;
      const res = await homeController.loadCategoryArticles(
        this.page,
        this.categoryId
      );
      this.isLoading = false;
      this.error = !res.state;
      this.msg = res.message;

      if (res.state) {
        if (res.articles.length) {
          this.articles.push(...res.articles);
          if (res.count) {
            this.count = res.count;
            this.pageCount = res.pageCount;
          }
          this.page++;
        } else {
          this.msg = "No Articles ...";
        }
      }
    },
  },
};
</script>
