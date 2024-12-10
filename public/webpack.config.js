const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/script.js', // Main page JavaScript
    multiplayer: './src/js/multiplayer.js',  // multiplayer page JavaScript
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Clean the dist folder before building
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // This handles images like jpg, png, and gif
        type: 'asset/resource',  // Use Webpack's asset module to process images
        generator: {
          filename: 'images/[name][ext][query]', // Where to output images in dist
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: './src/html/multiplayer.html',
      filename: 'multiplayer.html',
      chunks: ['multiplayer'],
    }),
  ],
  mode: 'development',
  devtool: 'inline-source-map', // Helpful for debugging
};
