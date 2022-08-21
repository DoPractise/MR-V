import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/styles/index.scss";
import store from '@/store';
import icbComponents from "@/components";
import $ from "jquery";
window.$ = window.jQuery = $;

Vue.use(icbComponents);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
