<!--编辑器中粘贴显示图片-->
<template>
  <div class="box">
    <div id="preview" class="upload-preview" @paste="handleParse">
      <span>将图片按Ctrl+V粘贴至此处</span>
    </div>
    <button @click="handleUpload">上传文件</button>
    <div v-if="remoteFileUrl" class="remote-file-url">
      <img :src="remoteFileUrl"/>
    </div>
  </div>
</template>
<script>
import { upload } from "@/api";

export default {
  data() {
    return {
      file: null,
      remoteFileUrl: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      document.addEventListener("paste", this.handleParse);
    },
    // 控制粘贴图片
    handleParse(event) {
      const items = (event.clipboardData || window.clipboardData).items;
      let file = null;

      if (!items || items.length === 0) {
        console.error("当前浏览器不支持本地");
        return;
      }
      // 搜索剪切板items
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          file = items[i].getAsFile();
          break;
        }
      }
      if (!file) {
        console.error("粘贴内容非图片");
        return;
      }
      // 此时file就是我们的剪切板中的图片对象
      // 如果需要预览，可以执行下面代码
      const preview = document.getElementById("preview");
      const reader = new FileReader();
      reader.onload = event => {
        preview.innerHTML = `<img src="${event.target.result}">`;
      };
      reader.readAsDataURL(file);
      this.file = file;
    },
    // 控制上传图片
    handleUpload() {
      let file = this.file;
      if (!file) {
        console.error("请粘贴图片后上传");
        return;
      }
      this.loading = true;
      let fd = new FormData();
      fd.append("avator", file);
      //   fd.append("chunk", "0"); 添加form表单中其他数据
      upload(fd).then(res => {
        console.log("上传成功", res);
        this.remoteFileUrl = res;
      }).catch(err => {
        console.error(err);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 700px;
  margin: 0 auto;
  padding: 15px;
  border: 1px dashed #ddd;
}
.upload-preview {
  min-height: 150px;
  width: 400px;
}

.upload-preview:empty::before {
  border: 1px solid #ddd;
  content: "预览区";
  display: block;
  text-align: center;
  font-size: 40px;
  line-height: 150px;
  opacity: 0.6;
}
.remote-file-url {
  padding: 10px;
  text-align: center;
  img {
    max-width: 100%;
  }
}
</style>
