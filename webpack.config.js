const path = require("path");
const indexHtml = path.join(__dirname, "src", "index.html");

module.exports = {
	entry: [
        path.join(__dirname, "src", "js", "initializing.js"),
        indexHtml
    ],
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	module: {
		rules: [
			{
                test: indexHtml,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]-dist.[ext]",
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
                loaders: [
                    {
						loader: "file-loader",
						options: {
                        	name: "styles/[name].[ext]",
                        },
                    },
                    {
                        loader: "extract-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                ],
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
		]
	}
};