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

// 获取列表内容
export function getList(data = { }) {
  return http({
    url: "/list/" + data.id,
    method: "get",
    headers: {'Content-Type': 'application/json'}
  })
}

// 模拟批量请求
export function getBatchRes(params = { }) {
  return http({
    url: "/getBatchRes",
    method: "get",
    params,
    headers: {'Content-Type': 'application/json'}
  })
}

export default {
  upload,
  getArticle,
  getList
};
