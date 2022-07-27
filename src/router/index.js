import Vue from "vue";
import Router from "vue-router";
import routes from "./busi";
import { clearPending } from "@/utils/http"
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
  clearPending();
  document.title = to.meta.title;
  NProgress.start();
  if(to.matched.length == 0) {
    from.path ? next({ path: from.path }): next('/error/40x')
  } else {
    next();
  }
  NProgress.done();
});

router.onError(error => {
  // #https://segmentfault.com/a/1190000016382323
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if(isChunkLoadFailed) {
    console.log("进入纠错页面");
    router.replace(targetPath);
  }
});

export default router;
