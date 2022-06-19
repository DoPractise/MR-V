<template>
  <div class="make-pdf">
    <div class="pdfDom">测试数据</div>
    <div class="pdfDom2">测试数据2</div>
    <div class="pdfDom3">测试数据3</div>
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
