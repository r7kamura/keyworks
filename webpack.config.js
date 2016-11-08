const webpack = require("webpack");

const config = {
  entry: {
    background: "./src/javascripts/background.js",
    content: "./src/javascripts/content.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader", exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: "./dist/javascripts",
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      }
    }),
  ],
  resolve: {
    extensions: [
      "",
    ]
  }
};

module.exports = config;
