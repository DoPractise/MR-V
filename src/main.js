import Vue from "vue";
// import "lib-flexible"
import App from "./App";
import router from "./router";
import "@/styles/index.scss";
import store from '@/store';
import icbComponents from "@/components";
import $ from "jquery";
window.$ = window.jQuery = $;

Vue.use(icbComponents);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
