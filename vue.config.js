module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/tiku-vue/" : "/", //默认为'/',会部署到域名的根路径上; 设为''或'./',这样所有的资源会被链接为相对路径
  lintOnSave: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};