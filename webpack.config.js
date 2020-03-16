const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";

const htmlFilePath = path.join(__dirname, "src", "assets", "index.html");
const jsIndexFilePath = path.join(__dirname, "src", "js", "index.tsx");

const entries = [jsIndexFilePath, htmlFilePath];
if (devMode) {
  entries.push("webpack-dev-server/client?http://localhost:8080");
}

module.exports = {
  entry: entries,
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  stats: {
    entrypoints: false,
    modules: false,
    children: false,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devtool: devMode ? "inline-source-map" : "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js", ".json", ".less"],
  },
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
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
        ],
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
    new HtmlWebpackPlugin({
      favicon: path.join(__dirname, "src", "assets", "favicon.ico"),
      template: htmlFilePath,
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
    }),
  ],
  devServer: devMode
    ? {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
      }
    : undefined,
};
