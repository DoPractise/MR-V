<!--移动端适配-->
<template>
  <div>
    <p>
    Flexible方案主要是借助JavaScript控制viewport的能力，使用rem模拟vw的特性从而达到适配目的的一套解决方案。</p>
    <p>
    Flexible方案的实现涉及并使用到了很多PC端开发很少接触到的概念，其实无论是怎么样的适配方案都是建立在梳理和管理这些概念之上的，因此，这些概念对我们理解和探究移动端适配的深层原理尤为重要。</p>
  </div>
</template>
<script>

export default {
  data() {
    return {}
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
div {
  font-size: 16px;
}
</style>
