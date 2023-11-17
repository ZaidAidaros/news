<template>
  <v-card flat class="mx-auto pa-8" min-width="300px">
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="black-lighten-2"
        prepend-icon="mdi-shape"
        :to="{ name: 'ArticleCategoriesManage' }"
      >
        Back
      </v-btn>
    </v-card-actions>
    <v-card-title>{{ pageTitle }}</v-card-title>
    <v-form ref="categoryForm" @submit.prevent="onSubmit">
      <v-text-field
        v-model="category.name"
        color="primary"
        label="Category Name"
        variant="underlined"
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        v-model="category.description"
        color="primary"
        label="Category Description"
        variant="underlined"
        :rules="[rules.required]"
      ></v-text-field>
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
import adminController from "@/controllers/adminController";

export default {
  components: { ResMsg },
  data: () => ({
    pageTitle: "Add And Edit Articles Categories",
    loading: false,
    error: false,
    msg: null,
    category: {
      name: null,
      description: null,
    },
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),
  mounted() {
    const category = this.$store.getters.getCategory;
    if (category) {
      this.category = category;
    }
  },
  methods: {
    onSubmit: async function () {
      const valid = await this.$refs.categoryForm.validate();
      this.error = false;
      this.msg = null;
      if (valid.valid) {
        this.loading = true;
        let res = null;
        if (this.category.Id) {
          res = await adminController.updateArticleCategory(this.category);
        } else {
          res = await adminController.addArticleCategory(this.category);
        }
        this.loading = false;
        this.error = !res.state;
        this.msg = res.message;
        if (res.state) {
          await this.$store.dispatch("setCategory", null);
          this.clearForm();
        }
      } else {
        this.error = true;
        this.msg = "Must Fill Fields correctly..";
      }
    },
    clearForm: function () {
      this.category.name = null;
      this.category.description = null;

      if (this.category.Id) {
        delete this.category.Id;
      }
    },
  },
};
</script>
