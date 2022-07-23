const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    meta: {
      title: "首页"
    },
    component: resolve => require(["@/views/index/index"], resolve)
  },
  {
    path: "/pdf/make",
    name: "MakePdf",
    meta: {
      title: "生成pdf"
    },
    component: resolve => require(["@/views/pdf/make"], resolve)
  },
  {
    path: "/pdf/preview",
    name: "PdfPreview",
    meta: {
      title: "预览pdf"
    },
    component: resolve => require(["@/views/pdf/preview"], resolve)
  },
  {
    path: "/pdf/preview2",
    name: "PdfPreview2",
    meta: {
      title: "预览2pdf"
    },
    component: resolve => require(["@/views/pdf/preview2"], resolve)
  },
  {
    path: "/pdf/preview3",
    name: "PdfPreview3",
    meta: {
      title: "预览3pdf"
    },
    component: resolve => require(["@/views/pdf/preview3"], resolve)
  },
  {
    path: "/paste/img",
    name: "pasteImg",
    meta: {
      title: "编辑器中粘贴显示图片"
    },
    component: resolve => require(["@/views/paste-img/pasteImg"], resolve)
  },
  {
    path: "/paste/img2",
    name: "pasteImg2",
    meta: {
      title: "编辑器中粘贴显示图片"
    },
    component: resolve => require(["@/views/paste-img/pasteImg2"], resolve)
  },
  {
    path: "/mobile/demo1",
    name: "mobileDemo1",
    meta: {
      title: "移动端适配模板1"
    },
    component: resolve => require(["@/views/mobile/demo1"], resolve)
  },
  {
    path: "/mobile/demo2",
    name: "mobileDemo2",
    meta: {
      title: "移动端适配模板2"
    },
    component: resolve => require(["@/views/mobile/demo2"], resolve)
  },
  {
    path: "/article/:id",
    name: "ArticleAdapt",
    meta: {
      title: "文章适配器"
    },
    component: resolve => require(["@/views/article/article1"], resolve)
  },
  {
    path: "/list/:id",
    name: "ListAdapt",
    meta: {
      title: "列表适配器"
    },
    component: resolve => require(["@/views/list/list"], resolve)
  },
  {
    path: "/form/input",
    name: "FormInput",
    meta: {
      title: "表单元素input"
    },
    component: resolve => require(["@/views/form/input"], resolve)
  },
  {
    path: "/form/textarea",
    name: "FormTextarea",
    meta: {
      title: "表单元素textarea"
    },
    component: resolve => require(["@/views/form/textarea"], resolve)
  },
  {
    path: "/listen/define_properties",
    name: "ListenDefineProperties",
    meta: {
      title: "数据监听"
    },
    component: resolve => require(["@/views/listen/defineProperties"], resolve)
  },
  {
    path: "/listen/mutation_observer",
    name: "ListenMutationObserver",
    meta: {
      title: "DOM监听"
    },
    component: resolve => require(["@/views/listen/mutationObserver"], resolve)
  },
  {
    path: "/listen/proxy_and_reflect",
    name: "ListenProxyAndReflect",
    meta: {
      title: "代理和反射"
    },
    component: resolve => require(["@/views/listen/proxyAndReflect"], resolve)
  }
];
export default routes;
