import Cookies from "js-cookie";
import axios from "axios";
import qs from "qs";
import { Toast } from "vant";
import router from "@/router";
import { baseUrl } from "@/config";
import store from "@/store";

function getStatusInfo(err = { response: {} }) {
  let retCode = err.response.status;
  let msg;
  switch (retCode) {
    case -1:
      msg = err.retMsg || "系统错误";
      break;
    case 10001:
      msg = err.retMsg || "token不存在";
      break;
    case 10002:
      msg = err.retMsg || "参数不合法";
      break;
    case 10003:
      msg = err.retMsg || "用户不存在";
      break;
    case 10004:
      msg = err.retMsg || "验证码无效";
      break;
    case 405:
      msg = err.retMsg || "请登录";
      break;
    case 500:
      msg = err.retMsg || "服务器内部出错";
      break;
    default:
      msg = err.retMsg || "";
  }
  return msg;
}

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = store.state.pending;
/**
 * 添加请求
 * @param {Object} config
 */
const addPending = config => {
  const url = [config.method, config.url, qs.stringify(config.params), qs.stringify(config.data)].join("&");
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      // console.log("---------")
      // console.log(store.state, pending, !pending.has(url));
      if (!pending.has(url)) { // 这里没处理好状态缓存
        // console.log(url)
        // console.log("----------")
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel);
        store.commit("setPending", pending);
      }
    });
};
/**
 * 移除请求
 * @param {Object} config
 */
const removePending = config => {
  const url = [config.method, config.url, qs.stringify(config.params), qs.stringify(config.data)].join("&");
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url);
    cancel(url);
    pending.delete(url);
    store.commit("setPending", pending);
  }
};

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url);
  }
  pending.clear();
  store.commit("setPending", pending);
};

export default function (options) {
  // 初始化实例
  const instance = axios.create({
    baseURL: options.baseUrl || baseUrl,
    headers: { "Content-Type": "application/json;charset=UTF-8" } || options.headers,
    timeout: options.timeout || 10000,
    withCredentials: false
  });

  return new Promise((resolve, reject) => {
    // 请求拦截器
    instance.interceptors.request.use(
      config => {
        removePending(options); // 在请求开始前，对之前的请求做检查取消操作
        addPending(options);
        let token = Cookies.get("token");
        if (token) {
          config.headers.token = token;
        }
        return config;
      },
      error => {
        // 判断请求超时
        if (error.code === "ECONNABORTED" && error.message.indexOf("timeout") !== -1) {
          console.error("timeout请求超时");
        }

        // 重定向到错误页面
        const errorInfo = error.response;
        if (errorInfo) {
          error = errorInfo.data;
          const retCode = errorInfo.status; // 404 403 500 ...
          router.push({
            path: `/error/${retCode}`
          });
        }
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    instance.interceptors.response.use(
      response => {
        removePending(response); // 在请求结束后，移除本次请求
        let resData = response.data;
        let code = resData.retCode;
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
          return Promise.reject(resData.data);
        }
        return resData;
      },
      err => {
        if (axios.isCancel(err)) {
          console.log("repeated request: " + err.message);
        } else {
          // 服务器错误统一处理[非接口定义状态]
          if (err && err.response) {
            err.retCode = err.response.status + "";
            err.retMsg = err.response.statusText;
            err.retMsg = getStatusInfo(err);
          }

          // 超时处理
          if (err.retCode.toUpperCase() === "ECONNABORTED" && err.retMsg.toLowerCase().indexOf("timeout") !== -1) {
            err.retMsg = "服务器响应超时";
          }

          Toast({
            type: "fail",
            duration: 1500,
            message: err.retMsg,
            onClose: () => {}
          });
          return Promise.reject(err); // 返回接口返回的错误信息
        }
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
