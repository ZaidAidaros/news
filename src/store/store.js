import api from "@/core/api";
import userController from "@/controllers/userController.js";
import homeController from "@/controllers/homeController";
import Vuex from "vuex";
const state = {
  appName: "News App",
  drawer: false,
  isSearch: false,
  layout: "GustLayout",
  user: null,
  writter: null,
  categories: [],
  article: null,
  category: null,
};

const getters = {
  getAppName: (state) => state.appName,
  drawerState: (state) => state.drawer,
  isSearch: (state) => state.isSearch,
  getUser: (state) => state.user,
  getWritter: (state) => state.writter,
  isAuth: (state) => state.user !== null,
  permission: (state) => state.user.permission,
  getArticleCategories: (state) => state.categories,
  getArticle: (state) => state.article,
  getCategory: (state) => state.category,
  getLayout: (state) => state.layout,
};

const mutations = {
  setAppName: (state, payload) => {
    state.appName = payload;
  },
  togleDrawer: (state) => {
    state.drawer = !state.drawer;
  },
  togleIsSearch: (state) => {
    state.isSearch = !state.isSearch;
  },
  setLayout: (state, payload) => {
    state.layout = payload;
  },
  setUser: (state, payload) => {
    state.user = payload;
  },
  setWritter: (state, payload) => {
    state.writter = payload;
  },
  setArticleCategories: (state, payload) => {
    state.categories = payload;
  },
  setArticle: (state, payload) => {
    state.article = payload;
  },
  setCategory: (state, payload) => {
    state.category = payload;
  },
};

const actions = {
  setAppName: ({ commit }, payload) => {
    commit("setAppName", payload);
  },
  init: async (context, payload) => {
    context.commit("setUser", payload.user);
    if (payload.user) {
      context.commit("setLayout", payload.user.permission + "Layout");
    }
  },
  logIn: ({ commit }, payload) => {
    api.defaults.headers.common.Authorization = "Bearer " + payload.token;
    localStorage.setItem("newsToken", "Bearer " + payload.token);
    commit("setUser", payload.user);
    commit("setLayout", payload.user.permission + "Layout");
  },
  logOut: ({ commit }, payload) => {
    localStorage.removeItem("newsToken");
    commit("setUser", null);
    commit("setLayout", "GustLayout");
  },
  togleDrawer: ({ commit }) => {
    commit("togleDrawer");
  },
  togleIsSearch: ({ commit }) => {
    commit("togleIsSearch");
  },
  setArticleCategories: ({ commit }, payload) => {
    commit("setArticleCategories", payload);
  },
  setArticle: ({ commit }, payload) => {
    commit("setArticle", payload);
  },
  setCategory: ({ commit }, payload) => {
    commit("setCategory", payload);
  },
  setUser: ({ commit }, payload) => {
    commit("setUser", payload);
  },
  setWritter: ({ commit }, payload) => {
    commit("setWritter", payload);
  },
};

const store = new Vuex.Store({ state, getters, mutations, actions });

export default store;
