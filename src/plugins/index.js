/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
//import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import router from "../router";
import { registerVuex } from "./vuex";
export function registerPlugins(app) {
  //loadFonts();
  registerVuex(app);
  app.use(vuetify).use(router);
}
