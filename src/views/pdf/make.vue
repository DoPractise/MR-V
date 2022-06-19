<template>
  <div class="make-pdf">
    <div class="pdfDom">
      js生成pdf文件- OSCHINA - 中文开源技术交流社区https://www.oschina.net › 关键词
使用PDFKit和Node.js生成服务器端PDF文件. https://my.oschina.net/u/1473675/blog/228495. 介绍 起初，生成PDF文件似乎是件很繁琐的任务，但有了PDFKit，这个任务就 ...

在js内生成PDF文件并下载的功能实现(不调用后端 ... - 博客园https://www.cnblogs.com › zizaiwuyou
2019年3月15日 — 在js内生成PDF文件并下载的功能实现(不调用后端),以及生成pdf时换行的格式不被渲染,word-break:break-all 前天来了个新需求, 有一个授权书的文件要 ...

Vue中前端实现生成PDF 并下载 - 首席CTO笔记https://www.shouxicto.com › article
2021年10月10日 — 将页面 html 转换成图片npm install html2canvas --save // 将图片生成 pdf npm install jspdf --save. 在项目主文件main.js 中引入定义好的实现方法 ...

前端JS生成PDF的一次踩坑之行 - 知乎专栏https://zhuanlan.zhihu.com › ...
2020年3月26日 — 前言最近公司的项目提出一个新需求，需要在前端生成并输出一份pdf合同。由于合同的语言是中文，所以找到最好的方法还是通过html2canvas.js转换 ...

js生成PDF的幾種方法 - 程式前沿https://codertw.com › 程式語言
转为简体网页
2020年9月30日 — 方法一：html2canvas + jsPDF 生成pdf. 這個方法就是把html內容轉成canvas，然後生成圖片，把圖片添加到jspdf裡，保存導出pdf. 優點：生成的pdf清晰度 ...
    </div>
    <button @click="btnClick">导出PDF</button>
  </div>
</template>
<script>
export default {
  name: "MakePdf",
  data() {
    return {};
  },
  methods: {
    // 导出pdf
    btnClick() {
      this.$nextTick(() => {
        this.htmlToPdf("pdfDom", "个人报告");
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
