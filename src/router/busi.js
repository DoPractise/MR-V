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
    path: "/make_pdf",
    name: "MakePdf",
    meta: {
      title: "生成pdf"
    },
    component: resolve => require(["@/views/pdf/make"], resolve)
  },
  {
    path: "/preview_pdf",
    name: "PreviewPdf",
    meta: {
      title: "预览pdf"
    },
    component: resolve => require(["@/views/pdf/preview"], resolve)
  },
  {
    path: "/preview2_pdf",
    name: "Preview2Pdf",
    meta: {
      title: "预览2pdf"
    },
    component: resolve => require(["@/views/pdf/preview2"], resolve)
  },
  {
    path: "/preview3_pdf",
    name: "Preview3Pdf",
    meta: {
      title: "预览3pdf"
    },
    component: resolve => require(["@/views/pdf/preview3"], resolve)
  }
];
export default routes;
