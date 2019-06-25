module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].template = '/Users/tianzz/Desktop/nodejs/node聊天系统/exercise/index.html'
        return args
      })
  }
}