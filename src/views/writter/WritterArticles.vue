<template>
  <v-tabs v-model="currentWindow" fixed-tabs>
    <v-tab
      v-for="window in windows"
      :key="window.value"
      :value="window.value"
      @click="onTab(window)"
      >{{ window.title }} {{ window.count ? window.count : "" }}</v-tab
    >
  </v-tabs>
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
    
  <v-window v-model="currentWindow">
    <v-window-item
      v-for="window in windows"
      :key="window.value"
      :value="window.value"
    >
      <v-virtual-scroll
        :ref="window.scrollRef"
        :items="sVal?window.fArticles:window.articles"
        max-height="700"
        item-height="70"
      >
        <template v-slot:default="{ item }">
          <v-card flat>
          <v-card-subtitle>{{item.articleCategory.name}}</v-card-subtitle>
          <ArticleComp
            :article="item"
            :isEditable="!item.published"
            @onArticleDeleted="deleteArticle"
          />
          </v-card>
        </template>
      </v-virtual-scroll>
      <LoadingAndErrorSc
        :isLoading="window.loading"
        :msg="window.msg"
        :error="window.error"
      />
    </v-window-item>
    
  </v-window>
</template>
<script>
import writterController from "@/controllers/writterController";
import ArticleComp from "@/components/article/ArticleComp.vue";
import LoadingAndErrorSc from "@/components/LoadingAndErrorSc.vue";

export default {
  components: { ArticleComp, LoadingAndErrorSc },
  data() {
    return {
      sVal: null,
      currentWindow: "publishedArticles",
      currentIndex: 0,
      windows: [
        {
          index: 0,
          title: "Published Articles",
          value: "publishedArticles",
          count: 0,
          page: 0,
          articles: [],
          fArticles: [],
          published: true,
          loading: true,
          isLoaded: false,
          error: false,
          msg: null,
          scrollRef: null,
        },
        {
          index: 1,
          title: "UnPublished Articles",
          value: "unPublishedArticles",
          count: 0,
          page: 0,
          articles: [],
          fArticles: [],
          published: false,
          loading: true,
          isLoaded: false,
          error: false,
          msg: null,
          scrollRef: null,
        },
      ],
    };
  },
  async mounted() {
    await this.onTab(this.windows[0]);
  },
  methods: {
    onTab: async function (window) {
      this.currentWindow = window.value;
      this.currentIndex = window.index;
      if (!window.articles.length) {
        await this.loadMyArticles(window);
      }
    },
    onSChange:function(){
      this.windows[this.currentIndex].msg=null;
      if(this.sVal){
        this.windows[this.currentIndex].fArticles = this.windows[
          this.currentIndex
          ].articles.filter((art)=>{
          return (
          art.title.includes(this.sVal) ||
          art.shortContent.includes(this.sVal) ||
          art.content.includes(this.sVal)
        );
        });
      }
    },
    onSearch:async function(){
      if(this.sVal){
      const window = this.windows[this.currentIndex]; 
      window.loading = true;
      window.error = false;
      window.msg = null;
      const res = await writterController.searchWritterArticles(
        this.sVal,
        window.published,
        window.page
      );
      window.loading = false;
      window.error = !res.state;
      window.msg = res.message;
      if (res.state) {
        if (res.articles.length) {
          window.fArticles = res.articles;
          if (res.count) {
            window.count = res.count;
          }
          window.isLoaded = true;
        } else {
          window.msg = "There Is No articles mutched";
        }
      }
      }
    },
    updateArticle: function (article) {
      this.deleteArticle(article.Id);
      if (article.published) {
        if (this.windows[0].isLoaded) {
          this.windows[0].articles.push(article);
          this.windows[0].count++;
        }
      } else {
        if (this.windows[1].isLoaded) {
          this.windows[1].articles.push(article);
          this.windows[1].count++;
        }
      }
    },
    deleteArticle: function (Id) {
      const articles = this.windows[this.currentIndex].articles.filter(
        (el) => el.Id !== Id
      );
      this.windows[this.currentIndex].articles = articles;
      this.windows[this.currentIndex].count--;
    },
    loadMyArticles: async function (window) {
      window.loading = true;
      window.error = false;
      window.msg = null;
      const res = await writterController.loadWritterArticles(
        window.published,
        window.page
      );
      window.loading = false;
      window.error = !res.state;
      window.msg = res.message;
      if (res.state) {
        if (res.articles.length) {
          window.articles.push(...res.articles);
          if (res.count) {
            window.count = res.count;
          }
          window.page++;
          window.isLoaded = true;
        } else {
          window.msg = "There Is No articles";
        }
      }
    },
  },
};
</script>
