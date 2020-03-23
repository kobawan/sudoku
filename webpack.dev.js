const path = require("path");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const common = require("./webpack.common.js");

const htmlFilePath = path.join(__dirname, "src", "assets", "index.html");
const jsIndexFilePath = path.join(__dirname, "src", "js", "index.tsx");

module.exports = merge(common, {
  mode: "development",
  entry: [
    jsIndexFilePath,
    htmlFilePath,
    "webpack-dev-server/client?http://localhost:8080",
  ],
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        loaders: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader?name=[name].[ext]",
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: ["ts-loader", "eslint-loader"],
      },
      {
        exclude: path.join(__dirname, "node_modules"),
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /index\.html/,
        use: "html-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: path.join(__dirname, "src", "assets", "favicon.ico"),
      template: htmlFilePath,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
  },
});
