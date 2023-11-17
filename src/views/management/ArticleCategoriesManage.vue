<template>
  <v-card flat>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="green-lighten-2"
        prepend-icon="mdi-shape-plus"
        :to="{ name: 'ArticleCategoryForm' }"
      >
        Add Category
      </v-btn>
    </v-card-actions>
    <LoadingAndErrorSc :isLoading="loading" :msg="msg" :error="error" />
    <v-virtual-scroll
      v-if="categories.length"
      :ref="scrollRef"
      :items="categories"
      item-height="70"
    >
      <template v-slot:default="{ item }">
        <CategoryComp :category="item" @on-delete="deleteCategory" />
      </template>
    </v-virtual-scroll>
  </v-card>
</template>

<script>
import CategoryComp from "@/components/CategoryComp.vue";
import LoadingAndErrorSc from "@/components/LoadingAndErrorSc.vue";
import adminController from "@/controllers/adminController";

export default {
  components: { CategoryComp, LoadingAndErrorSc },
  data() {
    return {
      loading: true,
      error: false,
      msg: null,
      scrollRef: null,
      categories: [],
    };
  },
  async mounted() {
    await this.loadCategories();
  },
  methods: {
    deleteCategory: function (id) {
      const categories = this.categories.filter((el) => el.Id !== id);
      this.categories = categories;
    },
    loadCategories: async function () {
      const categories = await this.$store.getters.getArticleCategories;
      if (categories.length) {
        this.categories = categories;
      } else {
        this.loading = true;
        this.error = false;
        this.msg = null;
        const res = await adminController.getArticlesCategories();
        this.loading = false;
        this.error = !res.state;
        this.msg = res.message;
        if (res.state) {
          if (res.categories.length) {
            this.categories = res.categories;
          } else {
            this.msg = "No Categories...";
          }
        }
      }
    },
  },
};
</script>
