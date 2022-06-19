<template>
  <div>
    出自: https://juejin.cn/post/7076483975312572447
    <p @click="viewPDF">预览PDF</p>
    <pdf-viewer :url="url"></pdf-viewer>
  </div>
</template>

<script>
import PdfViewer from "./PdfViewer.vue";

export default {
  components: {
    PdfViewer
  },
  data() {
    return {
      url: ""
    };
  },
  methods: {
    viewPDF() {
      this.url = "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";
    }
  }
};
</script>
