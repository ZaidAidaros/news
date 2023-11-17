import store from "@/store/store";
import api from "@/core/api";
import userController from "@/controllers/userController";

const isAuthenticated = async function () {
  const token = localStorage.getItem("newsToken");
  const isAuth = store.getters.isAuth;
  if (!isAuth) {
    if (token) {
      api.defaults.headers.common.Authorization = token;
      const res = await userController.getCurrentUser();
      if (res.state) {
        await store.dispatch("init", res);
        return true;
      } else {
        store.dispatch("init", res);
        localStorage.removeItem("newsToken");
        return false;
      }
    } else {
      return false;
    }
  } else {
    return true;
  }
};

const hasThePerm = async function (perm) {
  if (store.getters.permission === perm) {
    return true;
  }
  return false;
};

export default {
  isAuthenticated,
  hasThePerm,
};
