const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		app: "./client/app.js",
		vendor: ["react", "react-apollo"]
	},
	output: {
		path: path.resolve(__dirname, "./build"),
		publicPath: "/",
		filename: "[name].[hash:8].js"
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ["babel-loader"]
			}
		]
	},
	devServer: {
		historyApiFallback: true
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	plugins: [
		new webpack.ProvidePlugin({
			React: "react"
		}),
		new webpack.DefinePlugin({
			baseURL: JSON.stringify("http://localhost:5000")
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: Infinity
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
