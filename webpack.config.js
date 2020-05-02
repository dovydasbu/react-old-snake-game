var path = require("path");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "index.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        loader: "babel-loader"
      }
    ]
  },
  externals: {
    react: "react"
  },
  plugins: [
    new CopyPlugin([
      { from: './src/assets', to: './assets' }
    ]),
  ]
};