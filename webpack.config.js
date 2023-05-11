const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: { main: './src/index.js' },
  mode: 'development',
  devtool: "eval-source-map",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index[contenthash].js',
    assetModuleFilename: '[name][ext]',
    publicPath: ''
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 8080,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.(m)?js$/,
        use: 'babel-loader',
        exclude: '/node-modules/'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        },
          'postcss-loader']
      },
      {
        test: /\.(svg|png|jp(e)?g|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.woff(2)?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // filename: 'index[contenthash].html' /* При подключении данной опции проект не грузится в режиме build dev */
    }),
    new MiniCssExtractPlugin({
      filename: 'index[contenthash].css'
    })
  ]
}
