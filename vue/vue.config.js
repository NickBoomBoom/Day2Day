
const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");

module.exports = {
  //生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  // eslint-loader 是否在保存时检查
  lintOnSave: true,
  devServer: {
    disableHostCheck: true,
    port: 8087,
    open: true,
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 100,
            propList: ["*"]
          })
        ]
      }
    }
  },

  configureWebpack: {
    optimization: {
      // minimize: false,
      // usedExports: true,
      // sideEffects: true,
    },
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter'
    }
  },

}
