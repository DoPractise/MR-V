const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: path.resolve(__dirname, "../src/main.js"), // 入口文件
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      // 'vue$': 'vue/dist/vue.js',
      "@": path.resolve(__dirname, "../src")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }
        ]
      },
      {
        /*将js文件转码成es5*/
        test: /\.js?$/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 1000,
          name: "img/[name].[hash:7].[ext]" // assetsPath()
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: "fonts/[name].[hash:7].[ext]" // assetsPath()
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
