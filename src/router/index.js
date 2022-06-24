import Vue from "vue";
import Router from "vue-router";
import routes from "./busi";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({ showSpinner: false });

Vue.use(Router);

let router = new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      };
    }
  },
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  NProgress.start();
  next();
  NProgress.done();
});

export default router;
