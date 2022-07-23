<!--代理和反射监听数据变化-->
<!--
    #https://juejin.cn/post/6844903511826645006
很多强类型语言长期以来都有其反射(Reflection)API（如 Python 或 C#），而 JavaScript 作为一种动态语言，则几乎用不着反射。在 ES6 特性里引入的少量扩展之处中，允许开发者用Proxy访问此前的一些语言内部行为就算得上一项。你可能会反驳，尽管在规范和社区中没有明确那么称呼过，但 JS 在 ES5 中已经有反射特性了。诸如 Array.isArray, Object.getOwnPropertyDescriptor, 甚至 Object.keys 这些，在其他语言中都是典型的被列为反射的方法。而内置的 Reflect 对象则更进了一步，将这些方法归纳在一起。
-->
<!--
    和 Math一样, Reflect 也是不能用 new 或 call 调用的静态对象，所有方法也是静态的。ES6 Proxy 中的陷阱(traps) API 和 Reflect 中的方法一一对应。
-->
<template>
  <div>
    <button @click="updateAttr('foo')">更新属性Foo</button>
    <button @click="updateAttr('name')">更新属性Name</button>
  </div>
</template>
<script>
const target = {};
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var yay = Reflect.defineProperty(target, "foo", { value: "bar" });
      if (yay) {
        // yay!
        console.log(yay, target);
      } else {
        // oops.
        console.log(yay, target);
      }
    },
    updateAttr(type) {
    //   if (type == "foo") {
    //     target.foo = "bar";
    //   } else if (type == "name") {
    //     target.name = "Nick";
    //   }
    }
  }
};
</script>
<style lang="scss" scoped></style>
