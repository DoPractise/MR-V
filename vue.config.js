var path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const port = process.env.port || process.env.npm_config_port || 8080;

module.exports = {
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部，
  // 比如 https://www.my-app.com/
  // 如果你的应用时部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如，如果你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 `/my-app/`
  // 将构建好的文件输出到哪里
  publicPath: "/",
  outputDir: "dist",

  // 放置静态资源的地方 (js/css/img/font/...)
  assetsDir: "static",

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: process.env.NODE_ENV === "development",

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,

  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    // extract: true,

    // 是否开启 CSS source map？
    // sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 37.5, // 换算的基数
            selectorBlackList: [".van-"], // 忽略转换正则匹配项
            propList: ["*"],
            minPixelValue: 2
          })
        ]
      }
    }
  },
  // 配置 webpack-dev-server 行为。
  devServer: {
    port: port,
    open: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/mrv/api": {
        target: "http://localhost:9600", // lion-api
        changeOrigin: true,
        pathRewrite: {
          "^/mrv/api": "/mrv"
        }
      }
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        "@C": resolve("src/components")
      }
    }
  },
  chainWebpack(config) {
    config.module
      .rule("css")
      .test(/\.css$/)
      .oneOf("vue")
      .resourceQuery(/\?vue/)
      .use("px2rem")
      .loader("px2rem-loader")
      .options({
        remUnit: 75
      });

    // 加载本地pdf文件
    const fileRule = config.module.rule("file");
    fileRule.uses.clear();
    fileRule
      .test(/\.pdf|ico$/)
      .use("file-loader")
      .loader("file-loader")
      .options({
        limit: 10000
      });

    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial"
      }
    ]);

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch");

    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === "development", config => config.devtool("cheap-source-map"));
  },

  // 第三方插件的选项
  pluginOptions: {}
};
