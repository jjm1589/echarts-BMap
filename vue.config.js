const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    externals: {
        qq: "qq",
        BMap: "BMap",
        BMapGL: "BMapGL",
        BMapLib: "BMapLib"
    }
  }
})
