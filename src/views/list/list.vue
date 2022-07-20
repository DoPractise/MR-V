<!--列表、文本之间的交互、滚动条、按钮、初始化、重置-->
<template>
  <div class="list">
    <div class="btn-group">
      <input type="number" :min="0" :max="list.length - 1" v-model="selected" />
      <button @click="handleSelectList">确定</button>
    </div>
    <div class="content-box">
      <div class="content" id="Content">
        <ul>
          <li v-for="(item, index) in list" :key="index" :id="'c' + index" :class="{ active: selected != '' && selected == index }">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getList } from "@/api";
export default {
  name: "List",
  data() {
    return {
      selected: "", // 当前选中列表序号
      refList: [], // 联动选择下拉
      list: [] // 列表
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleSelectList() {
      if (!this.selected) return;
      this.resetListContent(this.selected);
    },
    getList() {
      const id = new Date().getTime();
      getList({ id })
        .then(res => {
          this.list = res;
          let midLength = parseInt(res.length / 2);
          this.selected = midLength;
          this.$nextTick(()=>{
            this.resetListContent(midLength);
          })
        })
        .catch(err => {
          console.log(28, err);
        });
    },
    resetListContent(idx) {
      let contentHeight = document.querySelector(".content").offsetHeight;
      let listHeight = document.querySelector(".content ul").offsetHeight;
      let listItemHeight = listHeight / this.list.length;

      let offsetTop = document.querySelector("#c" + idx).offsetTop;
      let parentOffsetTop = document.querySelector(".content").offsetTop;
      let midY = contentHeight / 2;

      document
        .querySelector(".content")
        .scrollTo({ top: offsetTop - parentOffsetTop - midY + listItemHeight / 2, behavior: "smooth" });
    }
  }
};
</script>
<style lang="scss" scoped>
.btn-group {
  padding: 10px 20px;
  button {
    margin-left: 20px;
  }
}
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.content-box {
  margin-top: 20px;
  background-color: #eee;
}
.content {
  height: 300px;
  padding: 0 20px;
  overflow-x: hidden;
  overflow-y: auto;
}
.active {
  color: #f00;
}
</style>
