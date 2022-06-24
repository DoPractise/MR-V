<template>
  <div class="make-pdf">
    <div class="btn-group">
      <button @click="btnClick">导出PDF</button>
    </div>
    <div class="pdfDom" id="pdfDom">
      <div data-html2canvas-ignore="true">这段在生成pdf文件时是要被忽略的</div>
      <p>
        发现实用有趣的开源项目 汇聚优秀本土开源作者 各种类型开源项目应有尽有 多维指数辅助辨识开源成熟度 Web IDE
        轻松直观浏览代码
      </p>
      <img
        src="https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2022%2F0623%2F29cc82cbj00rdxb72004hc000u000k9m.jpg&thumbnail=660x2147483647&quality=80&type=jpg"
      />
      <p>
        恩，最后用pdfmake做的，页面中的图片、echarts图表等元素用html2canvas转成canvas放进去的，好处是他能自动分页，够清晰，页眉页脚也都可以。缺点是得专门做配置项，另外目前还没有生成目录的功能。。。
      </p>
      <div>
        <!-- 使用这个签名组件 -->
        <eSign
          ref="esign"
          :width="500"
          :height="300"
          :isCrop="sign.isCrop"
          :lineWidth="sign.lineWidth"
          :lineColor="sign.lineColor"
          :bgColor.sync="sign.bgColor"
        />
        <div class="btn-group">
          <button @click="handleGenerate" type="primary">生成签字图片</button>
          <button @click="handleReset">清空画板</button>
        </div>
        <div v-show="sign.resultImg" class="result-img">
          <blockquote>生成的签名</blockquote>
          <div>
            <img :src="sign.resultImg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { pdf } from "@/utils";
import eSign from "vue-esign";

export default {
  name: "MakePdf",
  components: {
    eSign
  },
  data() {
    return {
      sign: {
        lineWidth: 3, // 画笔的线条粗细
        lineColor: "#000000", // 画笔的颜色
        bgColor: "#efefef", // 画布的背景颜色
        resultImg: "", // 最终画布生成的base64图片
        isCrop: false // 是否裁剪，在画布设定尺寸基础上裁掉四周空白部分
      }
    };
  },
  methods: {
    // 导出pdf
    btnClick() {
      this.$nextTick(() => {
        pdf.htmlToPdf(document.getElementById("pdfDom"), "个人报告.pdf");
      });
    }, // 清空画板
    handleReset() {
      this.$refs.esign.reset();
    },
    // 生成签字图
    handleGenerate() {
      this.$refs.esign
        .generate() // 使用生成器调用把签字的图片转换成为base64图片格式
        .then(res => {
          this.sign.resultImg = res;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.btn-group {
  padding: 15px 5px;
  button {
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.result-img {
  width: 200px;
  margin: 0 auto;
  padding: 5px;
  border: 1px solid #dcdcdc;
  img {
    max-width: 100%;
  }
}
</style>
