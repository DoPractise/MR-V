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
  }
];
export default routes;
