const path = require('path')

module.exports = {
  entry: {
    home: './src/home-page.js',
    'order-processing': './src/order-processing.js',
    ragistration: './src/registration-page.js',
    login: './src/login-page.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'eval-source-map',
}
