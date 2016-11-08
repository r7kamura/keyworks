const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader")
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: "./dist/assets",
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.DefinePlugin({
      "process.env": {
         NODE_ENV: JSON.stringify("production")
       }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      }
    }),
  ],
  postcss: [
    autoprefixer,
  ],
  resolve: {
    extensions: [
      "",
      ".js",
      ".scss",
    ]
  },
};

module.exports = config;
