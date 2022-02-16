module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/Strands' : '/',
  transpileDependencies: [
    'vuetify'
  ],
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Knowledge STRANDS',
    },
  }
}
