import store from "@/store/store.js";

export function registerVuex(app) {
  app.use(store);
}
