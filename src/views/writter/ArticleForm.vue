<template>
  <v-card flat class="mx-auto pa-8" :title="pageTitle" min-width="300px">
    <v-form ref="articleForm" @submit.prevent="onSubmit">
      <v-text-field
        v-model="article.title"
        color="primary"
        label="Title Of Article"
        variant="underlined"
        :rules="[rules.required]"
      ></v-text-field>
      <v-select
        v-if="categories.length"
        v-model="article.articleCategoryId"
        label="Category"
        :items="categories"
        item-title="name"
        item-value="Id"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item
            v-bind="props"
            :subtitle="item.description"
          ></v-list-item>
        </template>
      </v-select>
      <v-text-field
        v-model="article.shortContent"
        color="primary"
        label="Short Cut Of Article"
        variant="underlined"
        :rules="[rules.required]"
      ></v-text-field>
      <v-textarea
        v-model="article.content"
        color="primary"
        label="Article Content"
        variant="underlined"
        :rules="[rules.required]"
      ></v-textarea>
      <v-card flat class="ma-2" max-height="250px">
      <v-card-title>
      <v-file-input
        v-model="image"
        :rules="[rules.imageValidate]"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Pick Img"
        prepend-icon="mdi-camera"
        label="Upload Article Image"
        @change="onImgSelect"
      ></v-file-input>
      </v-card-title>
      <v-card-text>
      <v-img
      v-if="imgPreview" 
      :src="imgPreview"
      max-height="200px"
      aspect-ratio="1"
      />
      </v-card-text>
      </v-card>
      <v-checkbox
        v-model="article.published"
        color="secondary"
        label="Save and Publish "
      ></v-checkbox>
    </v-form>

    <v-divider />
    <res-msg :msg="msg" :error="error" />
    <v-divider />
    <v-card-actions class="mx-10" end>
      <v-spacer />
      <v-btn width="100px" color="grey" variant="elevated" @click="clearForm">
        Clear
      </v-btn>
      <v-btn
        width="100px"
        :loading="loading"
        color="green"
        type="submit"
        variant="elevated"
        @click="onSubmit"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ResMsg from "@/components/ResMsg.vue";
import writterController from "@/controllers/writterController";
import homeController from "@/controllers/homeController";
export default {
  data: () => ({
    pageTitle: "Add And Edit Articles",
    loading: false,
    error: false,
    msg: null,
    imgPreview: null,
    isEdit: false,
    article: {
      title: null,
      shortContent: null,
      content: null,
      articleCategoryId: null,
      published: false,
    },
    image: null,
    categories: [],
    rules: {
      required: (value) => !!value || "Required.",
      imageValidate: (value) => {
        return (
          !value ||
          !value.length ||
          value[0].size < 2000000 ||
          "Avatar size should be less than 2 MB!"
        );
      },
    },
  }),
  async mounted() {
    await this.loadCategories();
    await this.loadArticle();
  },
  methods: {
    onSubmit: async function () {
      const valid = await this.$refs.articleForm.validate();
      this.error = false;
      this.msg = null;
      if (valid.valid && this.article.articleCategoryId) {
        this.loading = true;
        const data = new FormData();
        data.append("article", JSON.stringify(this.article));
        if (this.image) {
          data.append("img", this.image[0]);
        }

        const res = await writterController.submitArticleForm(
          data,
          this.article.Id
        );
        this.loading = false;
        this.error = !res.state;
        this.msg = res.message;
        if (res.state) {
          if (this.isEdit) {
            await this.$store.dispatch("setArticle", null);
            this.$router.back();
          } else {
            this.clearForm();
          }
        }
      } else {
        this.error = true;
        this.msg = "Must Fill Fields correctly..";
      }
    },
    onImgSelect: function (e) {
      this.imgPreview = URL.createObjectURL(this.image[0]);
    },
    loadArticle: async function () {
      const artic = this.$store.getters.getArticle;
      if (artic) {
        this.article = artic;
        this.isEdit = true;
        if (this.article.image) {
          this.imgPreview = "http://localhost:4444/api/" + this.article.image;
        }
      }
    },
    loadCategories: async function () {
      if (this.$store.getters.getArticleCategories.length) {
        this.categories = this.$store.getters.getArticleCategories;
      } else {
        this.isLoading = true;
        this.msg = null;
        this.error = false;
        const res = await homeController.loadCategories();
        this.isLoading = false;
        if (res.state) {
          this.categories = [...res.categories];
          this.$store.dispatch("setArticleCategories", this.categories);
        } else {
          this.error = true;
          this.msg = res.message;
        }
      }
    },
    clearForm: function () {
      this.article.title = null;
      this.article.shortContent = null;
      this.article.content = null;
      this.article.articleCategoryId = null;
      this.article.published = false;
      this.image = null;
      this.imgPreview = null;
      if (this.article.Id) {
        delete this.article.Id;
      }
      if (this.article.image) {
        delete this.article.image;
        delete this.article.Id;
      }
    },
  },
  components: { ResMsg },
};
</script>
