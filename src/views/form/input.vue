<!--密码输入框的监听 #https://blog.csdn.net/idomyway/article/details/79078625-->
<!-- 属性链检测 -->
<!--
vue的思想是组件式开发的思维方式，不要去想着修改dom，监听dom；而是换个角度，从监听数据的方式去间接性的达到监听dom的目的，组件的开发是数据驱动dom的，这是必须要理解到位的。
还有带slot的组件，不应该再去干预slot里面的内容了；而是在关系到slot内容的父组件去设定指令。
-->
<template>
  <div class="form-input">
    <input type="password" name="password" />
    <input type="password" name="surepassword" />
    <div :class="{ active: show }">计算属性</div>
    <div :class="{ active: show2 }">监听属性变化2</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pwd1: "",
      pwd2: "",
      show2: false
    };
  },
  computed: {
    show() {
      let password = $("input[name='password']").val(); // 这是监听不到的
      let surepassword = $("input[name='surepassword']").val(); // 这是监听不到的
      if (password && surepassword) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const that = this;
      $(".form-input input[name='password']").bind("input propertychange", function (e) {
        console.log("password有变化1");
        that.pwd1 = $(this).val();
        if (that.pwd1 && that.pwd2) {
          that.show2 = true;
        } else {
          that.show2 = false;
        }
      });
      $(".form-input input[name='surepassword']").bind("input propertychange", function (e) {
        console.log("password有变化2");
        that.pwd2 = $(this).val();
        if (that.pwd1 && that.pwd2) {
          that.show2 = true;
        } else {
          that.show2 = false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.active {
  color: #f00;
}
</style>
