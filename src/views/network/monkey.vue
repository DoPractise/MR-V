<!--模拟随机用户操作 #https://github.com/marmelab/gremlins.js-->
<template>
  <div class="monkey"></div>
</template>
<script>
import { createHorde } from "gremlins.js";
const horde = createHorde();
horde.unleash();
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    init() {}
  }
};
</script>
<style lang="scss" scoped></style>
