// Composables
import { createRouter, createWebHistory } from "vue-router";
import auth from "@/middelware/auth";

const Home = () => import("@/views/home/Home.vue");
const ArticlePage = () => import("@/components/article/ArticlePage.vue");

// Auth
const LogIn = () => import("@/views/auth/LogIn.vue");
const SignUp = () => import("@/views/auth/SignUp.vue");
const RestPassword = () => import("@/views/auth/RestPassword.vue");

// User
const UserProfile = () => import("@/views/user/UserProfile.vue");
const UserInfoForm = () => import("@/views/user/UserInfoForm.vue");
const WritterInfoForm = () => import("@/views/user/WritterInfoForm.vue");

// Writter
const WritterArticles = () => import("@/views/writter/WritterArticles.vue");
const ArticleForm = () => import("@/views/writter/ArticleForm.vue");

// Admin
const UsersManage = () => import("@/views/management/UsersManage.vue");
const WrittersManage = () => import("@/views/management/WrittersManage.vue");
const WArticles = () => import("@/views/management/WArticles.vue");
const StatictisView = () => import("@/views/management/StatictisView.vue");
const VistersMsgs = () => import("@/views/management/VistersMsgs.vue");
const ArticleCategoriesManage = () =>
  import("@/views/management/ArticleCategoriesManage.vue");

const ArticleCategoryForm = () =>
  import("@/views/management/ArticleCategoryForm.vue");

const About = () => import("@/views/About.vue");
const NotFound = () => import("@/views/NotFound.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/articlePage/:id",
    name: "ArticlePage",
    component: ArticlePage,
  },
  // Auth
  {
    path: "/login",
    name: "LogIn",
    meta: { auth: true },
    component: LogIn,
  },
  {
    path: "/resetpassword",
    name: "RestPassword",
    meta: { auth: true },
    component: RestPassword,
  },
  {
    path: "/signup",
    name: "SignUp",
    meta: { auth: true },
    component: SignUp,
  },

  // rq auth
  // User
  {
    path: "/profile",
    name: "UserProfile",
    meta: { reqAuth: true },
    component: UserProfile,
  },
  {
    path: "/writterInfo-Form",
    name: "WritterInfoForm",
    meta: { reqAuth: true },
    component: WritterInfoForm,
  },
  {
    path: "/userInfo-Form",
    name: "UserInfoForm",
    meta: { reqAuth: true },
    component: UserInfoForm,
  },
  // Writter
  {
    path: "/writter/article-form",
    name: "ArticleForm",
    meta: { reqAuth: true, perm: "Writter" },
    component: ArticleForm,
  },
  {
    path: "/writter/w-articles",
    name: "WritterArticles",
    meta: { reqAuth: true, perm: "Writter" },
    component: WritterArticles,
  },
  // Admin
  {
    path: "/users-manage",
    name: "UsersManage",
    meta: { reqAuth: true, perm: "Admin" },
    component: UsersManage,
  },
  {
    path: "/writters-manage",
    name: "WrittersManage",
    meta: { reqAuth: true, perm: "Admin" },
    component: WrittersManage,
  },
  {
    path: "/writters-manage/w-articles/:id",
    name: "WArticles",
    meta: { reqAuth: true, perm: "Admin" },
    component: WArticles,
  },
  {
    path: "/articleCategories-manage",
    name: "ArticleCategoriesManage",
    meta: { reqAuth: true, perm: "Admin" },
    component: ArticleCategoriesManage,
  },
  {
    path: "/articleCategory-form",
    name: "ArticleCategoryForm",
    meta: { reqAuth: true, perm: "Admin" },
    component: ArticleCategoryForm,
  },
  {
    path: "/statictis-view",
    name: "StatictisView",
    meta: { reqAuth: true, perm: "Admin" },
    component: StatictisView,
  },
  {
    path: "/visters-msg",
    name: "VistersMsgs",
    meta: { reqAuth: true, perm: "Admin" },
    component: VistersMsgs,
  },
  //
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(async (to, from, next) => {
  const meta = to.meta;
  meta.isAuthenticated = await auth.isAuthenticated();
  if ("perm" in meta) {
    meta.hasThePerm = await auth.hasThePerm(meta.perm);
  }
  if (meta.auth && meta.isAuthenticated) {
    alert("You Already Loged");
    next({ name: from.name });
  }
  if (meta.reqAuth && !meta.isAuthenticated) {
    next({ name: "LogIn" });
  }

  if ("perm" in to.meta && !meta.hasThePerm) {
    alert("Access Rejected");
    next({ name: from.name });
  }

  next();
});
export default router;
