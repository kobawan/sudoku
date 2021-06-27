const path = require("path");

module.exports = {
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
