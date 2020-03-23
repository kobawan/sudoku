const path = require("path");

module.exports = {
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
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js", ".json", ".less"],
  },
};
