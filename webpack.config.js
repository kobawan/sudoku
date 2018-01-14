const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const htmlPath = path.join(__dirname, "src", "index.html");

module.exports = {
	entry: [
        path.join(__dirname, "src", "js", "initializing.js"),
        htmlPath,
        "webpack-dev-server/client?http://localhost:8080",
    ],
	output: {
		filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    devtool: "source-map",
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
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        "postcss-loader",
                        "less-loader",
                    ],
                }),
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015"],
                    },
                },
            },
			{
                test: htmlPath,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "index.html",
                        },
                    },
                    "extract-loader",
                    "html-loader",
                ],
            },
		],
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
    ],
	devServer: {
		contentBase: path.join(__dirname, "dist", "index.html"),
	},
};