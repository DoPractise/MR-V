import Cookies from "js-cookie";
import axios from "axios";
import { Toast } from "vant";
import router from "@/router";
import { baseUrl } from "@/config";

export default function $axios(options) {
  // 初始化实例
  const instance = axios.create({
    baseURL: options.baseUrl || baseUrl,
    headers: { "Content-Type": "application/json;charset=UTF-8" } || options.headers,
    // timeout: 10000,
    withCredentials: false
  });

  return new Promise((resolve, reject) => {
    // 请求拦截器
    instance.interceptors.request.use(
      config => {
        let token = Cookies.get("token");
        if (token) {
          config.headers.token = token;
        }
        return config;
      },
      error => {
        // 请求发生错误时
        console.log(error);

        // 判断请求超时
        if (error.code === "ECONNABORTED" && error.message.indexOf("timeout") !== -1) {
          console.log("timeout请求超时");
        }

        // 重定向到错误页面
        const errorInfo = error.response;
        if (errorInfo) {
          error = errorInfo.data;
          const errorStatus = errorInfo.status; // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`
          });
        }
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    instance.interceptors.response.use(
      response => {
        let resData = response.data;
        let code = resData.code;
        if (code != 0) {
          Toast({
            type: "fail",
            duration: 1500,
            message: getStatusInfo(code, resData),
            onClose: () => {
              if (code == 405) {
                router.push({
                  path: "/login"
                });
              }
            }
          });
          return Promise.reject(resData.body);
        }
        return resData.body;
      },
      err => {
        // 统一处理响应错误
        if (err && err.response) {
          err.code = err.response.status + "";
          err.message = err.response.statusText;
          err.msg = getStatusInfo(err.response.status, err);
        }
        // 超时处理
        if (err.code.toUpperCase() === "ECONNABORTED" && err.message.toLowerCase().indexOf("timeout") !== -1) {
          err.msg = "服务器响应超时";
        }

        Toast({
          type: "fail",
          duration: 1500,
          message: err.msg,
          onClose: () => {}
        });
        return Promise.reject(err); // 返回接口返回的错误信息
      }
    );

    // 1、请求处理
    if (options.method.toLowerCase() === "get") {
      options.params = options.data;
      options.data = {};
    }
    if (options.method.toLowerCase() === "delete") {
      options.params = options.data;
    }
    // 2、中间层操作
    // 3、合成处理
    instance(options)
      .then(res => {
        // 状态操作
        resolve(res);
      })
      .catch(error => {
        // 状态操作、异常处理
        reject(error);
      });
  });
}

function getStatusInfo(status, err = {}) {
  let msg;
  switch (status) {
    case -1:
      msg = err.message || "系统错误";
      break;
    case 10001:
      msg = err.message || "token不存在";
      break;
    case 10002:
      msg = err.message || "参数不合法";
      break;
    case 10003:
      msg = err.message || "用户不存在";
      break;
    case 10004:
      msg = err.message || "验证码无效";
      break;
    case 405:
      msg = err.message || "请登录";
      break;
    case 500:
      msg = err.message || "服务器内部出错";
      break;
    default:
      msg = err.message || "";
  }
  return msg;
}
