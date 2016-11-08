const webpack = require("webpack");

const config = {
  entry: {
    background: "./src/javascripts/background.js",
    content: "./src/javascripts/content.js",
    options: "./src/javascripts/options.jsx"
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: "babel-loader",
        test: /\.jsx?$/,
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
      ".js",
    ]
  }
};

module.exports = config;
