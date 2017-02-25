module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'content-script.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
}
