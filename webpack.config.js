const path = require("path");
const indexHtml = path.join(__dirname, "src", "index.html");

module.exports = {
	entry: [
        path.join(__dirname, "src", "js", "initializing.js"),
        indexHtml,
    ],
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
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
                test: indexHtml,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "index.html",
                        },
                    },
                    {
                        loader: "extract-loader",
                    },
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src", "link:href"],
                            interpolate: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"],
            },
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
		],
	},
	devServer: {
		contentBase: path.join(__dirname, "dist", "index.html"),
	},
};