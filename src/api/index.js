import http from "@/utils/http";

export function upload(data) {
  return http({
    url: "/upload",
    method: "post",
    data,
    headers: {'Content-Type': 'multipart/form-data'}
  })
}

// 获取文章内容
export function getArticle(data = { }) {
  return http({
    url: "/article/" + data.id,
    method: "get",
    headers: {'Content-Type': 'application/json'}
  })
}

export default {
  upload,
  getArticle
};
