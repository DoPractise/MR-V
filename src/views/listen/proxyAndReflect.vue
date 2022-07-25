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
const obj = {
  name: "张三",
  addr: "火星街水文路",
  foo: "",
  bar: ""
};
let proxy = {};
export default {
  data() {
    return {};
  },
  mounted() {
    this.initProxy();
    this.initReflect();
  },
  methods: {
    initProxy() {
      // 不要将 revceiver 和 get 陷阱中的 this 弄混了，陷阱中的 this 关键字表示的是代理的 handler 对象
      // get 陷阱中的 receiver 存在的意义就是为了正确的在陷阱中传递上下文。
      // 涉及到属性访问时，不要忘记 get 陷阱还会触发对应的属性访问器，也就是所谓的 get 访问器方法。
      // 我们可以清楚的看到下述的 receiver 代表的是继承于 Proxy 的对象，也就是 obj。

      const parent = {
        get value() {
          return "19Qingfeng";
        }
      };

      const handler = {
        get(target, key, receiver) {
          console.log(receiver === proxy);
          console.log(this === handler); // log: true
          console.log(receiver === obj); // log: true
          // get陷阱中target表示原对象 key表示访问的属性名
          console.log("劫持你的数据访问" + key);
          return target[key];
        },
        set(target, key, value) {
          console.log("劫持你的数据设置" + key);
          target[key] = value;
          return target;
        }
      };

      const proxy = new Proxy(parent, handler);

      const obj = {
        name: "wang.haoyu"
      };

      // 设置obj继承与parent的代理对象proxy
      Object.setPrototypeOf(obj, proxy);

      // log: false
      obj.value;
    },
    updateAttr(type) {
      proxy[type] = new Date().getTime();
      console.log(proxy[type]);
    },
    /**
     * Proxy 中接受的 Receiver 形参表示代理对象本身或者继承与代理对象的对象。
     * Reflect 中传递的 Receiver 实参表示修改执行原始操作时的 this 指向。
     */
    initReflect() {
      const parent = {
        name: "19Qingfeng",
        get value() {
          return this.name;
        }
      };

      const handler = {
        get(target, key, receiver) {
          // return Reflect.get(target, key);
          return Reflect.get(target, key, receiver); // 可以简单的将 Reflect.get(target, key, receiver) 理解成为 target[key].call(receiver)，不过这是一段伪代码，但是这样你可能更好理解。
          // 这里相当于 return target[key]
        }
      };

      const proxy = new Proxy(parent, handler);

      const obj = {
        name: "wang.haoyu"
      };

      // 设置obj继承与parent的代理对象proxy
      Object.setPrototypeOf(obj, proxy);

      console.log(obj.value);
    }
  }
};
</script>
<style lang="scss" scoped></style>
