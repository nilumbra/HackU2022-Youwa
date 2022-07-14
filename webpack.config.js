const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  entry: { 
    main: './client/main.js',
    acc: './client/src/main.js'
  }, 
  plugins: [
    /* config.plugin('html') */
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Yowa',
      scriptLoading: 'defer',
      template: './client/index.html'
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    })
  ],
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      { test: /\.vue$/, 
        use: ['vue-loader']
      },
      { test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [
          'vue-style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          'css-loader',
        ]
      }
    ]
  }
}