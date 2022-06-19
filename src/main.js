import Vue from "vue";
import "lib-flexible"
import App from "./App";
import router from "./router";
import "@/styles/index.scss";
import htmlToPdf from "./components/htmlToPdf";

Vue.use(htmlToPdf);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
