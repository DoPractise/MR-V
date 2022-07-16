import http from "@/utils/http";

export function upload(data) {
  return http({
    url: "/upload",
    method: "post",
    data,
    headers: {'Content-type': 'multipart/form-data'}
  })
}

export default {
  upload
};
