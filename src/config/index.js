let baseUrl = "";
if (process.env.NODE_ENV === "development") {
  baseUrl = "/mrv/api";
} else {
  baseUrl = "http://mrv-api.duolaibao88.com";
}
module.exports = {
  title: "Vue实例模板",
  baseUrl
};
