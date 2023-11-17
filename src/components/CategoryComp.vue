<template>
  <v-card class="ma-2 pa-4">
    <ResMsg :msg="msg" :error="error" />
    <v-row>
      <v-card-title>{{ category.name }}</v-card-title>
      <v-spacer />
      <v-card-actions>
        <v-btn
          @click="gotoEtitCategory"
          color="orange-lighten-2"
          variant="text"
          prepend-icon="mdi-note-edit"
        >
          Edit
        </v-btn>
        <v-btn
          @click="deleteCategory"
          :loading="loading"
          color="red-lighten-2"
          variant="text"
          prepend-icon="mdi-note-remove"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-row>
    <v-card-subtitle>
      Last Update At:
      <strong>{{ new Date(category.updatedAt).toLocaleString() }}</strong>
    </v-card-subtitle>
    <v-card-subtitle>
      Added At:
      <strong>{{ new Date(category.createdAt).toLocaleString() }}</strong>
    </v-card-subtitle>
    <v-card-text>
      {{ category.description }}
    </v-card-text>
  </v-card>
</template>
<script>
import adminController from "@/controllers/adminController.js";
import ResMsg from "./ResMsg.vue";
export default {
  name: "CategoryComp",
  components: { ResMsg },
  props: ["category"],
  emits: ["onDelete"],
  data() {
    return {
      loading: false,
      error: false,
      msg: null,
    };
  },
  methods: {
    gotoEtitCategory: async function () {
      await this.$store.dispatch("setCategory", this.category);
      this.$router.push({ name: "ArticleCategoryForm" });
    },
    deleteCategory: async function () {
      this.loading = true;
      this.error = false;
      this.msg = null;
      const res = await adminController.deleteArticleCategory(this.category.Id);
      this.loading = false;
      this.error = !res.state;
      this.msg = res.message;
      if (res.state) {
        this.$emit("onDelete", this.category.Id);
      }
      setTimeout(() => {
        this.msg = null;
      }, 1000);
    },
  },
};
</script>
