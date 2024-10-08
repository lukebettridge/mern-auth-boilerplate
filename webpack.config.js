const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		app: "./client/app.js"
	},
	mode: process.env.NODE_ENV,
	output: {
		path: path.join(__dirname, "./build"),
		filename: "[name].[hash:8].bundle.js",
		chunkFilename: "[name].[hash:8].bundle.js",
		publicPath: "/"
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			}
		]
	},
	devServer: {
		historyApiFallback: true
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	optimization: {
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					priority: 1,
					enforce: true
				}
			}
		}
	},
	plugins: [
		new webpack.ProvidePlugin({
			React: "react"
		}),
		new HtmlWebpackPlugin({
			template: "client/index.html",
			minify: {
				collapseWhitespace: true,
				removeComments: true
			}
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};
