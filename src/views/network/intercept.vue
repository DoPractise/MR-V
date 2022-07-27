<!--取消、拦截网络请求-->
<!--
    开发的时候会遇到一个重复点击的问题，短时间内多次点击同一个按钮发送请求会加重服务器的负担，消耗浏览器的性能，所以绝大多数的时候我们需要做一个取消重复点击的操作。联系生活实际，当网速不好的情况下，如果我们在 app 中点击一个按钮，毫无反应，我们通常会等不及，连续多次点击。这个时候，就会重复向后台发送请求。这种情形会给后台服务器带来很多不必要的请求回应，浪费资源。所以在这种情况下，我们就需要对后面再次发出的请求进行取消。
-->
<template>
  <div class="intercept">
    <button @click="sendReq">发送请求</button>
    <button @click="cancelReq">取消请求</button>
  </div>
</template>
<script>
import { getBatchRes } from "@/api";
export default {
  data() {
    return {};
  },
  methods: {
    // 发送请求
    sendReq() {
      this.getBatchRes();
    },
    // 取消请求
    cancelReq() {},
    getBatchRes() {
      getBatchRes({ })
        .then(res => {
          console.log("获得批处理结果", res);
        })
        .catch(err => {
          console.log(28, err);
        });
    }
  }
};
</script>
<style lang="scss" scoped></style>
