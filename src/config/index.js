let baseUrl = "";
if (process.env.NODE_ENV === "development") {
  baseUrl = "/dz/api";
} else {
  baseUrl = "http://dz-api.duolaibao88.com";
}
module.exports = {
  title: "Vue实例模板",
  baseUrl
};
