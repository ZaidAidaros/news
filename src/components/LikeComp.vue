<template>
  <v-card flat class="d-flex flex-row">
    <v-card-text>
      {{ likesCount > 1000 ? likesCount / ~1000 + "K" : likesCount }}
    </v-card-text>
    <v-btn
      class="px2"
      :icon="this.like && like.like ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'"
      @click="onLikeAc(true)"
    ></v-btn>
    <v-card-text>
      {{ disLikesCount > 1000 ? disLikesCount / ~1000 + "K" : disLikesCount }}
    </v-card-text>
    <v-btn
      class="px2"
      :icon="
        this.like && !like.like ? 'mdi-thumb-down' : 'mdi-thumb-down-outline'
      "
      @click="onLikeAc(false)"
    ></v-btn>
  </v-card>
  <res-msg :msg="msg" :error="error" />
</template>

<script>
import userController from "@/controllers/userController";
import ResMsg from "./ResMsg.vue";
export default {
  name: "LikeComp",
  props: ["articleLikes", "articleId"],
  components: { ResMsg },
  data() {
    return { like: null, isAuth: false, likes: [], error: false, msg: null };
  },
  mounted() {
    this.likes = this.articleLikes;
    this.isAuth = this.$store.getters.isAuth;
    if (this.isAuth && this.likes.length) {
      this.likes.forEach((element) => {
        if (element.userId === this.$store.getters.getUser.Id) {
          this.like = element;
        }
      });
    }
  },
  computed: {
    likesCount() {
      return this.likes.filter((like) => like.like).length;
    },
    disLikesCount() {
      return this.likes.filter((like) => !like.like).length;
    },
  },
  methods: {
    onLikeAc: async function (isLike) {
      if (this.isAuth) {
        this.error = false;
        this.msg = null;
        const res = await userController.onLike(
          isLike,
          this.articleId,
          this.like
        );
        if (res.state) {
          if (this.like) {
            if (this.like.like === isLike) {
              const updatedLikes = this.likes.filter(
                (el) => el.Id !== this.like.Id
              );
              this.likes = updatedLikes;
              this.like = null;
            } else {
              this.like.like = isLike;
              const updatedLikes = this.articleLikes.map((obj) =>
                obj.Id === this.like.Id ? this.like : obj
              );
              this.likes = updatedLikes;
            }
          } else {
            this.like = res.articleLike;
            this.articleLikes.push(this.like);
          }
        } else {
          this.msg = res.message;
          this.error = true;
          setTimeout(() => {
            this.error = false;
            this.msg = null;
          }, 2000);
        }
      } else {
        this.$router.push({ name: "LogIn" });
      }
    },
  },
};
</script>
