const NODE_ENV = process.env.NODE_ENV; // webpack编译时会获取node环境的配置信息
let baseUrl = "";
if (process.env.NODE_ENV === "development") {
  baseUrl = "/mrv/api";
} else {
  baseUrl = "http://mrv-api.duolaibao88.com";
}
const config = {
  production: {
    // 生产环境(线上环境)
    title: "Vue实例模板",
    baseUrl
  },
  development: {
    // 开发环境
    title: "Vue实例模板",
    baseUrl
  }
};
module.exports = config[NODE_ENV];
