<template>
  <v-card flat class="d-flex flex-column">
    <v-card class="pa-0 bg-black">
      <v-tabs v-model="currentItem" fixed-tabs>
        <v-tab
          v-if="items.length"
          v-for="item in items"
          :key="item.Id"
          :value="item.name"
        >
          {{ item.name }}
        </v-tab>

        <v-menu v-if="more.length">
          <template v-slot:activator="{ props }">
            <v-btn
              variant="plain"
              rounded="0"
              class="align-self-center me-4"
              height="100%"
              v-bind="props"
            >
              more
              <v-icon end> mdi-menu-down </v-icon>
            </v-btn>
          </template>
          <v-list class="bg-grey-lighten-3">
            <v-list-item
              v-for="item in more"
              :key="item.Id"
              @click="addItem(item)"
            >
              {{ item.name }}
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tabs>
    </v-card>
    <v-window v-model="currentItem">
      <v-window-item
        v-for="item in [...items, ...more]"
        :key="item.Id"
        :value="item.name"
      >
        <ArticlesList :categoryId="item.Id" />
      </v-window-item>
    </v-window>
    <LoadingAndErrorSc :isLoading="isLoading" :error="error" :msg="msg" />
  </v-card>
</template>
<script>
import homeController from "@/controllers/homeController.js";
import ArticlesList from "@/components/article/ArticlesList.vue";
import ResMsg from "@/components/ResMsg.vue";
import LoadingAndErrorSc from "@/components/LoadingAndErrorSc.vue";

export default {
  name: "HomeBody",
  components: { ArticlesList, ResMsg, LoadingAndErrorSc },
  data() {
    return {
      currentItem: null,
      isLoading: false,
      error: false,
      msg: null,
      categories: [],
      items: [],
      more: [],
    };
  },
  async mounted() {
    await this.setCategories();
  },
  methods: {
    loadCategories: async function () {
      this.isLoading = true;
      this.msg = null;
      this.error = false;
      const res = await homeController.loadCategories();
      this.isLoading = false;
      if (res.state) {
        if (res.categories.length) {
          this.categories = res.categories;
          this.$store.dispatch("setArticleCategories", this.categories);
        } else {
          this.msg = "No Categories Until Now ....";
        }
      } else {
        this.error = true;
        this.msg = res.message;
      }
    },
    addItem: function (item) {
      const removed = this.items.splice(0, 1);
      this.items.push(...this.more.splice(this.more.indexOf(item), 1));
      this.more.push(...removed);
      this.$nextTick(() => {
        this.currentItem = item.name;
      });
    },
    setCategories: async function () {
      if (this.$store.getters.getArticleCategories.length) {
        this.categories = this.$store.getters.getArticleCategories;
      } else {
        await this.loadCategories();
      }
      const length = this.categories.length;
      if (length > 3) {
        this.more = [...this.categories.splice(3, length)];
        this.items = [...this.categories.splice(0, 3)];
      } else {
        this.items = this.categories;
      }
      if (this.items.length) {
        this.currentItem = this.items[0].name;
      }
    },
  },
};
</script>

<style>
.justContentCenter {
  justify-content: center;
}
</style>
