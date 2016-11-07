const webpack = require("webpack");

const config = {
  entry: [
    "./src/javascripts/content-script.js",
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "content-script.js",
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
