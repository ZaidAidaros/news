<template>
  <v-tabs v-model="currentWindow" fixed-tabs>
    <v-tab
      v-for="window in windows"
      :key="window.value"
      :value="window.value"
      @click="onTab(window)"
    >
      {{ window.title }} {{ window.count }}
    </v-tab>
  </v-tabs>
  <v-window v-model="currentWindow">
    <v-window-item
      v-for="window in windows"
      :key="window.value"
      :value="window.value"
    >
      <LoadingAndErrorSc
        :isLoading="window.loading"
        :msg="window.msg"
        :error="window.error"
      />
      <v-virtual-scroll
        v-if="window.articles.length"
        :ref="window.scrollRef"
        :items="window.articles"
        height="500"
        item-height="70"
      >
        <template v-slot:default="{ item }">
          <v-card>
            <v-card-actions>
              <v-btn
                :loading="item.loading"
                :color="item.isStoped ? 'green-lighten-2' : 'red-lighten-2'"
                @click="stopArticleToggel(item)"
              >
                {{ item.isStoped ? "UnStop" : "Stop" }}
              </v-btn>
            </v-card-actions>
            <ResMsg :msg="item.msg" :error="item.error" />
            <ArticleComp :article="item" :isEditable="!item.published" />
          </v-card>
        </template>
      </v-virtual-scroll>
    </v-window-item>
  </v-window>
</template>
<script>
import adminController from "@/controllers/adminController.js";
import ArticleComp from "@/components/article/ArticleComp.vue";
import LoadingAndErrorSc from "@/components/LoadingAndErrorSc.vue";
import ResMsg from "@/components/ResMsg.vue";
import AppFastNavBtn from "@/components/AppFastNavBtn.vue";

export default {
  components: { ArticleComp, LoadingAndErrorSc, ResMsg, AppFastNavBtn },
  data() {
    return {
      loading: true,
      error: false,
      msg: null,
      scrollRef: null,
      currentWindow: "allArticles",
      currentIndex: 0,
      windows: [
        {
          index: 0,
          title: "Articles",
          value: "writterArticles",
          isStoped: false,
          count: 0,
          page: 0,
          articles: [],
          loading: true,
          isLoaded: false,
          error: false,
          msg: null,
          scrollRef: null,
        },
        {
          index: 1,
          title: "Stoped Articles",
          value: "stopedWArticles",
          isStoped: true,
          count: 0,
          page: 0,
          articles: [],
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
        await this.loadArticles(window);
      }
    },
    stopArticleToggel: async function (article) {
      article.loading = true;
      article.error = false;
      article.msg = null;
      const data = {
        Id: article.Id,
        isStoped: !article.isStoped,
      };
      const res = await adminController.updateWArticle(data);
      article.loading = false;
      article.error = !res.state;
      article.msg = res.message;
      if (res.state) {
        const articles = this.windows[this.currentIndex].articles.filter(
          (el) => el.Id !== article.Id
        );
        this.windows[this.currentIndex].articles = articles;
        this.windows[this.currentIndex].count--;
        article.isStoped = !article.isStoped;
        if (article.isStoped) {
          if (this.windows[1].isLoaded) {
            this.windows[1].articles.push(article);
            this.windows[1].count++;
          }
        } else {
          if (this.windows[0].isLoaded) {
            this.windows[0].articles.push(article);
            this.windows[0].count++;
          }
        }
      }
      setTimeout(() => {
        article.msg = null;
      }, 2000);
    },
    loadArticles: async function (window) {
      window.loading = true;
      window.error = false;
      window.msg = null;
      const res = await adminController.getWArticles(
        window.page,
        window.isStoped,
        this.$route.params.id
      );
      window.loading = false;
      if (res.state) {
        if (res.articles.length) {
          window.articles.push(...res.articles);
          if (res.count) {
            window.count = res.count;
          }
          window.page++;
          window.isLoaded = true;
        } else {
          window.msg = "There Is No Articles";
        }
      } else {
        window.msg = res.message;
        window.error = true;
      }
    },
  },
};
</script>
