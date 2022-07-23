<!--观察监听数据变化-->
<!--
Mutation Observer API 用来监视 DOM 变动。DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 API 都可以得到通知。
Mutation Observer 则是异步触发，DOM 的变动并不会马上触发，而是要等到当前所有 DOM 操作都结束才触发。
这样设计是为了应付 DOM变动频繁的特点。
-->
<!--
应用：
    1、希望通知 Web 应用程序访问者，他当前所在的页面发生了一些更改。
    2、正在开发一个新的 JavaScript 框架，需要根据 DOM 的变化动态加载 JavaScript 模块。
-->
<template>
  <div class="mo">
    <button @click="addEl">添加元素</button>
    <div class="step1" id="step1">
      <input type="text" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      counter: 0
    };
  },
  mounted() {
    this.initStep1();
  },
  methods: {
    initStep1() {
      const that = this;
      var observer = new MutationObserver(function (mutations, observer) {
        that.counter = that.counter + 1;
        console.log("页面有变化", that.counter, mutations, observer);
      });
      var el = document.querySelector(".step1");
      var options = {
        childList: true,
        attributes: true
      };
      observer.observe(el, options);
      // 创建并返回一个 MutationObserver 实例， 并侦听el元素的变动。
    },
    addEl() {
      var target = document.getElementById("step1");
      let id = new Date().getTime();
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(id));
      target.appendChild(div);
    }
  }
};
</script>
<style lang="scss" scoped></style>
