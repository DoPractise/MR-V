<!--移动端适配-->
<template>
  <div>
    <div class="name-item">
        <p>
            Viewport方案中主要使用的是css3中CSS Values and Units Module Level 3（候选推荐）新增的length单位vw、vh、vmax和vmin。定义中，它们都是相对单位，其相对的参考系都是"视觉视口":
        </p>
        <p>vmin和vmax是根据Viewport中长度偏大的那个维度值计算出来的，如果window.innerHeight > window.innerWidth则vmin取值为window.innerWidth / 100，vmax取值为window.innerHeight / 100。</p>
    </div>
    <div class="box ignore">写CSS的时候：</div>
    <img src=""/>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {}
  }
};
</script>
<style lang="scss" scoped>
.name-item {
  font-size: 40px;
  line-height: 56px;
  margin-left: 144px;
  border-top: 1px solid #eeeeee;
  color: #333333;
}
.ignore {
  margin: 10px;
  background-color: red;
}
.box {
  width: 180px;
  height: 300px;
}
.hairlines {
  border-bottom: 0.5px solid red;
}
img {
    content: normal !important;
} 

</style>
